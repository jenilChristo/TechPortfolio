import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Database, Brain, Server } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Senior Data Engineer
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Building scalable data solutions at Microsoft
        </p>
        <div className="flex justify-center space-x-4">
          <a href="https://github.com" className="bg-white text-blue-700 px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-50">
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com" className="bg-white text-blue-700 px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-50">
            <Linkedin className="h-5 w-5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Database className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Data Engineering</h3>
          <p className="text-gray-600">
            Expertise in building scalable data pipelines and lakes using modern technologies.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Brain className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Machine Learning</h3>
          <p className="text-gray-600">
            Experience in deploying ML models at scale and building ML platforms.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Server className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Cloud Architecture</h3>
          <p className="text-gray-600">
            Deep knowledge of cloud platforms and distributed systems.
          </p>
        </div>
      </section>

      {/* Featured Work */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Featured Work</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Link to="/projects" className="group">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" 
                alt="Data Lake Project"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Enterprise Data Lake</h3>
                <p className="text-gray-600">Scalable data lake solution processing 10TB+ daily data.</p>
              </div>
            </div>
          </Link>
          <Link to="/blog" className="group">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80" 
                alt="ML Platform"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">ML Model Platform</h3>
                <p className="text-gray-600">Automated ML model deployment platform.</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
        <div className="flex justify-center">
          <a href="mailto:contact@example.com" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <Mail className="h-6 w-6" />
            <span className="text-lg">contact@example.com</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;