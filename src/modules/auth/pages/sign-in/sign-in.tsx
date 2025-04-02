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
import { useAuth } from '@/core/context/auth-context';
import { cn } from '@/core/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

// Esquema de validação com Zod
const signInSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export function SignIn({ className, ...props }: React.ComponentProps<'div'>) {
  const { login, loading } = useAuth();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: SignInFormData) => {
    await login({ email: formData.email, password: formData.password });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                  <p className="text-balance text-muted-foreground">
                    Acesse sua conta para continuar
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
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <div className="relative pb-4">
                          <FormControl>
                            <Input
                              {...field}
                              id="password"
                              type="password"
                              disabled={loading}
                              className={cn(
                                'transition-colors',
                                fieldState.error &&
                                  'border-destructive focus-visible:ring-destructive'
                              )}
                              {...form.register('password')}
                            />
                          </FormControl>
                          <FormMessage className="absolute bottom-0 left-0 text-[10px]" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
                <div className="text-center text-sm">
                  Ainda não tem uma conta?{' '}
                  <Link to="/signup" className="underline underline-offset-4">
                    Cadastre-se
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <img
              src={loginImage}
              alt="Imagem de login"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
