import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHeader,
  DataTableRow,
} from '@/core/components/data-table';
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
      duracaoOriginal: '01:24:30',
      quantidadeFrames: 256,
      tamanhoArquivo: '15.2 MB',
    },
    {
      id: 'vid-002',
      nome: 'Apresentação do projeto',
      dataProcessamento: '2023-11-07',
      duracaoOriginal: '00:45:20',
      quantidadeFrames: 128,
      tamanhoArquivo: '8.7 MB',
    },
    {
      id: 'vid-003',
      nome: 'Workshop de inovação',
      dataProcessamento: '2023-11-05',
      duracaoOriginal: '02:10:15',
      quantidadeFrames: 312,
      tamanhoArquivo: '22.4 MB',
    },
    {
      id: 'vid-004',
      nome: 'Treinamento de produto',
      dataProcessamento: '2023-10-28',
      duracaoOriginal: '01:35:00',
      quantidadeFrames: 204,
      tamanhoArquivo: '17.9 MB',
    },
    {
      id: 'vid-005',
      nome: 'Entrevista cliente',
      dataProcessamento: '2023-10-20',
      duracaoOriginal: '00:32:45',
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
    { header: 'Duração Original', accessorKey: 'duracaoOriginal' },
    { header: 'Frames Extraídos', accessorKey: 'quantidadeFrames' },
    { header: 'Tamanho do Arquivo', accessorKey: 'tamanhoArquivo' },
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
    <div className="flex flex-col items-center min-h-screen w-full text-white">
      <div className="w-full max-w-5xl p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-center">
          Histórico de Processamento
        </h1>
        <div className="rounded-lg shadow-lg bg-gray-800 p-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Filtrar por nome do vídeo..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <DataTable>
            <DataTableHeader
              columns={columns}
              className="text-gray-300 font-semibold bg-gray-700"
            />
            <DataTableBody>
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <DataTableRow key={video.id} className="hover:bg-gray-700">
                    <DataTableCell className="w-full text-left">
                      {video.nome}
                    </DataTableCell>
                    <DataTableCell className="text-center">
                      {video.dataProcessamento}
                    </DataTableCell>
                    <DataTableCell className="text-center">
                      {video.duracaoOriginal}
                    </DataTableCell>
                    <DataTableCell className="text-center">
                      {video.quantidadeFrames}
                    </DataTableCell>
                    <DataTableCell className="text-center">
                      {video.tamanhoArquivo}
                    </DataTableCell>
                    <DataTableCell className="text-center">
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-blue-500 hover:text-white transition"
                          onClick={() => handleDownload(video.id, video.nome)}
                        >
                          <DownloadIcon className="w-5 h-5" />
                        </Button>
                      </div>
                    </DataTableCell>
                  </DataTableRow>
                ))
              ) : (
                <DataTableRow>
                  <DataTableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="h-12 w-12 text-gray-500 mb-4"
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
                      <span className="text-lg font-medium text-gray-400">
                        Nenhum vídeo encontrado
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
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
  );
}
