import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.js';

export async function uploadAvatar(
  file: Express.Multer.File,
): Promise<UploadApiResponse> {
  if (!file) {
    throw new Error('Avatar file is required');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'hammr/avatars',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error('Cloudinary upload failed'));
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(file.buffer);
  });
}
