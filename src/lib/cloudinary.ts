const CLOUDINARY_CLOUD_NAME = 'dlg5ymqpu';
const CLOUDINARY_PRESET = 'wagqko2z';

type CloudinaryUploadResponse = {
  secure_url?: string;
};

export async function uploadImageToCloudinary(file: File) {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Gorsel Cloudinary yuklemesi basarisiz oldu.');
  }

  const data = (await response.json()) as CloudinaryUploadResponse;

  if (!data.secure_url) {
    throw new Error('Cloudinary gorsel URL bilgisi donmedi.');
  }

  return data.secure_url;
}