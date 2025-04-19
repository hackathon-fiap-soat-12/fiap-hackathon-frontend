import { VideoResponseInterface } from '@/core/interfaces/video.service';
import api from '@/infra/http/axios.config';

export async function getProcessedVideoList(
  pageSize: number,
  exclusiveStartKey?: string
): Promise<{
  files: VideoResponseInterface[];
  lastEvaluatedKey: string | null;
}> {
  const { data } = await api.get('/files', {
    params: { pageSize, exclusiveStartKey },
  });
  return data;
}
