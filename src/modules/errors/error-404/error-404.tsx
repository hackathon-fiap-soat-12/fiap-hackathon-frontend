import { Button } from '@/core/components/ui/button';
import { Link } from 'react-router-dom';

export function Error404() {
  return (
    <>
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-muted-foreground">Página não encontrada.</p>
      <Button asChild className="mt-4">
        <Link to="/">Voltar para o início</Link>
      </Button>
    </>
  );
}
