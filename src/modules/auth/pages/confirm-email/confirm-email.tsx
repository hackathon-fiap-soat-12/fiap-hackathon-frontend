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
import { ConfirmEmailService } from '@/core/services/cognito/confirm-email.service';
import { VerificationCodeInput } from '@/shared/components/verification-code/verification-code';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

const confirmEmailForm = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  confirmationCode: z
    .string()
    .min(6, { message: 'O código deve ter exatamente 6 caracteres' })
    .max(6, { message: 'O código deve ter exatamente 6 caracteres' })
    .length(6, { message: 'O código deve ter 6 caracteres' })
    .regex(/^\d+$/, { message: 'Use apenas números' }),
});

type FormData = z.infer<typeof confirmEmailForm>;

export function ConfirmEmail({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(confirmEmailForm),
    defaultValues: {
      email: '',
      confirmationCode: '',
    },
  });

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await ConfirmEmailService.confirmEmail({
        email: formData.email,
        confirmationCode: formData.confirmationCode,
      });
      toast.success('E-mail confirmado com sucesso', {
        description: 'Agora você pode fazer login na sua conta.',
      });
      navigate('/sign-in');
    } catch (err) {
      toast.error(err.message);
      throw Error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn('flex flex-col gap-6 max-w-md mx-auto', className)}
      {...props}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Verificação de E-mail</h1>
                  <p className="text-balance text-muted-foreground">
                    Digite o código de 6 dígitos enviado para o seu e-mail
                  </p>
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmationCode"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <Label>Código de confirmação</Label>
                        <div className="relative pb-4">
                          <FormControl>
                            <VerificationCodeInput
                              onChange={(value) => field.onChange(value)}
                              onBlur={field.onBlur}
                              error={!!fieldState.error}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage className="absolute bottom-0 left-0 text-[10px]" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <Label htmlFor="email">Confirme seu E-mail</Label>
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
                  {isLoading ? 'Verificando...' : 'Verificar'}
                </Button>

                <div className="text-center text-sm">
                  Não recebeu o código?
                  <Link
                    to="/confirm-email-resend"
                    className="underline underline-offset-4"
                  >
                    {` Solicitar novo código`}
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
