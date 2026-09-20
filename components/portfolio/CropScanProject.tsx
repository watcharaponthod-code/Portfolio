import ProjectDetail from './ProjectDetail';

export default function CropScanProject() {
  return (
    <ProjectDetail data={{
      id: 'cropscan',
      title: 'CropScan: Harvest Monitoring',
      role: 'REMOTE SENSING · ML',
      year: '2026',
      tagline: 'Which sugarcane fields are cut, when, and how much of each field. Optical NDVI from Sentinel-2 does the counting; Sentinel-1 radar takes over when the rainy season hides the ground. Scored against the mill\'s own harvest tickets on 8,924 fields.',
      overview: 'The mill needs to know, field by field, whether harvest has started and how far it has gone, without sending anyone to look. CropScan answers that from satellites. Every new Sentinel-2 scene is compared with the field\'s own pre-harvest baseline: pixels whose NDVI dropped below 0.25 are counted as cut, and the field flips to "cut" when that share crosses 50%. Because clouds block optical imagery for weeks in the wet season, a second channel watches Sentinel-1 radar: a VH backscatter drop against the field\'s own baseline confirms harvest through cloud. Both channels are measured out-of-block against real weighbridge tickets, and the numbers below are those measurements, not in-sample fits.',
      mediaGallery: [
        { src: '/agri/cropscan-fields.png', caption: 'CROPSCAN // Sentinel-2 true colour (left) vs two-colour cut mask (right), four real fields, season 68' },
        { src: '/agri/harvest-sar-map.png', caption: 'SENTINEL-1 RADAR // per-field VH drop vs baseline, Dec 2025 → Mar 2026, 20×20 km around Si Thep' },
        { src: '/agri/cropscan-confusion.png', caption: 'CUT / STANDING GATE // confusion matrix on 8,924 fields, season 68 harvest tickets' },
      ],
      keyFeatures: [
        'Two-colour NDVI rule per polygon: count pixels with NDVI ≤ 0.25 against the field\'s pre-harvest image; cut % is the share of the polygon, and "cut" fires at 50%.',
        'Sentinel-1 VH-drop gate for the wet season: agreement with harvest tickets rises from 66% (Dec) to 89–91% by mid-March as fields are cut.',
        'Out-of-block on 8,924 fields, season 68: precision 0.869, recall 0.897, accuracy 0.881, F1 0.883. A field counts as truly cut 7 days after its last ticket and truly standing 7 days before its first.',
        'Largest contiguous cut block reported alongside cut %, so a 50% figure can be told apart from scattered noise.',
        'Fields cut before the baseline image score 0% by design and are handed to the radar channel: the optical rule measures change between two images, not cumulative harvest.',
        'Runs on the Agri-AI pipeline on Railway; results land in the mill\'s SQL Server through SaveStateSnapshot every cycle.',
      ],
      sections: [
        { title: 'How the signal is proven', body: 'The rule is scored against the mill\'s weighbridge tickets, which say when each field actually delivered cane. The score is out-of-block: fields in the test set never influenced the thresholds. False negatives are mostly fields that were cut in stages over weeks; false positives are mostly fields that were cut before the baseline image, which is why that case is routed to radar.' },
        { title: 'What is not claimed', body: 'CropScan does not estimate tonnes. It does not see through cloud with optical data, which is exactly why the radar channel exists. Radar agreement is reported as a percentage of tickets matched at each date, not as a classifier metric, because the two channels answer slightly different questions.' },
        {
          title: 'Outcome',
          body: "What it changed for the mill: harvest planning now runs on a field-by-field map that updates every satellite pass, instead of phone calls and site visits. The mill did not have to buy an outside satellite-AI subscription: comparable vendor offers in this market run about 5 million baht per three years for a closed dashboard. This system is owned by the mill, exposes every result through its own API, and the same data can be reused in its farmer app and in further analysis.",
        },
      ],
      stack: ['Sentinel-2 NDVI', 'Sentinel-1 VH', 'Planetary Computer', 'rasterio', 'Python', 'FastAPI', 'Railway', 'SQL Server'],
      metrics: [
        { label: 'F1 (OUT-OF-BLOCK)', value: '0.883' },
        { label: 'FIELDS SCORED', value: '8,924' },
        { label: 'PRECISION / RECALL', value: '0.869 / 0.897' },
        { label: 'RADAR VS TICKETS (MAR)', value: '89–91%' },
      ],
    }} />
  );
}
