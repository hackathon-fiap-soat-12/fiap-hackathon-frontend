const SIZE_500_MB = 500 * 1024 * 1024;

export function validateMp4File(file: File): boolean {
  const isMp4 =
    file.type === 'video/mp4' || file.name.toLowerCase().endsWith('.mp4');

  const maxSize = SIZE_500_MB;
  const isWithinSizeLimit = file.size <= maxSize;

  return isMp4 && isWithinSizeLimit;
}
