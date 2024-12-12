import { useLoading } from "./context/LoadingContext";

export type UseAppProps = object;

export const useApp = (props: UseAppProps) => {
  const { isLoading, setIsLoading } = useLoading();
  return { ...props, isLoading, setIsLoading };
};
