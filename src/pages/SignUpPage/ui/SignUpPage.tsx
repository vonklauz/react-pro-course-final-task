import { SignUpForm } from 'features/Auth/SignUpForm';
import { WithProtection } from 'shared/store/HOCs/WithProtection';

export const SignUpPage = WithProtection(() => {
  return <SignUpForm />;
});
