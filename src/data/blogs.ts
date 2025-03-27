import { BlogPost } from '../types';

export const blogs: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Data Lakes with Delta Lake',
    excerpt: 'Learn how to implement a modern data lake architecture using Delta Lake and Apache Spark.',
    date: '2024-03-15',
    content: '# Building Scalable Data Lakes\n\nIn this post, we\'ll explore...',
    tags: ['Data Engineering', 'Delta Lake', 'Apache Spark']
  },
  {
    id: '2',
    title: 'Real-time Analytics with Apache Kafka',
    excerpt: 'Deep dive into building real-time analytics pipelines using Apache Kafka.',
    date: '2024-03-10',
    content: '# Real-time Analytics\n\nModern businesses require...',
    tags: ['Kafka', 'Streaming', 'Real-time Analytics']
  }
];