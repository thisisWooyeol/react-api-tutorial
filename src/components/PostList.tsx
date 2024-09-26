import { type Post } from '@/App';
import { LoadingPosts } from '@/components/Loading';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type PostListProps = {
  posts: Post[] | undefined;
  onPostClickBuilder: (postId: number) => () => void;
};

export const PostList = ({ posts, onPostClickBuilder }: PostListProps) => {
  return (
    <div className="flex h-96 flex-col sm:h-dvh">
      <h1 className="p-6 text-4xl" style={{ fontFamily: 'BMEuljiro' }}>
        포스트 목록
      </h1>
      <ScrollArea className="overflow-y-auto">
        {posts != null ? (
          posts.map((post) => (
            <Card
              key={post.id}
              className="border border-zinc-200 shadow hover:bg-zinc-100"
              onClick={onPostClickBuilder(post.id)}
            >
              <CardHeader>
                <CardTitle className="line-clamp-2 h-8">{post.title}</CardTitle>
                <CardDescription>작성자: {post.userId}</CardDescription>
              </CardHeader>
              {/* <CardContent>
              <p>{post.body}</p>
            </CardContent> */}
            </Card>
          ))
        ) : (
          /** 로딩중입니다... */
          <LoadingPosts n={10} />
        )}
      </ScrollArea>
    </div>
  );
};
