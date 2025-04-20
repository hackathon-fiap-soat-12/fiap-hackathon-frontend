import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

function AuthLayout() {
  return (
    <div className="flex h-screen items-center justify-center px-4 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700">
      <div className="w-full max-w-md z-10">
        <Outlet />
      </div>
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      <Toaster />
    </div>
  );
}

export { AuthLayout };
