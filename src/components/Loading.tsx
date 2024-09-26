import { Skeleton } from '@/components/ui/skeleton';

type LoadingProps = {
  n: number;
};

export const LoadingPostDetails = ({ n }: LoadingProps) => {
  return (
    <div>
      <ul>
        {Array.from({ length: n }, (_, index) => (
          <li key={index} className="rborder-b border-zinc-200 py-3">
            <div className="my-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const LoadingPosts = ({ n }: LoadingProps) => {
  return (
    <div>
      <ul>
        {Array.from({ length: n }, (_, index) => (
          <li key={index} className="rborder-b border-zinc-200 py-3">
            <div className="my-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4 opacity-50" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
