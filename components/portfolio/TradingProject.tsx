import ProjectDetail from './ProjectDetail';

const DASHBOARD = 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public/dashboard.png';
const ARCH = 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public/architecture.svg';
const FLOW = 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public/strategy-flow.svg';

export default function TradingProject() {
  return (
    <ProjectDetail data={{
      id: 'trading',
      title: 'AlgoTrade Dashboard',
      role: 'FULL-STACK ENGINEER',
      year: '2025',
      tagline: 'Full-stack algorithmic trading dashboard with real-time market data visualization and strategy monitoring. Built for speed on Next.js 16 and TypeScript.',
      overview: 'AlgoTrade consolidates real-time market data, algorithm execution monitoring, and backtesting results into a single responsive interface. The core design challenge was keeping charts performant under continuous high-frequency data updates while maintaining a readable layout during high-volatility periods.',
      keyFeatures: [
        'Real-time market data visualization with interactive performance charts that update without blocking the UI thread.',
        'Algorithm status monitoring — connect and track multiple trading strategies in one view.',
        'Backtesting results dashboard with historical performance breakdowns and risk metrics.',
        'Fully type-safe codebase: Next.js 16 with TypeScript ensures compile-time correctness across the entire stack.',
        'Tailwind CSS design system for consistent, maintainable UI components.',
      ],
      sections: [
        {
          title: 'Dashboard Overview',
          body: 'The main dashboard surfaces the most critical metrics at a glance: P&L, position exposure, win rate, and active strategy status. Charts use a virtualized rendering approach so that adding more data points does not degrade performance over time.',
          image: DASHBOARD,
          imageCaption: 'MAIN_DASHBOARD // REAL-TIME TRADING VIEW',
          fullWidth: true,
        },
        {
          title: 'System Architecture',
          body: 'The frontend communicates with a data layer that abstracts market data sources, providing a unified API regardless of the underlying exchange or data provider. WebSocket connections maintain real-time price feeds with automatic reconnect logic.',
          image: ARCH,
          imageCaption: 'ARCHITECTURE_DIAGRAM // DATA FLOW',
          fullWidth: true,
        },
        {
          title: 'Strategy Flow',
          body: 'Each trading strategy is modeled as a state machine with clearly defined entry conditions, position sizing rules, stop-loss triggers, and exit signals. The flow diagram below maps the decision tree from market signal to order execution.',
          image: FLOW,
          imageCaption: 'STRATEGY_FLOW // SIGNAL TO EXECUTION',
          fullWidth: true,
        },
      ],
      stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'React', 'WebSocket', 'REST API'],
      metrics: [
        { label: 'FRAMEWORK', value: 'NEXT.JS 16' },
        { label: 'TYPE SAFETY', value: 'FULL-STACK TS' },
        { label: 'DATA', value: 'REAL-TIME' },
        { label: 'STATUS', value: 'OPEN SOURCE' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/trading',
    }} />
  );
}
