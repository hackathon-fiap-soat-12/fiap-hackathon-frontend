import { ConfirmEmail } from '@/modules/auth/pages/confirm-email/confirm-email';
import { ResetPassword } from '@/modules/auth/pages/reset-password/reset-password';
import { SignIn } from '@/modules/auth/pages/sign-in/sign-in';
import { SignUp } from '@/modules/auth/pages/sign-up/sign-up';
import { Route, Routes } from 'react-router-dom';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/confirm" element={<ConfirmEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
