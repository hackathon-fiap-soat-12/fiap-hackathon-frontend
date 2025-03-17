import { Outlet } from 'react-router-dom';
import { ModeToggle } from '../mode-toggle';

export function Layout() {
  return (
    <>
      <div className="fixed right-4 top-8 transform -translate-y-1/2 z-50">
        <ModeToggle />
      </div>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center min-h-svh">
          <Outlet />
        </div>
      </div>
    </>
  );
}
