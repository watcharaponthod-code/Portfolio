import ProjectDetail from './ProjectDetail';
import geoImg from '../project/geomap/LINE_20260324_213523.jpg';

export default function GeoMapProject() {
  return (
    <ProjectDetail data={{
      id: 'geomap',
      title: "Bank's EDC Ecosystem Visualizer",
      role: 'DATA VISUALIZATION ENGINEER',
      year: '2024',
      tagline: 'Interactive real-time map visualizing bank EDC terminal installations across every province in Thailand. Built for internal operations teams.',
      overview: 'Bank operations teams needed a way to monitor the status and distribution of thousands of EDC terminals (card payment machines) across Thailand in real-time. The existing solution was a spreadsheet. This application replaced it with an interactive map, live analytics dashboard, and filterable data views — reducing time-to-insight from minutes to seconds.',
      keyFeatures: [
        'Live Leaflet.js map plots all EDC terminals across Thailand, color-coded by machine type and operational status.',
        'Multi-dimensional filtering: province, region, machine type, and status — all filters combine and update the map and charts simultaneously.',
        'Chart.js analytics panel shows distribution breakdowns that update in real-time as filters change.',
        'CSV export of filtered data sets with one click — the most-requested feature by operations staff.',
        'FastAPI backend with SQLAlchemy ORM provides a typed, high-performance REST API layer over the PostgreSQL data source.',
      ],
      sections: [
        {
          title: 'Map Interface',
          body: 'The Leaflet.js map clusters markers at high zoom levels to prevent rendering thousands of individual pins simultaneously. Clicking a cluster expands it; clicking an individual terminal shows its ID, type, installation date, and current status in a popup. The map viewport state is preserved when switching between map and table views.',
          image: geoImg,
          imageCaption: 'LIVE_MAP // EDC TERMINAL DISTRIBUTION · THAILAND',
          fullWidth: true,
        },
        {
          title: 'Performance Considerations',
          body: 'The initial load fetches a lightweight summary dataset (terminal count per province) for fast initial render. Full terminal data is loaded progressively as the user interacts with the map. This reduced initial page load time from ~4 seconds to under 800ms despite the large dataset.',
        },
        {
          title: 'Filter Architecture',
          body: 'All filters are stored in a single URL-serializable state object. This means every filtered view has a shareable URL — operations staff can bookmark or share specific views (e.g., "all offline terminals in the North region") without re-applying filters manually.',
        },
      ],
      stack: ['FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Leaflet.js', 'Chart.js', 'Python', 'JavaScript'],
      metrics: [
        { label: 'COVERAGE', value: 'ALL THAILAND' },
        { label: 'DATA', value: 'REAL-TIME' },
        { label: 'LOAD TIME', value: '< 800MS' },
        { label: 'EXPORT', value: 'CSV ONE-CLICK' },
      ],
    }} />
  );
}
