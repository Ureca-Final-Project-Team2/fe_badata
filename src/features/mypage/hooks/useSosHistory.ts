import { useQuery } from '@tanstack/react-query';
import { getSosHistory } from '../api/sosHistory';
import { SosHistory } from '../model/sosHistory';

export const useSosHistory = () => {
  return useQuery<SosHistory[]>({
    queryKey: ['sosHistory'],
    queryFn: getSosHistory,
  });
};
