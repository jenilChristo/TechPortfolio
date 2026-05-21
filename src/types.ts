export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
  github?: string;
  fullDescription?: string;
  impact?: string[];
  metrics?: string[];
  highlights?: string[];
  category?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  tags: string[];
}