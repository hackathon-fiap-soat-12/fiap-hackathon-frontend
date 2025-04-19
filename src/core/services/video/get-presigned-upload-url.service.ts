import api from '@/infra/http/axios.config';

export interface GetPresignedUrlResponse {
  readonly id: string;
  readonly url: string;
  readonly method: 'PUT' | 'GET' | 'POST' | 'DELETE';
  readonly expiresIn: number;
}

const PRESIGNED_URL_ENDPOINT = '/presigned-upload';

export class GetPresignedUploadUrlService {
  static async generatePresignedUrl({
    fileName,
    fileType,
  }: {
    fileName: string;
    fileType: string;
  }): Promise<GetPresignedUrlResponse> {
    const response = await api.post<GetPresignedUrlResponse>(
      PRESIGNED_URL_ENDPOINT,
      {
        fileName,
        fileType,
      }
    );
    return response.data;
  }
}
