import { AppError } from './app.error';

type AmplifyConfigContext = {
  component: string;
  expected: string;
  received: string;
  originalError?: Error;
};

export class ConfigureAwsAmplifyError extends AppError<AmplifyConfigContext> {
  constructor(context: AmplifyConfigContext) {
    super(
      `Erro ao configurar AWS Amplify no componente ${context.component}`,
      context
    );
  }
}
