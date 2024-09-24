import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { type Post } from './App';

type PostListProps = {
  posts: Post[];
  onPostClickBuilder: (postId: number) => () => void;
};

export const PostList = ({ posts, onPostClickBuilder }: PostListProps) => {
  return (
    <div className="m-8">
      <h1 className="text-4xl">포스트 목록</h1>
      <ScrollArea className="h-svh overflow-y-auto">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="m-1 hover:opacity-50"
            onClick={onPostClickBuilder(post.id)}
          >
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>작성자: {post.userId}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};
