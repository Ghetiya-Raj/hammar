import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import type { LoginInput, RegisterInput } from './auth.schema.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import {
  createAccessToken,
  createTwoFactorSetupToken,
  createTwoFactorLoginToken,
} from '../utils/jwt.js';

export async function registerUser(input: RegisterInput) {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error('Email already registered');
  }

  const passwordHash = await hashPassword(input.password);

  const [user] = await db
    .insert(users)
    .values({
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    });

  if (!user) {
    throw new Error('Failed to create user');
  }

  const setupToken = createTwoFactorSetupToken({
    userId: user.id,
    purpose: '2fa_setup',
  });

  return { user, setupToken };
}

export async function loginUser(input: LoginInput) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordValid = await verifyPassword(user.passwordHash, input.password);

  if (!passwordValid) {
    throw new Error('Invalid email or password');
  }

  if (user.isTwoFactorEnabled) {
    const twoFactorLoginToken = createTwoFactorLoginToken({
      userId: user.id,
      purpose: '2fa_login',
    });

    return {
      requiresTwoFactor: true,
      twoFactorLoginToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  const token = createAccessToken({
    userId: user.id,
    role: user.role,
    tokenVersion: user.tokenVersion,
  });

  return {
    requiresTwoFactor: false,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
