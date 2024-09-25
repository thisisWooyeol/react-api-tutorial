import { Skeleton } from '@/components/ui/skeleton';

export const LoadingComments = () => {
  return (
    <>
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </>
  );
};
