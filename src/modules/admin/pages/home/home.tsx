import { useAuth } from '@/core/context/auth-context';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

export function Home() {
  // const navigate = useNavigate();
  const { logout, user } = useAuth();

  // const handleLogout = () => {
  //   logout();
  //   toast.success('Logout realizado com sucesso!');

  //   setTimeout(() => {
  //     navigate('/signin');
  //   }, 1500);
  // };

  // const getInitials = (name: string) => {
  //   const mockName = name || 'Usuário'; // Mocka o nome caso não esteja disponível
  //   return mockName
  //     .split(' ')
  //     .map((part) => part[0])
  //     .slice(0, 2)
  //     .join('')
  //     .toUpperCase();
  // };

  return (
    <div className="min-h-screen bg-background">
      {/* <header className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            Desktop menu
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {getInitials(user?.name || 'Usuário')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email || 'Usuário'}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>

            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {getInitials(user?.name!) || 'Usuário'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {user?.name || 'Usuário'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user?.email || 'Usuário'}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header> */}

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Bem-vindo, {user?.name || 'Usuário'}!
          </h1>
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Painel Principal</h2>
            <p className="text-muted-foreground mb-4">
              Esta é a página inicial da sua aplicação. Aqui você pode adicionar
              o conteúdo principal do seu aplicativo.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
