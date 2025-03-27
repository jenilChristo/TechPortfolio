import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Home, FolderGit2, BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Database className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">DataEngineer</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/projects" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <FolderGit2 className="h-5 w-5" />
              <span>Projects</span>
            </Link>
            <Link to="/blog" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <BookOpen className="h-5 w-5" />
              <span>Blog</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;