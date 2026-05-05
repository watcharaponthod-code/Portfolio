import ProjectDetail from './ProjectDetail';
import monitorImg from '../project/cpu/download.png';

export default function SystemMonitoringProject() {
  return (
    <ProjectDetail data={{
      id: 'system-monitoring',
      title: 'VM Auto-Scaling & Infrastructure Monitoring',
      role: 'INFRASTRUCTURE ENGINEER',
      year: '2024',
      tagline: 'Proactive VM auto-scaling system that provisions additional nodes before CPU/RAM saturation causes service degradation. Designed for high-availability production environments.',
      overview: 'Reactive scaling — adding resources only after a service is already degraded — causes unnecessary downtime. This system implements predictive, threshold-based scaling: it continuously monitors CPU and RAM usage across the VM cluster and triggers provisioning workflows when metrics approach danger thresholds, ensuring additional capacity is available before it\'s needed.',
      keyFeatures: [
        'Prometheus metrics collection with 15-second scrape intervals across all VM instances.',
        'Multi-threshold scaling rules: advisory alerts at 70%, soft-scale trigger at 80%, hard-scale trigger at 90% CPU/RAM.',
        'Automated instance provisioning script provisions new VMs from pre-baked images in under 3 minutes.',
        'Grafana dashboards visualize real-time CPU, RAM, disk, and network utilization across the entire cluster.',
        'Automatic scale-down after sustained low utilization — with a configurable cool-down period to prevent thrashing.',
        'Alert routing sends Slack notifications to on-call engineers with context (which host, which metric, current value, triggered action).',
      ],
      sections: [
        {
          title: 'Monitoring Dashboard',
          body: 'The Grafana dashboard provides a fleet-wide view of all VM health metrics. Each panel is configurable per-host or aggregated across the cluster. Color-coded thresholds make it immediately clear which hosts are healthy (green), approaching limits (yellow), or actively scaling (red).',
          image: monitorImg,
          imageCaption: 'MONITORING_DASHBOARD // CPU + RAM FLEET VIEW',
          fullWidth: true,
        },
        {
          title: 'Scaling Decision Logic',
          body: 'A Python daemon evaluates a rolling 5-minute average of CPU and RAM metrics from the Prometheus API. To prevent false triggers from momentary spikes, the scale-out condition requires the metric to exceed the threshold for at least 3 consecutive evaluation periods (5 minutes total). This eliminates the majority of unnecessary scale events.',
        },
        {
          title: 'Cost Optimization',
          body: 'Scale-down logic mirrors scale-out: sustained low utilization (below 30% for 20 consecutive minutes) triggers decommissioning of the youngest instance in the cluster. A minimum instance floor prevents the cluster from scaling below operational safety levels regardless of utilization.',
        },
      ],
      stack: ['Prometheus', 'Grafana', 'Python', 'Bash', 'Cloud VM API', 'Slack API', 'Docker'],
      metrics: [
        { label: 'SCALE TRIGGER', value: '90% CPU/RAM' },
        { label: 'PROVISION TIME', value: '< 3 MIN' },
        { label: 'SCRAPE INTERVAL', value: '15 SECONDS' },
        { label: 'AVAILABILITY', value: 'HIGH-AVAIL.' },
      ],
    }} />
  );
}
