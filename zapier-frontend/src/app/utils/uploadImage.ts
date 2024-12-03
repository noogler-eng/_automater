import { cloudinary } from "./cloudinaryConfig";

const getUploadImageUrl = async (fileUri: string, fileName: string): Promise<string> => {
  const url = await cloudinary.uploader.upload(fileUri, {
    invalidate: true,
    resource_type: "auto",
    filename_override: fileName,
    folder: "product-images",
    use_filename: true,
  });
  
  return url.url;
};

export default getUploadImageUrl;