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
import { useAuth } from '@/core/context/auth-context';
import { cn } from '@/core/lib/utils';
import { VerificationCodeInput } from '@/shared/components/verification-code/verification-code';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

const passwordValidator = (val: string) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    val
  );
};

const resetPasswordSchema = z
  .object({
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    code: z.string().min(6, 'O código deve ter 6 caracteres'),
    newPassword: z
      .string()
      .min(8, 'Use 8+ caracteres com letras, números e símbolos')
      .refine(passwordValidator, {
        message: 'Use 8+ caracteres com letras, números e símbolos',
      }),
    confirmPassword: z.string().min(8, 'Confirme sua senha'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPassword({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { loading, resetPassword } = useAuth();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      code: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: ResetPasswordFormData) {
    resetPassword({
      email: data.email,
      code: data.code,
      newPassword: data.newPassword,
    });
  }

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
                  <h1 className="text-2xl font-bold">Redefinir senha</h1>
                  <p className="text-balance text-muted-foreground">
                    Utilize o código de verificação enviado para o seu e-mail
                  </p>
                </div>

                {/* Campo para o código de verificação */}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <Label>Código de verificação</Label>
                      <div className="relative pb-4">
                        <FormControl>
                          <VerificationCodeInput
                            onChange={(value) => field.onChange(value)}
                            onBlur={field.onBlur}
                            error={!!fieldState.error}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage className="absolute bottom-0 left-0 text-[10px]" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Campo para o Confirmação de E-mail */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <Label htmlFor="email">Confirme seu E-mail</Label>
                      <div className="relative pb-4">
                        <FormControl>
                          <Input
                            {...field}
                            id="email"
                            type="text"
                            disabled={loading}
                            placeholder="Digite o seu E-mail"
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

                {/* Campo para a nova senha */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <Label htmlFor="newPassword">Nova senha</Label>
                      <div className="relative pb-4">
                        <FormControl>
                          <Input
                            {...field}
                            id="newPassword"
                            type="password"
                            disabled={loading}
                            placeholder="Digite sua nova senha"
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

                {/* Campo para confirmar a nova senha */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <Label htmlFor="confirmPassword">Confirmar senha</Label>
                      <div className="relative pb-4">
                        <FormControl>
                          <Input
                            {...field}
                            id="confirmPassword"
                            type="password"
                            disabled={loading}
                            placeholder="Confirme sua nova senha"
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

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Redefinindo...' : 'Redefinir senha'}
                </Button>

                <div className="text-center text-sm">
                  Lembrou sua senha?{' '}
                  <Link to="/signin" className="underline underline-offset-4">
                    Faça login
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
