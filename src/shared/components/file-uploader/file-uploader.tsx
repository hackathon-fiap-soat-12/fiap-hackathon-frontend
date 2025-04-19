import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Progress } from '@/core/components/ui/progress';
import { cn } from '@/core/lib/utils';
import { validateMp4File } from '@/shared/utils/file-validations.utils';
import { Upload, X } from 'lucide-react';
import type React from 'react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

interface FileUploaderProps {
  onFilesChange?: (files: File[]) => void;
  progress?: number;
  isUploading?: boolean;
  onUploadClick?: () => void;
  onCancel?: () => void;
}

export function FileUploader({
  onFilesChange,
  progress = 0,
  isUploading = false,
  onUploadClick,
  onCancel,
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.length || !validateMp4File(e.target.files[0])) {
      toast.error('Oops, não será feito o upload!', {
        description:
          'O arquivo deve ser um vídeo MP4 com tamanho máximo de 500 MB',
      });
      removeFile();
      return;
    }

    setFiles(Array.from(e.target.files));

    if (onFilesChange) {
      onFilesChange(e.target.files ? Array.from(e.target.files) : []);
    }
  };

  const onCancelFile = () => {
    if (onCancel) {
      onCancel();
    }
    removeFile();
  };

  const removeFile = () => {
    setFiles([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    if (onUploadClick) {
      onUploadClick();
    }
  };

  return (
    <div className="w-full space-y-4 rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-lg">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            className={cn(
              'cursor-pointer border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-750 focus-visible:ring-gray-600',
              files.length > 0 && 'file:hidden'
            )}
            disabled={isUploading}
          />
          {files.length > 0 && (
            <Button
              variant="outline"
              size="icon"
              onClick={onCancelFile}
              disabled={!isUploading}
              className="border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          )}
        </div>

        {files.length > 0 && (
          <div className="text-sm text-gray-400">
            {files.map((file) => (
              <div key={file.name} className="truncate">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </div>
            ))}
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2 w-full bg-gray-800" />
          <div className="text-xs text-gray-500">
            {progress < 100 ? `Uploading: ${progress}%` : 'Upload complete'}
          </div>
        </div>
      )}

      <Button
        onClick={handleUploadClick}
        disabled={files.length === 0 || isUploading || progress === 100}
        className="w-full bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:ring-indigo-500 disabled:bg-indigo-600/50"
      >
        <Upload className="mr-2 h-4 w-4" />
        {isUploading ? 'Uploading...' : 'Upload File'}
      </Button>
    </div>
  );
}
