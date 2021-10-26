export const unwrapSettledPromises = <R>(
  results: PromiseSettledResult<R>[],
): R[] => {
  const errors = results.filter(
    (result) => result.status === 'rejected',
  ) as PromiseRejectedResult[];
  if (errors.length > 0) {
    throw new Error(errors.map((e) => e.reason).join(','));
  }
  const success = results as PromiseFulfilledResult<R>[];
  return success.map((s) => s.value);
};
