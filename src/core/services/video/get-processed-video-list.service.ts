import api from '@/infra/http/axios.config';

// Retorno da API é esse aqui:
// {
//     "files": [
//         {
//             "id": "6a893ee6-551e-4cb7-9234-2de8cacd9d62",
//             "videoName": "marvel.mp4",
//             "processingStatus": "PROCESSED",
//             "qtdFrames": 8,
//             "sizeInBytes": 831245
//         }
//     ],
//     "lastEvaluatedKey": null
// }

// A rota que é necessária chamar:
// files?pageSize=2&exclusiveStartKey={"createdAt":"2025-04-01T18:41:11.159509200","id":"b876c0e5-4fe8-4902-924e-e4dd993eccd4","userId":"4f2da442-81d6-47d9-bfbb-3b525c6f0606"}

// mandar vazio exclusiveStatedKey de primeiro
// se houver mais items na request retornar o lastEvaluatedKey e disponibilizar a paginação enviando os parametros exclusiveStartKey e pageSize na request
// se não houver mais items no lastEvaluatedKey retornar null
// se houver erro retornar o erro no catch

export async function getProcessedVideoList(
  pageSize: number,
  exclusiveStartKey?: string
): Promise<{
  files: {
    id: string;
    videoName: string;
    processingStatus: string;
    qtdFrames: number;
    sizeInBytes: number;
  }[];
  lastEvaluatedKey: string | null;
}> {
  try {
    const { data } = await api.get('/files', {
      params: { pageSize, exclusiveStartKey },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
