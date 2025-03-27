import React from 'react';
import { useParams } from 'react-router-dom';
import { blogs } from '../data/blogs';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogs.find(p => p.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-gray-500 mb-4">
          <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          <span>•</span>
          <span>{post.tags[0]}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span 
              key={tag}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}

export default BlogPost;