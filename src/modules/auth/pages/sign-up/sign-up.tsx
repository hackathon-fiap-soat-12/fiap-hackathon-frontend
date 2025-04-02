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
import { SignUpService } from '@/core/services/cognito/sign-up.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

const passwordValidator = (val: string) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    val
  );
};

const signUpSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    password: z
      .string()
      .min(8, 'Use 8+ caracteres com letras, números e símbolos')
      .refine(passwordValidator, {
        message: 'Use 8+ caracteres com letras, números e símbolos',
      }),

    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUp({ className, ...props }: React.ComponentProps<'div'>) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (formData: SignUpFormData) => {
    setIsLoading(true);
    try {
      await SignUpService.signUp({
        email: formData.email,
        password: formData.password,
        username: formData.email,
        attributes: {
          name: formData.name,
        },
      });
      setIsLoading(false);
      toast.success('Cadastro realizado com sucesso, verifique seu e-mail.');
      navigate('/confirm-passowrd');
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);

      if (err.name === 'UsernameExistsException') {
        navigate('/sign-in');
      }
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
                  <h1 className="text-2xl font-bold">Crie sua conta</h1>
                  <p className="text-balance text-muted-foreground">
                    Preencha os dados abaixo para se cadastrar
                  </p>
                </div>

                {/* Campo Nome */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <Label htmlFor="name">Nome</Label>
                        </div>
                        <div className="relative pb-4">
                          <FormControl>
                            <Input
                              {...field}
                              id="name"
                              type="text"
                              disabled={isLoading}
                              placeholder="Seu nome completo"
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

                {/* Campo Email */}
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

                {/* Campo Senha */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <Label htmlFor="password">Senha</Label>
                        </div>
                        <div className="relative pb-4">
                          <FormControl>
                            <Input
                              {...field}
                              id="password"
                              type="password"
                              disabled={isLoading}
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

                {/* Campo Confirmar Senha */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <Label htmlFor="confirmPassword">
                            Confirmar Senha
                          </Label>
                        </div>
                        <div className="relative pb-4">
                          <FormControl>
                            <Input
                              {...field}
                              id="confirmPassword"
                              type="password"
                              disabled={isLoading}
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
                  {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>

                <div className="text-center text-sm">
                  Já possui uma conta?{' '}
                  <Link to="/signin" className="underline underline-offset-4">
                    Entrar
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
