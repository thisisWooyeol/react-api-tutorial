import { LoadingPostDetails } from '@/components/Loading';
import { type Comment } from '@/components/PostDetail';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type PostCommentsProps = {
  comments: Comment[] | undefined;
};

export const PostComments = ({ comments }: PostCommentsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl" style={{ fontFamily: 'BMEuljiro' }}>
          댓글
        </CardTitle>
        <CardDescription>
          {comments != null ? comments.length : 0}개의 댓글
        </CardDescription>
      </CardHeader>

      {/** 로딩중일 땐 Skeleton을 표시 */}
      {comments != null ? (
        <>
          <CardContent>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="border-b border-zinc-200 py-2">
                  <h4 className="text-l py-2">작성자: {comment.email}</h4>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="justify-center">
            <button className="rounded bg-zinc-200 px-2 py-1 hover:bg-zinc-400">
              Load More
            </button>
          </CardFooter>
        </>
      ) : (
        <CardContent>
          <LoadingPostDetails n={5} />
        </CardContent>
      )}
    </Card>
  );
};
