import React from 'react';
import { projects } from '../data/projects';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-12 text-center">Projects</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                {project.link && (
                  <a 
                    href={project.link}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View Project</span>
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                  >
                    <Github className="h-4 w-4" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;