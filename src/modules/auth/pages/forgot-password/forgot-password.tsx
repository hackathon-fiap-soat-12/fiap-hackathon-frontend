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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { loading, forgotPassword } = useAuth();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  function onSubmit(data: ForgotPasswordFormData) {
    forgotPassword(data.email);
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
                  <h1 className="text-2xl font-bold">Esqueceu sua senha?</h1>
                  <p className="text-balance text-muted-foreground">
                    Solicite um código de recuperação
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
                              disabled={loading}
                              placeholder="seuemail@exemplo.com"
                              className={cn(
                                'transition-colors',
                                fieldState.error &&
                                  'border-destructive focus-visible:ring-destructive'
                              )}
                              {...form.register('email')}
                            />
                          </FormControl>
                          <FormMessage className="absolute bottom-0 left-0 text-[10px]" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Solicitando...' : 'Solicitar'}
                </Button>
                <div className="text-center text-sm">
                  Ainda não tem uma conta?{' '}
                  <Link to="/signup" className="underline underline-offset-4">
                    Cadastre-se
                  </Link>
                </div>
                <div className="text-center text-sm">
                  Já possui uma conta?{' '}
                  <Link to="/signin" className="underline underline-offset-4">
                    Entrar
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
