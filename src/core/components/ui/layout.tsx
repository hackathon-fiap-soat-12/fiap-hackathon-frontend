import { Outlet } from 'react-router-dom';
import { ModeToggle } from '../mode-toggle';
import { Button } from './button';
import { toast } from 'sonner';
import { useState } from 'react';

export function Layout() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="fixed right-4 top-8 transform -translate-y-1/2 z-50">
        <ModeToggle />
      </div>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center min-h-svh">
          <Outlet />
          <Button
            onClick={() => {
              setCount((count) => count + 1);
              toast('Event has been created', {
                description: 'Sunday, December 03, 2023 at 9:00 AM',
                action: {
                  label: 'Undo',
                  onClick: () => console.log('Undo'),
                },
              });
            }}
          >
            count is {count}
          </Button>
        </div>
      </div>
    </>
  );
}
