export type ConfirmDialogProps = {
  title: string;
  description: string;
  action: (response: boolean) => any;
  onClose: () => any;
};
