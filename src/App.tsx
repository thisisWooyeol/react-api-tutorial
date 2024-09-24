import './global.css';

import { useState } from 'react';

import { PostDetail } from './PostDetail';
import { PostList } from './PostList';

export const App = () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const [selectedPostId, setSelectedPostId] = useState(1);
  return (
    <div>
      <PostList baseUrl={baseUrl} />
      <PostDetail baseUrl={baseUrl} selectedPostId={selectedPostId} />
    </div>
  );
};
