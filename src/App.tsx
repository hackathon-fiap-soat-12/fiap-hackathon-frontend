import { useState } from 'react';
import { Button } from '@/core/components/ui/button';
import './App.css';
import { ModeToggle } from '@/core/components/mode-toggle';
import { toast } from 'sonner';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ModeToggle />
      <div className="flex flex-col items-center justify-center min-h-svh">
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
    </>
  );
}

export default App;
