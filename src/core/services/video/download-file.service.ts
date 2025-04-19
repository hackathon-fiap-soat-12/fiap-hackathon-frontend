import { GetPresignedDownloadUrlService } from './get-presigned-download-url.service';

export class DownloadFileService {
  static async downloadFile(fileId: string): Promise<void> {
    const { url } =
      await GetPresignedDownloadUrlService.getPresignedDownloadUrl({
        fileId: fileId,
      });

    window.open(url, '_blank');
  }
}
