import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Enterprise Data Lake Architecture',
    description: 'Designed and implemented a scalable data lake solution processing 10TB+ daily data using Azure Data Lake Storage and Azure Databricks.',
    technologies: ['Azure', 'Databricks', 'Delta Lake', 'Python', 'Spark'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    link: 'https://example.com/project1'
  },
  {
    id: '2',
    title: 'Real-time Analytics Pipeline',
    description: 'Built real-time data processing pipeline handling 1M+ events/second using Apache Kafka and Azure Stream Analytics.',
    technologies: ['Kafka', 'Azure Stream Analytics', 'Power BI', 'SQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    title: 'ML Model Deployment Platform',
    description: 'Created an automated ML model deployment platform reducing deployment time from days to hours.',
    technologies: ['Azure ML', 'Docker', 'Kubernetes', 'Python'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80',
    github: 'https://github.com/example/ml-platform'
  }
];