export type TFormValues = {
  resource: string;
  password: string;
};

export type TNamesField = {
  password?: string;
  range?: string;
  numbers?: string;
  uppercase?: string;
  special?: string;
};

export type TProps = {
  minAmount?: number;
  maxAmount?: number;
  fields?: TNamesField;
};

export type TContext = {
  userId: number;
};

export interface IPropsProvider extends TContext {
  children: React.ReactNode;
}
