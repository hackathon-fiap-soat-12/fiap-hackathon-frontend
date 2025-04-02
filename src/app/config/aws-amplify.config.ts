import { Amplify } from 'aws-amplify';

export const configureAmplify = ({
  userPoolId,
  userPoolWebClientId,
}: {
  userPoolId: string;
  userPoolWebClientId: string;
}): void => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: userPoolId,
        userPoolClientId: userPoolWebClientId,
        userAttributes: {
          email: { required: true },
        },
      },
    },
  });
};
