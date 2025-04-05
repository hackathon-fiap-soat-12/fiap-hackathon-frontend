import ConfirmDialog from '@/core/components/confirm-dialog';
import { createContext, ReactNode, useState } from 'react';

interface ConfirmDialogContextProps {
  isOpen: boolean;
  dialogData: ConfirmDialogData;
  openDialog: (data: ConfirmDialogData) => void;
  closeDialog: () => void;
}

interface ConfirmDialogProviderProps {
  children: ReactNode;
}

interface ConfirmDialogData {
  title: string;
  description: string | ReactNode;
  cancelText?: string;
  confirmText?: string;
  type?: 'default' | 'warning';
  confirmVariant?: 'primary' | 'error' | 'success';
  onConfirm?: () => void;
}

const defaultConfirmDialogData: ConfirmDialogData = {
  title: '',
  description: '',
  confirmText: '',
  cancelText: 'Voltar',
  type: 'default',
  confirmVariant: 'primary',
  onConfirm: () => {},
};

export const ConfirmDialogContext = createContext<ConfirmDialogContextProps>({
  isOpen: false,
  openDialog: () => {},
  closeDialog: () => {},
  dialogData: defaultConfirmDialogData,
});

export const ConfirmDialogProvider = ({
  children,
}: ConfirmDialogProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState<ConfirmDialogData>(
    defaultConfirmDialogData
  );

  const openDialog = (data: ConfirmDialogData) => {
    setDialogData({ ...defaultConfirmDialogData, ...data });
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <ConfirmDialogContext.Provider
      value={{ isOpen, dialogData, openDialog, closeDialog }}
    >
      <ConfirmDialog />
      {children}
    </ConfirmDialogContext.Provider>
  );
};
