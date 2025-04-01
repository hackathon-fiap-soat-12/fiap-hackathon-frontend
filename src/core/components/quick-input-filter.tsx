import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useDebounce from '../hooks/useDebounce';
import { Input } from './ui/input';

interface QuickFilterInputProps {
  onFilter: (value: string) => void;
}

const QuickFilterInput = ({ onFilter }: QuickFilterInputProps) => {
  const { t } = useTranslation('common');
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    if (debouncedValue === '') {
      onFilter('');
      return;
    }

    onFilter(debouncedValue);
  }, [debouncedValue]);

  return (
    <Input
      placeholder={t('quick_search_placeholder')}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export { QuickFilterInput };
