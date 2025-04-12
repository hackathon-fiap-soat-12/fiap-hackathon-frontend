import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/core/components/ui/sidebar';
import { FileClock, LayoutPanelLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function SideMenu() {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-gradient-to-b from-indigo-900 to-purple-900 w-[var(--sidebar-width)] group-data-[collapsible=icon]:w-[72px]"
    >
      <SidebarContent>
        <SidebarMenu>
          <div className="flex items-center justify-center gap-2 p-4 mb-4 rounded-md">
            <img
              src="/icon-alq-frame.svg"
              alt="Logo Alquimia Frames"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-800 to-purple-800 text-transparent bg-clip-text group-data-[collapsible=icon]:hidden">
              Alq. Frames
            </span>
          </div>
          <div className="h-[1px] bg-indigo-400/30 mb-4" />
          <div className="p-3 flex flex-col gap-2">
            <SideMenuItem
              name="Home"
              path="/admin/home"
              icon={LayoutPanelLeft}
            />
            <SideMenuItem
              name="Histórico"
              path="/admin/dashboard"
              icon={FileClock}
            />
          </div>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

function SideMenuItem({
  name,
  path,
  icon: Icon,
}: {
  name: string;
  path: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) {
  const { pathname: currentPath } = useLocation();
  const isCurrentPath = currentPath.startsWith(path);

  return (
    <SidebarMenuItem>
      <Link
        to={path}
        className={`flex overflow-hidden flex-nowrap gap-4 p-3 rounded-md cursor-pointer text-white select-none hover:bg-indigo-500/40 transition-colors ${
          isCurrentPath
            ? 'bg-gradient-to-r from-indigo-800 to-purple-800 font-medium'
            : ''
        }`}
      >
        <Icon
          className={`shrink-0 h-6 w-6 ${isCurrentPath ? 'text-white' : ''}`}
        />
        <span className="text-sm leading-relaxed text-nowrap">{name}</span>
      </Link>
    </SidebarMenuItem>
  );
}

export {
  SideMenu,
  SidebarProvider as SideMenuProvider,
  SidebarTrigger as SideMenuTrigger,
};
