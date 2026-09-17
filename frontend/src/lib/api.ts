export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.user;
}

export async function setupTwoFactor() {
  const response = await fetch(`${API_URL}/api/auth/2fa/setup`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to setup two-factor authentication',
    );
  }

  return data;
}

export async function verifyTwoFactor(code: string) {
  const response = await fetch(`${API_URL}/api/auth/2fa/verify`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to verify two-factor authentication',
    );
  }

  return data;
}

export async function verifyTwoFactorLogin(code: string) {
  const response = await fetch(`${API_URL}/api/auth/2fa/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Two-factor authentication failed');
  }

  return data;
}
