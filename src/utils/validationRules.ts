export const isPasswordValid = (value: string) => value.length >= 7 && /^[a-zA-Z0-9]+$/.test(value);
