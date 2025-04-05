import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHeader,
  DataTableRow,
} from '@/core/components/data-table';
import { Badge } from '@/core/components/ui/badge';
import { Button } from '@/core/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockProcessedVideos = [
    {
      id: 'vid-001',
      nome: 'Reunião de equipe',
      dataProcessamento: '2023-11-10',
      status: 'Concluído',
      quantidadeFrames: 256,
      tamanhoArquivo: '15.2 MB',
    },
    {
      id: 'vid-002',
      nome: 'Apresentação do projeto',
      dataProcessamento: '2023-11-07',
      status: 'Processando',
      quantidadeFrames: 128,
      tamanhoArquivo: '8.7 MB',
    },
    {
      id: 'vid-003',
      nome: 'Workshop de inovação',
      dataProcessamento: '2023-11-05',
      status: 'Falhou',
      quantidadeFrames: 312,
      tamanhoArquivo: '22.4 MB',
    },
    {
      id: 'vid-004',
      nome: 'Treinamento de produto',
      dataProcessamento: '2023-10-28',
      status: 'Concluído',
      quantidadeFrames: 204,
      tamanhoArquivo: '17.9 MB',
    },
    {
      id: 'vid-005',
      nome: 'Entrevista cliente',
      dataProcessamento: '2023-10-20',
      status: 'Concluído',
      quantidadeFrames: 89,
      tamanhoArquivo: '6.3 MB',
    },
  ];

  const filteredVideos = mockProcessedVideos.filter((video) =>
    video.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Nome do Vídeo', accessorKey: 'nome' },
    { header: 'Data de Processamento', accessorKey: 'dataProcessamento' },
    { header: 'Frames Extraídos', accessorKey: 'quantidadeFrames' },
    { header: 'Tamanho do Arquivo', accessorKey: 'tamanhoArquivo' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Ações', accessorKey: 'acoes' },
  ];

  const handleDownload = (videoId: string, videoName: string) => {
    console.log(`Iniciando download do arquivo ${videoId} - ${videoName}`);
    alert(`Download do arquivo "${videoName}" iniciado.`);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
  };

  return (
    <div className="flex flex-col w-full min-h-screen text-white">
      <div className="w-full h-full p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-6 text-start">
          Histórico de Processamento
        </h1>
        <div className="rounded-lg shadow-lg bg-gradient-to-b from-slate-800 to-slate-900 p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <input
              type="text"
              placeholder="🔍 Filtrar por nome do vídeo..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full p-2 md:p-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="overflow-x-auto">
            <DataTable className="min-w-full">
              <DataTableHeader
                columns={columns}
                className="text-white font-semibold bg-slate-900"
              />
              <DataTableBody>
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((video) => (
                    <DataTableRow
                      key={video.id}
                      className="hover:bg-slate-700 border-slate-600"
                    >
                      <DataTableCell className="w-full text-left">
                        {video.nome}
                      </DataTableCell>
                      <DataTableCell className="text-center">
                        {video.dataProcessamento}
                      </DataTableCell>
                      <DataTableCell className="text-center">
                        {video.quantidadeFrames}
                      </DataTableCell>
                      <DataTableCell className="text-center">
                        {video.tamanhoArquivo}
                      </DataTableCell>
                      <DataTableCell className="text-center">
                        <Badge
                          className={`px-1 py-0 rounded-full text-[10px] font-semibold ${
                            video.status === 'Concluído'
                              ? 'bg-green-500 text-white'
                              : video.status === 'Processando'
                                ? 'bg-yellow-500 text-black'
                                : 'bg-red-500 text-white'
                          }`}
                        >
                          {video.status}
                        </Badge>
                      </DataTableCell>
                      <DataTableCell className="text-center">
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-primary hover:text-white transition"
                            onClick={() => handleDownload(video.id, video.nome)}
                          >
                            <DownloadIcon className="w-5 h-5" />
                          </Button>
                        </div>
                      </DataTableCell>
                    </DataTableRow>
                  ))
                ) : (
                  <DataTableRow className="border-slate-600">
                    <DataTableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="h-12 w-12 text-slate-500 mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-lg font-medium text-slate-400">
                          Nenhum vídeo encontrado
                        </span>
                        <span className="text-sm text-slate-500 mt-1">
                          {searchTerm
                            ? 'Tente ajustar os filtros de busca'
                            : 'Ainda não há vídeos processados disponíveis'}
                        </span>
                      </div>
                    </DataTableCell>
                  </DataTableRow>
                )}
              </DataTableBody>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
