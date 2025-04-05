import { useContext } from 'react';

import { ConfirmDialogContext } from '@/core/context/ConfirmDialogContext';

export const useConfirmDialog = () => useContext(ConfirmDialogContext);
