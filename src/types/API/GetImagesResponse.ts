export default interface GetImagesResponse {
  publicId: string;
  title: string;
  azureDescription: string;
  trainedModelDescription: string;
  isAzureCaptionError: boolean;
  isModelCaptionError: boolean;
  url: string;
  userId: string;
}
