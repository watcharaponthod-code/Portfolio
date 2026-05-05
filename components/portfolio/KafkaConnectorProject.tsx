import ProjectDetail from './ProjectDetail';
import kafkaImg from '../project/kafka/kafka1.png';

export default function KafkaConnectorProject() {
  return (
    <ProjectDetail data={{
      id: 'kafka-connector',
      title: 'Kafka-to-API Connector',
      role: 'MICROSERVICE ENGINEER',
      year: '2024',
      tagline: 'High-availability microservice managing scheduled data synchronization between Apache Kafka topics and partner API endpoints. Built on Java 21 and Spring Boot.',
      overview: 'Partner data synchronization previously relied on a fragile cron-job script that had no retry logic, no dead-letter handling, and no observability. This service replaced it with a production-grade, event-driven pipeline: Kafka consumers process messages from multiple topics, apply transformation logic, and deliver payloads to partner REST APIs with exponential backoff retry and full audit logging.',
      keyFeatures: [
        'Multi-topic Kafka consumer with configurable partition assignments and consumer group rebalancing.',
        'Three-phase processing pipeline: Consume → Transform → Deliver, with each phase independently observable and retryable.',
        'Exponential backoff retry with configurable max attempts and dead-letter queue publishing on final failure.',
        'Full audit trail: every message consumed, transformation applied, and API call made is persisted to PostgreSQL with timestamps and outcome codes.',
        'Spring Boot Actuator health endpoints expose live consumer lag, delivery success rate, and dead-letter queue depth to monitoring dashboards.',
        'Docker containerization with Kubernetes deployment YAML for zero-downtime rolling updates.',
      ],
      sections: [
        {
          title: 'Architecture Overview',
          body: 'The service is structured around a Spring Kafka listener container factory, with each topic mapped to a dedicated listener bean. Message transformation is handled by a pluggable transformer chain — each transformer is a Spring component that can be enabled or disabled per topic via configuration, without code changes.',
          image: kafkaImg,
          imageCaption: 'SERVICE_ARCHITECTURE // KAFKA → TRANSFORM → API',
          fullWidth: true,
        },
        {
          title: 'Reliability Design',
          body: 'Consumer offsets are committed only after successful API delivery. If delivery fails, the message is retried with exponential backoff. After the configured maximum attempts, the message is forwarded to a dead-letter topic and an alert is raised. This guarantees at-least-once delivery while preventing a single bad message from blocking the entire partition.',
        },
        {
          title: 'Observability',
          body: 'Every processing attempt is logged to a PostgreSQL audit table: message key, topic, transformation result, delivery HTTP status, and elapsed time. Grafana dashboards query this table to surface consumer lag trends, error rates per partner, and P95 delivery latency — giving operations teams actionable insight without access to raw logs.',
        },
      ],
      stack: ['Java 21', 'Spring Boot', 'Spring Kafka', 'Apache Kafka', 'PostgreSQL', 'Docker', 'Kubernetes', 'Grafana'],
      metrics: [
        { label: 'PATTERN', value: 'EVENT-DRIVEN' },
        { label: 'RELIABILITY', value: 'AT-LEAST-ONCE' },
        { label: 'PIPELINE', value: '3-PHASE' },
        { label: 'RUNTIME', value: 'JAVA 21' },
      ],
    }} />
  );
}
