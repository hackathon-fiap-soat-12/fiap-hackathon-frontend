import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { SideMenuTrigger } from './side-menu';
import { Button } from './ui/button';

const AppHeader = () => {
  const { logout, user } = useAuth();

  const getInitials = (name: string) => {
    const mockName = name || 'Usuário';
    return mockName
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="flex justify-start px-7 py-3 w-full sticky top-0 right-0 bg-[#171717] z-[1] before:absolute before:inset-0 before:h-[3px] before:bg-gradient-to-r before:from-indigo-800 before:to-purple-800 before:top-full">
      <div className="flex space-between items-center justify-between w-full">
        <div>
          <SideMenuTrigger className="cursor-pointer text-white hover:bg-white/10 p-2 rounded-md transition-colors" />
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white font-semibold text-xl">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {getInitials(user?.name || 'Usuário')}
                  </AvatarFallback>
                </Avatar>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email || 'Usuário'}
              </span>
            </div>
            <Button
              className="bg-white/10 hover:bg-white/20"
              variant="ghost"
              size="icon"
              onClick={logout}
            >
              <span className="sr-only">Logout</span>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export { AppHeader };
