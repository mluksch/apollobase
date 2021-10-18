export const getEnv = (
  name: string,
  opt: { isRequired?: boolean; defaultValue?: string } = { isRequired: true },
) => {
  const envValue = process.env[name];
  if (opt?.isRequired) {
    if (opt.defaultValue == null && envValue == null) {
      throw new Error(`Env "${name}" is missing!`);
    }
  }
  return envValue ?? opt.defaultValue;
};
