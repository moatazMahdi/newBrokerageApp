import { useQuery } from '@tanstack/react-query';

export const useHome = () =>
  useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      return {};
    },
  });
