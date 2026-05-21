import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Enterprise Launch Center & Trade Compliance Platform',
    description: 'End-to-end integration of trade compliance systems into enterprise launch workflows, enabling compliant product launches at massive scale.',
    fullDescription: 'Led the architectural design and implementation of embedding Trade compliance directly into enterprise launch workflows, removing critical blind spots in compliance assessment. Built real-time data connectivity and validation APIs to ensure launches are assessed before reaching global markets.',
    technologies: ['Trade API', 'Service Tree API', 'ECCN Classification', 'Real-time Validation', 'Microservices', '.NET Core'],
    category: 'Enterprise Platform',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    impact: [
      'Enabled compliant launch of products and services attributing to $80+ billion in revenue',
      'Established system of record for compliant launches, strengthening compliance posture',
      'Protected multi-billion-dollar revenue streams from regulatory exposure',
      'Enabled faster and risk-aware go-to-market execution at global scale'
    ],
    metrics: [
      '100% review coverage for in-scope launches',
      '$80B+ revenue protection',
      'Zero compliance-driven launch delays',
      'Real-time validation and decisioning'
    ],
    highlights: [
      'Designed core ECCN classification API with Service Tree integration',
      'Implemented real-time Trade API connectivity for on-the-fly validation',
      'Aligned platform to SLT-tracked metrics for Export Classification Coverage',
      'Drove cross-team execution and unblocked critical dependencies'
    ]
  },
  {
    id: '2',
    title: 'Close-Critical Revenue Data Platform',
    description: 'High-availability near real-time reporting platform for quarter-end close-critical revenue realization from operational tickets.',
    fullDescription: 'Owned and drove stabilization of close-critical data platforms, eliminating systemic bottlenecks in NRT and Queue Commander datasets to ensure predictable, failure-free performance during high-pressure quarter close windows.',
    technologies: ['Microsoft Fabric', 'Direct Lake', 'Real-time Analytics', 'Azure Synapse', 'Distributed Systems'],
    category: 'Data Platform',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    impact: [
      'Enabled near real-time visibility into millions of revenue transactions during quarter close',
      'Delivered smooth, zero-incident quarter close execution for Q2 and Q3',
      'Eliminated data staleness and delayed reporting risks',
      'Removed dependence on firefighting and manual workarounds'
    ],
    metrics: [
      '80% SLA improvement (10 min → 2 min)',
      'Zero incidents in Q2/Q3 close',
      'Millions of transactions processed',
      'Sub-2-minute data refresh'
    ],
    highlights: [
      'Improved platform SLA from 10 minutes to ~2 minutes',
      'Enabled seamless report rebinding with zero URL disruption',
      'Designed zero-downtime transition and deployment strategy',
      'Ensured consistent dataset refresh under peak loads'
    ]
  },
  {
    id: '3',
    title: 'New Commerce Reconciliation Data Platform',
    description: 'Petabyte-scale data ingestion and semantic modeling platform powering the transition from legacy commerce systems to unified data infrastructure.',
    fullDescription: 'Owned end-to-end delivery of a multi-petabyte semantic model and reconciliation data platform, establishing the first canonical mapping foundation and enabling consistent reconciliation across previously disconnected commerce systems.',
    technologies: ['Azure Databricks', 'Delta Lake', 'Petabyte-scale Ingestion', 'Semantic Modeling', 'Data Reconciliation'],
    category: 'Data Platform',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    impact: [
      'Unlocked trusted reporting across millions of invoices',
      'Enabled business-critical scenarios including M&A consolidation and demand planning',
      'Reduced time-to-insight from 11 days to less than 1 hour',
      'Eliminated $92K annual productivity cost from manual reconciliation'
    ],
    metrics: [
      'Petabyte-scale data processing',
      '11 days → <1 hour insight delivery',
      '$92K annual cost savings',
      '1056 hours of manual work eliminated annually',
      'Supported deals up to $256M'
    ],
    highlights: [
      'Designed transformative two-step ingestion technique',
      'Onboarded critical datasets into unified platform',
      'Established canonical Tenant-TPID mapping foundation',
      'Enabled step-function improvement in operating efficiency'
    ]
  },
  {
    id: '4',
    title: 'AI Agent Skills for Data Platform',
    description: 'Standardized agent skills enabling AI coding agents to author, query, operate, and govern data workloads via Model Context Protocol.',
    fullDescription: 'Designed and built standardized agent skills exposed via Model Context Protocol (MCP) for consumption from developer tools, accelerating self-serve data engineering and reducing operational friction.',
    technologies: ['Model Context Protocol (MCP)', 'GitHub Copilot', 'VS Code Extensions', 'Azure AI Foundry', 'Agentic AI'],
    category: 'AI & Automation',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    github: 'https://github.com/microsoft/skills-for-fabric',
    impact: [
      'Accelerated self-serve data engineering across teams',
      'Reduced operational friction through natural-language driven operations',
      'Enabled consistent agent interactions across CLI, IDE, and agent runtimes',
      'Simplified adoption across engineering teams'
    ],
    metrics: [
      'Open-source contribution',
      'MCP-based tool interfaces',
      'Multi-tool integration (CLI, IDE, runtimes)',
      'Governance-aligned access patterns'
    ],
    highlights: [
      'Implemented MCP servers for secure Fabric interactions',
      'Enabled GraphQL API integration for agent consumption',
      'Contributed to reusable skills layer for enterprise adoption',
      'Designed natural-language driven data operations'
    ]
  },
  {
    id: '5',
    title: 'Autonomous Incident Management & Root Cause Analysis',
    description: 'Human-in-the-loop agentic AI system for analyzing telemetry, detecting anomalies, and recommending mitigations to reduce manual debugging effort.',
    fullDescription: 'Built autonomous and human-in-the-loop agents that analyze telemetry, logs, and metadata to detect anomalies, infer likely root causes, recommend actions, and trigger mitigations.',
    technologies: ['Azure AI Foundry', 'Microsoft Agent Framework', 'LangChain/LangGraph', 'Telemetry Analysis', 'Anomaly Detection'],
    category: 'AI & Automation',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80',
    impact: [
      'Reduced manual debugging effort for on-call engineers',
      'Improved on-call response quality with actionable insights',
      'Enabled autonomous detection and mitigation triggering',
      'Achieved ~80% autonomous execution for targeted workflows'
    ],
    metrics: [
      '~80% autonomous execution rate',
      'Reduced MTTR for incidents',
      'Automated root cause inference',
      'Multi-signal telemetry analysis'
    ],
    highlights: [
      'Integrated telemetry, logs, and metadata analysis',
      'Built inference engine for root cause determination',
      'Implemented recommendation and mitigation triggering',
      'Established evaluation and rollout patterns with quality checks'
    ]
  },
  {
    id: '6',
    title: 'Operations Analytical Platform (OAP)',
    description: 'Scalable distributed data platform powering compliance, financial analytics, and fraud detection for multi-billion-dollar partner incentives.',
    fullDescription: 'Owned architecture and delivery of a scalable distributed data platform on Azure powering compliance, financial analytics, revenue recognition, and fraud/anomaly detection for $10B+ partner and seller incentives.',
    technologies: ['Apache Spark (Scala)', 'Delta Lake', 'Azure Databricks', 'Azure Synapse', 'Microsoft Fabric', 'ADF', 'Kafka', 'Kubernetes'],
    category: 'Data Platform',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80',
    impact: [
      'Platform supporting $10B+ partner and seller incentives',
      'Reduced data processing costs by ~45% through optimization',
      'Enabled advanced analytics and real-time insights at scale',
      'Integrated semantic OLAP models following SOA principles'
    ],
    metrics: [
      '$10B+ incentives processed',
      '45% cost reduction',
      'Petabyte-scale data processing',
      'Multi-source integration'
    ],
    highlights: [
      'Applied Spark internals expertise for performance tuning',
      'Optimized partitioning, shuffle, caching, and AQE',
      'Designed lakehouse architecture on Delta Lake',
      'Maintained high reliability and throughput at scale'
    ]
  },
  {
    id: '7',
    title: 'Config-as-Code Infrastructure Extension',
    description: 'Zero-touch provisioning platform for data infrastructure, enabling 18x faster onboarding with standardized security and governance.',
    fullDescription: 'Led architecture and delivery of a Config-as-Code extension enabling zero-touch provisioning of data shortcuts, security, connections, and AI agents, transforming manual deployments into reliable, repeatable platform capability.',
    technologies: ['Apache Spark', 'Scala', 'Infrastructure as Code', 'Azure', 'Metadata-driven ETL', 'OneLake'],
    category: 'Platform Engineering',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80',
    impact: [
      'Improved engineering velocity by 18x (3 hours → 10 minutes)',
      'Eliminated manual dependencies in deployment lifecycle',
      'Improved SLA readiness (8 hours → sub-30 minutes)',
      'Saved 150-300+ engineering hours annually'
    ],
    metrics: [
      '18x faster onboarding',
      '3 hours → 10 min provisioning',
      '8 hours → <30 min SLA',
      '150-300+ hours saved annually'
    ],
    highlights: [
      'Designed zero-touch provisioning for shortcuts and security',
      'Enabled standardized AI agent creation patterns',
      'Underpinned Hybrid-OneLake architecture',
      'Applied SFI-compliant deployment patterns'
    ]
  },
  {
    id: '8',
    title: 'AI-First Development Framework',
    description: 'Spec-driven development framework with agent-assisted engineering, delivering $2M-$3M annual productivity benefit for 100+ engineers.',
    fullDescription: 'Contributed to development of an AI-first framework for enterprise applications, including ADO Bridge agent for NLP-based requirements processing and hybrid agent architecture with centralized memory layer.',
    technologies: ['Microsoft Agent Framework', 'GitHub Copilot', 'Agent Package Manager (APM)', 'Hybrid Agents', 'Metadata-driven Architecture'],
    category: 'AI & Automation',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80',
    impact: [
      'Improved productivity and consistency across 100+ engineers',
      '$2M-$3M annualized productivity benefit',
      '40-50% efficiency gains on applicable workflows',
      'Accelerated onboarding from days to hours'
    ],
    metrics: [
      '100+ engineers impacted',
      '$2M-$3M annual benefit',
      '40-50% efficiency improvement',
      'Days → hours onboarding'
    ],
    highlights: [
      'Built ADO Bridge agent for requirements translation',
      'Led design for config-driven UI generation POC',
      'Researched agent distribution and packaging patterns',
      'Designed hybrid agents with self-learning memory layer'
    ]
  },
  {
    id: '9',
    title: 'Revenue Validation & Incentives Automation',
    description: 'Distributed pipelines automating revenue validation for digital sales incentives with AI-powered seller influence detection.',
    fullDescription: 'Built distributed pipelines and backend services to automate revenue validation using Spark, Cosmos DB, EventGrid, and Azure OpenAI for seller-influence detection, eliminating manual workflows.',
    technologies: ['Apache Spark', 'Azure Databricks', 'Cosmos DB', 'EventGrid', 'Azure OpenAI', 'Distributed Systems'],
    category: 'Data Platform',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    impact: [
      'Delivered $1M+ annual savings',
      'Eliminated manual validation workflows',
      'Enabled AI-powered seller influence detection',
      'Automated revenue reconciliation at scale'
    ],
    metrics: [
      '$1M+ annual savings',
      'Zero manual workflows',
      'Automated seller influence detection',
      'Real-time validation'
    ],
    highlights: [
      'Integrated Azure OpenAI for pattern detection',
      'Built event-driven architecture with EventGrid',
      'Designed distributed Spark pipelines',
      'Implemented Cosmos DB for high-throughput storage'
    ]
  },
  {
    id: '10',
    title: 'Metadata-Driven ETL Framework',
    description: 'Reusable Spark-based framework standardizing ingestion, validation, and governance, reducing time-to-market by 60%.',
    fullDescription: 'Created a metadata-driven ETL framework in Spark (Scala) that standardized ingestion, validation, and governance across diverse sources, enabling self-serve analytics for BI, warehouse, and lakehouse consumers.',
    technologies: ['Apache Spark (Scala)', 'Metadata-driven Architecture', 'Delta Lake', 'Data Governance', 'Self-serve Analytics'],
    category: 'Platform Engineering',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    impact: [
      'Cut time-to-market by ~60%',
      'Enabled self-serve analytics across teams',
      'Standardized ingestion and validation patterns',
      'Improved data governance and quality'
    ],
    metrics: [
      '60% time-to-market reduction',
      'Multi-source standardization',
      'Self-serve enablement',
      'Reusable framework'
    ],
    highlights: [
      'Built reusable platform SDKs in Scala',
      'Created plug-and-play components for microservices',
      'Standardized integration and governance patterns',
      'Enabled consistent operational best practices'
    ]
  },
  {
    id: '11',
    title: 'High-Scale Dispute Resolution Platform',
    description: 'Microservices-based backend powering billing dispute workflows for 1.5M+ active users with 15% incident reduction.',
    fullDescription: 'Designed and developed high-performance, scalable backend services using Node.js to power dispute resolution, with Apache Spark pipelines for batch processing and reporting.',
    technologies: ['Node.js', 'Apache Spark', 'Microservices', 'High-scale Backend', 'Batch Processing'],
    category: 'Backend Engineering',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80',
    impact: [
      'Scaled to support 1.5M+ active users',
      'Reduced production incidents by 15%',
      'Enhanced dispute resolution experience for millions',
      'Enabled data-driven insights and operational transparency'
    ],
    metrics: [
      '1.5M+ active users',
      '15% incident reduction',
      'High-performance at scale',
      'Independent scalability'
    ],
    highlights: [
      'Built Apache Spark pipelines for dispute data processing',
      'Led end-to-end development of billing dispute workflow',
      'Migrated from monolithic C++ to microservices architecture',
      'Developed comprehensive functional and unit test suite'
    ]
  }
];