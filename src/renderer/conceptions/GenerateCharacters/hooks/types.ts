export type TParamsHandleChangeRange = (
  event: Event,
  newValue: number | number[]
) => void;

export type THookControl<CS> = {
  result: string;
  amount: number;
  checkedChange: (variant: number) => (checked: CS) => void;
  handleChangeRange: TParamsHandleChangeRange;
};
