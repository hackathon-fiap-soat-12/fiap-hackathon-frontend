import { LogOut } from 'lucide-react';
import { SideMenuTrigger } from './side-menu';
import { Button } from './ui/button';

const AppHeader = () => {
  return (
    <header className="flex justify-start px-7 py-3 w-full sticky top-0 right-0 bg-[#171717] z-[1] before:absolute before:inset-0 before:h-[3px] before:bg-gradient-to-r before:from-indigo-800 before:to-purple-800 before:top-full">
      <div className="flex space-between items-center justify-between w-full">
        <div>
          <SideMenuTrigger className="cursor-pointer text-white hover:bg-white/10 p-2 rounded-md transition-colors" />
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white font-semibold text-xl">JF</span>
            </div>
            <span className="text-white font-semibold">José Filisbino</span>
            <Button
              className="bg-white/10 hover:bg-white/20"
              variant="ghost"
              size="icon"
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
