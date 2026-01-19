import { ReactElement, RefAttributes } from "react";

type TProps<P extends Record<string, any>> = P & {
  component: React.ElementType<P>;
  children?: React.ReactNode;
};

export type TComponentGenericForwardRef = <P extends Record<string, any>>(
  props: TProps<P> & RefAttributes<any>
) => ReactElement | null;
