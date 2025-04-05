import { useConfirmDialog } from '@/core/hooks/useConfirmDialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';

const confirmButtonStyle = {
  primary:
    'border-primary text-primary text-base hover:bg-primary/10 focus:bg-primary/10',
  error:
    'border-none text-error text-base font-medium hover:bg-error/10 focus:bg-error/10',
  success:
    'border-none text-green-600 text-base font-medium hover:bg-green-600/10 focus:bg-green-600/10',
};

const ConfirmDialog = () => {
  const { isOpen, dialogData, closeDialog } = useConfirmDialog();

  return (
    <AlertDialog open={isOpen} onOpenChange={() => closeDialog()}>
      <AlertDialogContent className="sm:max-w-[565px] md:min-w-[565px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-4 text-black text-base font-medium">
            {dialogData.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 text-base">
            {dialogData.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter
          className={
            dialogData.type === 'warning' ? 'justify-center' : 'justify-between'
          }
        >
          <Button variant="ghost" className="text-base" onClick={closeDialog}>
            {dialogData.cancelText}
          </Button>

          {dialogData.type !== 'warning' && (
            <Button
              variant="outline"
              className={
                confirmButtonStyle[dialogData.confirmVariant ?? 'primary']
              }
              onClick={() => {
                if (dialogData?.onConfirm) {
                  dialogData.onConfirm();
                }
                closeDialog();
              }}
            >
              {dialogData.confirmText}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
