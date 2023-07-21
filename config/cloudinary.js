const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Optional: You can specify a folder in your Cloudinary account where the images will be stored.
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Optional: Limit the allowed image formats.
  },
});

const upload = multer({ storage });

module.exports = { upload };