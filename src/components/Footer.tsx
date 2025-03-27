import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-6">
          <a href="https://github.com" className="text-gray-600 hover:text-gray-800">
            <Github className="h-6 w-6" />
          </a>
          <a href="https://linkedin.com" className="text-gray-600 hover:text-gray-800">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="mailto:contact@example.com" className="text-gray-600 hover:text-gray-800">
            <Mail className="h-6 w-6" />
          </a>
        </div>
        <p className="text-center text-gray-600 mt-4">
          © {new Date().getFullYear()} Data Engineer Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;