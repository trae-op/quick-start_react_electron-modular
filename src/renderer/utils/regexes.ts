export function isValidTwoFactor(value: string): boolean {
  return /^\d{6}$/.test(value);
}
