import {
  Column,
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHeader,
  DataTableRow,
} from '@/core/components/data-table';
import { Badge } from '@/core/components/ui/badge';
import { Button } from '@/core/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { VideoResponseInterface } from '@/core/interfaces/video.service';
import { DownloadFileService } from '@/core/services/video/download-file.service';
import { getProcessedVideoList } from '@/core/services/video/get-processed-video-list.service';
import { DownloadIcon, SearchIcon, SparklesIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Subject, switchMap, takeUntil, timer } from 'rxjs';

const columns: Column[] = [
  { header: 'Nome do Vídeo', accessorKey: 'videoName', sortable: false },
  {
    header: 'Frames',
    accessorKey: 'qtdFrames',
    sortable: false,
    align: 'center',
  },
  {
    header: 'Tamanho',
    accessorKey: 'sizeInBytes',
    sortable: false,
    align: 'center',
  },
  {
    header: 'Status',
    accessorKey: 'processingStatus',
    sortable: false,
    align: 'center',
  },
  { header: 'Ações', accessorKey: 'acoes', sortable: false, align: 'center' },
];

const stopPolling$ = new Subject<void>();

function startPolling(
  pageSize: number,
  lastEvaluatedKey: string | null,
  setVideos: React.Dispatch<React.SetStateAction<VideoResponseInterface[]>>,
  setLastEvaluatedKey: React.Dispatch<React.SetStateAction<string | null>>
) {
  timer(0, 10000)
    .pipe(
      takeUntil(stopPolling$),
      switchMap(() =>
        getProcessedVideoList(pageSize, lastEvaluatedKey ?? undefined)
      )
    )
    .subscribe({
      next: (response) => {
        setVideos(response.files);
        setLastEvaluatedKey(response.lastEvaluatedKey);
      },
      error: (error) => console.error('Erro no polling:', error),
    });
}

