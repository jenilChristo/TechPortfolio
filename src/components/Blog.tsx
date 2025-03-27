import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { format } from 'date-fns';

const Blog = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-12 text-center">Technical Blog</h1>
      <div className="space-y-8">
        {blogs.map((post) => (
          <Link 
            key={post.id}
            to={`/blog/${post.id}`}
            className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center space-x-2 text-gray-500 mb-2">
                <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                <span>•</span>
                <span>{post.tags[0]}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mt-4">
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
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;