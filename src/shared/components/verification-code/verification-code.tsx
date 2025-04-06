import { Input } from '@/core/components/ui/input';
import React, { forwardRef, useRef, useState } from 'react';

interface VerificationCodeInputProps {
  length?: number;
  error?: boolean;
  disabled?: boolean;
  onChange?: (code: string) => void;
  onBlur?: () => void;
}

export const VerificationCodeInput = forwardRef<
  HTMLInputElement,
  VerificationCodeInputProps
>(({ length = 6, error = false, disabled = false, onChange, onBlur }) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    onChange?.(newCode.join(''));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain');
    const pasteDigits = pasteData.replace(/\D/g, '').slice(0, length);

    if (pasteDigits.length === length) {
      const newCode = pasteDigits.split('');
      setCode(newCode);
      inputsRef.current[length - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => {
            if (el) inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          value={code[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onBlur={onBlur}
          className={`w-12 h-12 text-center text-xl ${
            error ? 'border-destructive focus-visible:ring-destructive' : ''
          }`}
          disabled={disabled}
        />
      ))}
    </div>
  );
});

VerificationCodeInput.displayName = 'VerificationCodeInput';
