import { GetPresignedUrlService } from '@/core/services/video/get-presigned-url.service';
import { FileUploader } from '@/shared/components/file-uploader/file-uploader';
import { toast } from 'sonner';

export default function Home() {
  const handleFileUpload = async (file: File[]) => {
    if (!file?.length) {
      toast.error('Nenhum arquivo selecionado');
      return;
    }

    const { url, id } = await GetPresignedUrlService.getPresignedUrl({
      fileName: file[0].name,
      fileType: file[0].type,
    });

    if (!url) return;

    const formData = new FormData();
    formData.append('file', file[0]);

    const options = {
      method: 'PUT',
      headers: {
        'x-amz-meta-id': id,
        'x-amz-meta-content-type': file[0].type,
      },
      body: file[0],
    };

    try {
      await fetch(url, options);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <main className="flex w-full h-full flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-lg space-y-8">
        <div className="space-y-4 text-center animate-fade-in">
          <div className="inline-flex items-center gap-3">
            <div className="h-1 w-8 bg-indigo-500 rounded-full"></div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 tracking-tight">
              Alquimia de Frames
            </h1>
            <div className="h-1 w-8 bg-purple-500 rounded-full"></div>
          </div>

          <p className="text-xl text-gray-300 font-light">
            Transforme seus vídeos em frames extraordinários
          </p>

          <div className="py-4 text-gray-400 space-y-3">
            <p className="text-lg flex items-center justify-center gap-3">
              <span className="text-indigo-400 animate-pulse">✧</span>
              "Cada frame é um momento de magia"
              <span className="text-purple-400 animate-pulse">✧</span>
            </p>
            <p className="text-sm italic text-gray-500">
              Selecione seu vídeo abaixo para começar a transformação
            </p>
          </div>
        </div>

        <div className="relative group transition-all duration-300">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-purple-600/30 rounded-xl blur-lg opacity-70 group-hover:opacity-90 transition duration-500"></div>
          <div className="relative rounded-xl bg-gray-800/70 backdrop-blur-sm p-1 ring-1 ring-gray-700/50 border border-gray-700/30 overflow-hidden">
            <FileUploader onFilesChange={handleFileUpload} />
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs text-gray-600">
            Formatos suportados: MP4 (até 500MB)
          </p>
          <p className="text-xs text-gray-700 italic">
            "Nós preservamos cada detalhe do seu conteúdo com cuidado"
          </p>
        </div>
      </div>
    </main>
  );
}
