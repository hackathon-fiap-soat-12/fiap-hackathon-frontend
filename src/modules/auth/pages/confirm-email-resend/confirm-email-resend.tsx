import loginImage from '@/assets/images/login-page-wallpaper.png';
import { Button } from '@/core/components/ui/button';
import { Card, CardContent } from '@/core/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { cn } from '@/core/lib/utils';
import { ConfirmEmailResendService } from '@/core/services/cognito/confirm-email-resend.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

const confirmEmailForm = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
});

type FormData = z.infer<typeof confirmEmailForm>;

export function ConfirmEmailResend({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(confirmEmailForm),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await ConfirmEmailResendService.resendConfirmationCode({
        email: formData.email,
      });
      setIsLoading(false);
      toast.success('Código reenviado com sucesso, verifique seu e-mail.');
      navigate('/confirm-email');
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
      throw Error(err);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Reenviar Verificação</h1>
                  <p className="text-balance text-muted-foreground">
                    Insira seu email para receber um novo link de verificação
                  </p>
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <Label htmlFor="email">E-mail</Label>
                        </div>
                        <div className="relative pb-4">
                          <FormControl>
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              disabled={isLoading}
                              placeholder="seuemail@exemplo.com"
                              className={cn(
                                'transition-colors',
                                fieldState.error &&
                                  'border-destructive focus-visible:ring-destructive'
                              )}
                            />
                          </FormControl>
                          <FormMessage className="absolute bottom-0 left-0 text-[10px]" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? 'Reenviando...'
                    : 'Reenviar Email de Verificação'}
                </Button>

                <div className="text-center text-sm">
                  Já verificou seu email?
                  <Link to="/sign-in" className="underline underline-offset-4">
                    {` Faça login`}
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <img
              src={loginImage || '/placeholder.svg'}
              alt="Imagem de cadastro"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
