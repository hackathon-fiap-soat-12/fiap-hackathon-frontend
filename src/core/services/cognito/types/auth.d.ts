export interface CustomAuthTokens {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
}

export interface AuthUserDetails {
  username: string;
  userId: string;
  signInDetails: {
    loginId: string;
    authFlowType: 'USER_SRP_AUTH';
  };
  attributes;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  attributes: Record<string, string>;
  tokens: AuthTokens;
  name: string;
}

export type LoginParams = {
  username: string;
  password: string;
};

type CognitoError = {
  message: string;
  stack: string;
};

export type CognitoSignInError = {
  name: SignInErrorCode;
} & CognitoError;

export type CognitoConfirmResendError = {
  name: ConfirmResendErrorCode;
} & CognitoError;

export type CognitoSignUpError = {
  name: SignUpErrorCode;
} & CognitoError;

export type CognitoForgotPasswordError = {
  name: ForgotPasswordErrorCode;
} & CognitoError;

export type AuthError = {
  code: string;
  message: string;
  details?: string;
};

// Adicione esses tipos aos existentes
export type SignUpParams = {
  username: string;
  password: string;
  email: string;
  attributes?: Record<string, string>;
};

export type ConfirmSignUpParams = {
  username: string;
  confirmationCode: string;
};

export type AuthServiceError = {
  code: string;
  message: string;
  name: string;
};

export type AuthErrorCode =
  | 'UsernameExistsException'
  | 'InvalidParameterException'
  | 'InvalidPasswordException'
  | 'CodeMismatchException'
  | 'ExpiredCodeException'
  | 'UnexpectedError';

export type SignInErrorCode =
  | 'UserNotFoundException'
  | 'NotAuthorizedException'
  | 'UserNotConfirmedException'
  | 'PasswordResetRequiredException'
  | 'UnexpectedError'
  | 'UserAlreadyAuthenticatedException'
  | 'TooManyFailedAttemptsException';

export type ConfirmResendErrorCode =
  | 'CodeMismatchException'
  | 'ExpiredCodeException'
  | 'UserNotFoundException';

export type SignUpErrorCode =
  | 'UsernameExistsException'
  | 'InvalidParameterException'
  | 'InvalidPasswordException';

export type ForgotPasswordErrorCode =
  | 'ForgotPasswordFailed'
  | 'UserNotFoundException'
  | 'InvalidUsername';

export interface AuthError {
  code: AuthErrorCode;
  message: string;
  details?: string;
}

export type ConfirmEmailParams = {
  email: string;
  confirmationCode: string;
};

export type ResendConfirmationCodeParams = {
  email: string;
};

interface AuthPayload {
  sub: string;
  iss: string;
  client_id?: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope?: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username?: string;
  email_verified?: boolean;
  'cognito:username'?: string;
  aud?: string;
  name?: string;
  email?: string;
}

interface Token {
  payload: AuthPayload;
}

interface SignInDetails {
  loginId: string;
  authFlowType: string;
}

export interface AuthData {
  accessToken: Token;
  idToken: Token;
  signInDetails: SignInDetails;
}
