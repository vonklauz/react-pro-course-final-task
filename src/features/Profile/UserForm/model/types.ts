export type UserFormState = {
  name: string;
  about: string;
  avatar: string;
  email: string;
};

export type State = {
  error?: string;
  success?: boolean;
};

export type FormKey = {
  formName: keyof UserFormState;
  uiName: string;
};
