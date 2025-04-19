import api from '@/infra/http/axios.config';

export interface GetPresignedDownloadUrlResponse {
  readonly url: string;
  readonly method: 'PUT' | 'GET' | 'POST' | 'DELETE';
  readonly expiresIn: number;
}

export class GetPresignedDownloadUrlService {
  static async getPresignedDownloadUrl({
    fileId,
  }: {
    fileId: string;
  }): Promise<GetPresignedDownloadUrlResponse> {
    const response = await api.get<GetPresignedDownloadUrlResponse>(
      `/files/${fileId}/presigned-download`
    );

    return response.data;
  }
}
