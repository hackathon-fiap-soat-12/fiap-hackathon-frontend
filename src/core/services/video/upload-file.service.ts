import axios, { AxiosProgressEvent, CancelTokenSource } from 'axios';
import { toast } from 'sonner';
import { GetPresignedUploadUrlService } from './get-presigned-upload-url.service';

export class UploadFileService {
  private static cancelSource: CancelTokenSource | null = null;

  static async uploadFile(
    file: File,
    onProgress?: (progress: number) => void,
    onError?: (error: unknown) => void
  ): Promise<'SUCCESS' | 'ERROR'> {
    if (!file) {
      toast.error('Nenhum arquivo selecionado');
      return 'ERROR';
    }

    try {
      const { url, id } =
        await GetPresignedUploadUrlService.generatePresignedUrl({
          fileName: file.name,
          fileType: file.type,
        });

      if (!url) {
        toast.error('Falha ao gerar URL de upload');
        return 'ERROR';
      }

      this.cancelSource = axios.CancelToken.source();

      await axios.put(url, file, {
        headers: {
          'x-amz-meta-id': id,
          'x-amz-meta-content-type': file.type,
          'x-amz-acl': 'bucket-owner-full-control',
        },
        cancelToken: this.cancelSource.token,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            if (onProgress) onProgress(progress);
          }
        },
      });

      toast.success('✅ Upload concluído com sucesso!');
      return 'SUCCESS';
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Upload cancelado pelo usuário');
        toast.warning('Upload cancelado');
      } else {
        console.error('Erro no upload:', error);
        toast.error('❌ Falha no upload do arquivo');
        if (onError) onError(error);
      }
      return 'ERROR';
    } finally {
      this.cancelSource = null;
    }
  }

  static cancelUpload(): void {
    if (this.cancelSource) {
      this.cancelSource.cancel('Upload cancelado pelo usuário');
    }
  }
}
