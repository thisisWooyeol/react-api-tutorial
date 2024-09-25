import { type Post } from '@/App';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type PostListProps = {
  posts: Post[];
  onPostClickBuilder: (postId: number) => () => void;
};

export const PostList = ({ posts, onPostClickBuilder }: PostListProps) => {
  return (
    <div>
      <h1 className="p-6 text-4xl" style={{ fontFamily: 'BMEuljiro' }}>
        포스트 목록
      </h1>
      <ScrollArea className="h-dvh overflow-y-auto">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="hover:bg-zinc-200"
            onClick={onPostClickBuilder(post.id)}
          >
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>작성자: {post.userId}</CardDescription>
            </CardHeader>
            {/* <CardContent>
              <p>{post.body}</p>
            </CardContent> */}
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};
