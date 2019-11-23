export const isPasswordValid = (value: string) =>
  value.length >= 7 && /^[a-zA-Z0-9_]+$/.test(value);
