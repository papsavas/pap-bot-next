const separator = '-';

export const createCombinedId = (...args: string[]) => args.join(separator);

export const resolveCombinedId = (id: string) => id.split(separator);
