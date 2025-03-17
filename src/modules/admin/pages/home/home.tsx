import { Button } from '@/core/components/ui/button';
import { useAuth } from '@/core/hooks/use-auth.hook';

export function Home() {
  const { logout } = useAuth();
  return (
    <>
      <h1 className="text-xl font-bold">Home</h1>
      <Button onClick={logout} className="mt-4">
        Sair
      </Button>
    </>
  );
}
