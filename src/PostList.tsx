import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { type Post } from './App';

type PostListProps = {
  posts: Post[];
};

export const PostList = ({ posts }: PostListProps) => {
  return (
    <div>
      <h1 className="text-5xl">Post List</h1>
      {posts.map((post) => (
        <Card key={post.id} className="m-1 hover:opacity-50">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>작성자: {post.userId}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{post.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
