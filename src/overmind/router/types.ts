export type Page = {
  HOME: string;
  LOGIN: string;
};

const basePath =
  process.env.NODE_ENV === 'production' ? '/bktestapp-page/' : '/';

export const Page: Page = {
  HOME: basePath,
  LOGIN: `${basePath}login`
};
