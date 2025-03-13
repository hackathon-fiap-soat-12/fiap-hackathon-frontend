import { Button } from '@/core/components/ui/button';
import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-muted-foreground">Página não encontrada.</p>
      <Button asChild className="mt-4">
        <Link to="/">Voltar para o início</Link>
      </Button>
    </div>
  );
}
