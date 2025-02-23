export const readlineAbstraction = (() => {
  // ignore error, it will work only in production
  // @ts-ignore
  return readline();
}) as unknown as () => string;