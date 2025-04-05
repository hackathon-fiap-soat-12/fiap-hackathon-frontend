import { AppHeader } from '@/core/components/app-header';
import { SideMenu, SideMenuProvider } from '@/core/components/side-menu';
import { ConfirmDialogProvider } from '@/core/context/ConfirmDialogContext';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { SidebarInset } from '../components/ui/sidebar';

function BaseLayout() {
  return (
    <SideMenuProvider>
      <SideMenu />

      <ConfirmDialogProvider>
        <SidebarInset>
          <AppHeader />

          <OutletContainer />
        </SidebarInset>
      </ConfirmDialogProvider>

      <Toaster />
    </SideMenuProvider>
  );
}

const OutletContainer = memo(() => {
  return (
    <main className="relative flex flex-1 flex-col items-center px-7">
      <Outlet />
    </main>
  );
});

export default BaseLayout;
