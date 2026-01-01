export default interface CreateImageResponse {
  azureDescription: string;
  modelDescription: string;
  isAzureCaptionError: boolean;
  isModelCaptionError: boolean;
  publicId: string;
  imageUrl: string;
}
