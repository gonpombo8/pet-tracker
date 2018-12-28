import config from 'dos-config';
import multer from 'multer';
import cloudinaryAny from 'cloudinary';
import multerStorageAny from 'multer-storage-cloudinary';

const { cloudImage } = config;

// Dont do this at home. 🙏🏼🙏🏼🙏🏼
// Just define the property types in defs.d.ts
// I dont have time right now to do this.
const cloudinary: any = cloudinaryAny;
const multerStorage: any = multerStorageAny;

cloudinary.config({
  cloud_name: cloudImage.name,
  api_key: cloudImage.apiKey,
  api_secret: cloudImage.apiSecret,
});

const storage = multerStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png', 'jpeg'],
  transformation: [{ width: 400, height: 400, crop: 'limit' }],
});

const parser = multer({ storage });

export default parser;
