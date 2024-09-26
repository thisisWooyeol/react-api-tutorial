import { Skeleton } from '@/components/ui/skeleton';

export const LoadingComments = () => {
  return (
    <div>
      <ul>
        {[1, 2, 3, 4, 5].map((stubId) => (
          <li key={stubId} className="rborder-b border-zinc-200 py-2">
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
