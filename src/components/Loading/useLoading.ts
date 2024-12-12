export type LoadingProps = object;

export const useLoading = (props: LoadingProps) => {
  const loading = false;

  return { ...props, loading };
};