export function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState<VideoResponseInterface[]>([]);
  const [pageSize, setPageSize] = useState(20);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const processingStatusTexts = (status: string): string => {
    const statusTexts: { [key: string]: string } = {
      NEW: 'Novo',
      PROCESSED: 'Processado',
      PROCESSING: 'Processando',
      FAILED: 'Falhou',
    };

    return statusTexts[status] || 'Desconhecido';
  };

  const fetchVideos = async (reset = false) => {
    setLoading(true);
    try {
      const response = await getProcessedVideoList(
        pageSize,
        reset ? undefined : lastEvaluatedKey || undefined
      );
      setVideos(reset ? response.files : [...videos, ...response.files]);
      setLastEvaluatedKey(response.lastEvaluatedKey);
    } catch (error) {
      console.error('Erro ao buscar vídeos processados:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (fileId: string) => {
    DownloadFileService.downloadFile(fileId);
  };

  useEffect(() => {
    startPolling(pageSize, lastEvaluatedKey, setVideos, setLastEvaluatedKey);
    return () => stopPolling$.next();
  }, [pageSize, lastEvaluatedKey]);

  const filteredVideos = videos.filter((video) =>
    video.videoName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatSize = (sizeInBytes: number) => {
    const mb = sizeInBytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const handleDownload = (fileId: string, videoName: string) => {
    console.log(`Iniciando download do arquivo ${fileId} - ${videoName}`);
    alert(`Download do arquivo "${videoName}" iniciado.`);
    downloadFile(fileId);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
  };

  const handlePageSizeChange = (size: number) => {
    stopPolling$.next();
    setPageSize(size);
    startPolling(size, lastEvaluatedKey, setVideos, setLastEvaluatedKey);
  };

  return (
    <main className="flex w-full h-full flex-col items-center p-4 md:p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="w-full max-w-7xl space-y-6">
        {/* Header inspirado na Home */}
        <div className="space-y-2 animate-fade-in">
          <div className="inline-flex items-center gap-3 justify-center w-full">
            <div className="h-1 w-8 bg-indigo-500 rounded-full"></div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 tracking-tight">
              Alquimia de Frames
            </h1>
            <div className="h-1 w-8 bg-purple-500 rounded-full"></div>
          </div>

          <p className="text-lg text-gray-300 font-light text-center">
            Seu histórico de transformações mágicas
          </p>

          <div className="py-2 text-gray-400">
            <p className="flex items-center justify-center gap-3">
              <span className="text-indigo-400 animate-pulse">✧</span>
              "Cada frame conta uma história"
              <span className="text-purple-400 animate-pulse">✧</span>
            </p>
          </div>
        </div>

        {/* Container principal com efeito de brilho */}
        <div className="relative group transition-all duration-300">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-purple-600/30 rounded-xl blur-lg opacity-70 group-hover:opacity-90 transition duration-500"></div>
          <div className="relative rounded-xl bg-gray-800/70 backdrop-blur-sm p-6 ring-1 ring-gray-700/50 border border-gray-700/30 overflow-hidden">
            {/* Barra de pesquisa */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-indigo-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar vídeos processados..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Tabela de dados */}
            <div className="overflow-x-auto">
              <DataTable className="min-w-full">
                <DataTableHeader
                  columns={columns}
                  className="text-white font-semibold bg-gradient-to-r from-indigo-900/50 to-purple-900/50"
                />
                <DataTableBody>
                  {filteredVideos.length > 0 ? (
                    filteredVideos.map((video) => (
                      <DataTableRow
                        key={video.id}
                        className="hover:bg-gray-700/50 border-gray-700/50 transition-colors"
                      >
                        <DataTableCell className="text-left">
                          <div className="flex items-center gap-2">
                            <SparklesIcon className="h-4 w-4 text-purple-400" />
                            <span>{video.videoName}</span>
                          </div>
                        </DataTableCell>
                        <DataTableCell className="text-center">
                          <Badge
                            variant="outline"
                            className="bg-indigo-900/20 text-indigo-300 border-indigo-700"
                          >
                            {video.qtdFrames}
                          </Badge>
                        </DataTableCell>
                        <DataTableCell className="text-gray-300">
                          {formatSize(video.sizeInBytes)}
                        </DataTableCell>
                        <DataTableCell className="text-center">
                          <Badge
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              video.processingStatus === 'NEW'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : ['PROCESSED', 'PROCESSING'].includes(
                                      video.processingStatus
                                    )
                                  ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                  : video.processingStatus === 'PROCESSING'
                                    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 animate-pulse'
                                    : 'bg-red-500/20 text-red-300 border-red-500/30'
                            }`}
                          >
                            {processingStatusTexts(video.processingStatus)}
                          </Badge>
                        </DataTableCell>
                        <DataTableCell className="text-center">
                          <div className="flex justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={video.processingStatus !== 'PROCESSED'}
                              className="rounded-full bg-indigo-900/30 hover:bg-indigo-700/50 border-indigo-700/50 text-indigo-300 hover:text-white transition-all"
                              onClick={() =>
                                handleDownload(video.id, video.videoName)
                              }
                            >
                              <DownloadIcon className="w-4 h-4 mr-2" />
                              Baixar
                            </Button>
                          </div>
                        </DataTableCell>
                      </DataTableRow>
                    ))
                  ) : (
                    <DataTableRow className="border-gray-700/50">
                      <DataTableCell colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <div className="p-4 bg-gray-800/50 rounded-full border border-gray-700/30">
                            <SparklesIcon className="h-10 w-10 text-gray-500 animate-pulse" />
                          </div>
                          <span className="text-lg font-medium text-gray-400">
                            Nenhuma transformação encontrada
                          </span>
                          <span className="text-sm text-gray-500">
                            {searchTerm
                              ? 'Ajuste sua busca ou tente novamente'
                              : 'Faça upload de um vídeo para começar'}
                          </span>
                          {!searchTerm && (
                            <Button
                              variant="outline"
                              className="mt-2 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-700/30 text-indigo-300 hover:text-white hover:border-indigo-500/50"
                              onClick={() => {
                                navigate('/admin/home');
                              }}
                            >
                              Criar Nova Transformação
                            </Button>
                          )}
                        </div>
                      </DataTableCell>
                    </DataTableRow>
                  )}
                </DataTableBody>
              </DataTable>
            </div>

            {/* Seleção de pageSize */}
            <div className="mt-6 flex items-center justify-end">
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => handlePageSizeChange(Number(value))}
              >
                <SelectTrigger className="w-[180px] bg-gray-700/50 border border-gray-600/30 text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                  <SelectValue placeholder="Itens por página" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border border-gray-700/50">
                  {[10, 20, 50, 100].map((size) => (
                    <SelectItem
                      key={size}
                      value={size.toString()}
                      className="hover:bg-gray-700/50 focus:bg-gray-700/50"
                    >
                      {size} itens por página
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Botão de carregar mais */}
            {lastEvaluatedKey && (
              <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-700/30 text-indigo-300 hover:text-white hover:border-indigo-500/50"
                  onClick={() => fetchVideos()}
                  disabled={loading}
                >
                  {loading ? 'Carregando...' : 'Carregar mais'}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center space-y-1">
          <p className="text-xs text-gray-600">
            "Nós preservamos cada detalhe do seu conteúdo com cuidado alquímico"
          </p>
          <p className="text-xs text-gray-700">
            {filteredVideos.length} itens encontrados • Última atualização: hoje
          </p>
        </div>
      </div>
    </main>
  );
}
