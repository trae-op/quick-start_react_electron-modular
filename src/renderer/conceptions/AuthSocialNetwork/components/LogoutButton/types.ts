import { ElementType, ReactElement, ReactNode, RefAttributes } from "react";

type TProps<P extends Record<string, any>> = P & {
  component: ElementType<P>;
  children?: ReactNode;
};

export type TComponentGenericForwardRef = <P extends Record<string, any>>(
  props: TProps<P> & RefAttributes<any>
) => ReactElement | null;
