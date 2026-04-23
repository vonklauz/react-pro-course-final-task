import { SignInForm } from 'features/Auth/SignInForm';
import { WithProtection } from 'shared/store/HOCs/WithProtection';

export const SignInPage = WithProtection(() => {
  return <SignInForm />;
});
