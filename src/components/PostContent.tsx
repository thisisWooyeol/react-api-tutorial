import { LoadingPostDetails } from '@/components/Loading';
import { type PostDetailProps } from '@/components/PostDetail';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const PostContent = ({ selectedPost }: PostDetailProps) => {
  return (
    <>
      <h1 className="p-6 text-4xl" style={{ fontFamily: 'BMEuljiro' }}>
        내용
      </h1>
      {selectedPost != null ? (
        <Card key={selectedPost.id}>
          <CardHeader>
            <CardTitle>{selectedPost.title}</CardTitle>
            <CardDescription>작성자: {selectedPost.userId}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{selectedPost.body}</p>
          </CardContent>
        </Card>
      ) : (
        <LoadingPostDetails n={1} />
      )}
    </>
  );
};
