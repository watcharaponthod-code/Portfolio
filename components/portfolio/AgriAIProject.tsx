import ProjectDetail from './ProjectDetail';

export default function AgriAIProject() {
  return (
    <ProjectDetail data={{
      id: 'agri-ai',
      title: 'Agri-AI: Satellite Field Monitoring',
      role: 'AI / MLOPS ENGINEER · TOKINTECH',
      year: '2026',
      tagline: 'Per-field sugarcane monitoring for a Thai sugar mill (TRR) from Sentinel-2 optical, Sentinel-1 radar and weather data. Two products run on it: CropScan Harvest Monitoring answers "cut or still standing, and how much", Yield Pro answers "how healthy, why, and how many tonnes per rai".',
      overview: 'Thousands of registered cane fields, one mill, and a 5-day satellite revisit that clouds wipe out for half the season. The system pulls every new Sentinel-2 and Sentinel-1 scene from Planetary Computer, computes per-pixel and per-field signals, fills the cloud gaps with a radar-to-NDVI model, labels each field with a health state and a cause, and pushes recommendations back into the mill\'s own backend. Every number it ships is measured out-of-block against the mill\'s real weighbridge tickets and harvest records, and the numbers that are not good enough yet are reported as exactly that.',
      mediaGallery: [
        { src: '/agri/cropscan-fields.png', caption: 'CROPSCAN // Sentinel-2 true colour (left) vs two-colour cut mask (right), four real fields, season 68' },
        { src: '/agri/harvest-sar-map.png', caption: 'SENTINEL-1 RADAR // per-field VH drop vs baseline, Dec 2025 → Mar 2026, 20×20 km around Si Thep' },
        { src: '/agri/cropscan-confusion.png', caption: 'CUT / STANDING GATE // confusion matrix on 8,924 fields, season 68 harvest tickets' },
        { src: '/agri/sar-gapfill.png', caption: 'SAR→NDVI GAPFILL // predicted vs true NDVI on 448,986 out-of-block pixels, Round A vs B' },
        { src: '/agri/yieldpro-backtest.png', caption: 'YIELD PRO // back-test against weighbridge tonnes, in-sample vs out-of-zone GroupKFold' },
      ],
      keyFeatures: [
        'CropScan Harvest Monitoring: a two-colour NDVI rule counts cut pixels inside each polygon and a Sentinel-1 VH-drop gate confirms it through cloud. Out-of-block on 8,924 fields (season 68): precision 0.869, recall 0.897, F1 0.883. Radar alone matches the harvest ticket 89–91% by mid-March.',
        'SAR→NDVI gapfill, the part that works through the rainy season: predicts the optical index from Sentinel-1 radar when clouds block Sentinel-2 for weeks. 95.7% of answered pixels within ±0.10 NDVI (MAE 0.034) on 129k held-out pixels, with conformal intervals and an explicit reject option at 28.8% coverage. Self-training with 22k pseudo-labels per fold changed nothing, and the deck says so.',
        'Yield Pro: LightGBM P10/P50/P90 tonnes-per-rai from optical, radar, rain, ET0, soil and DEM features. In-sample Spearman 0.72 is the ceiling; the honest out-of-zone number is 0.25–0.31, so the product ships deciles and ranking, not a tonne figure.',
        'MLOps loop: warehouse of raw pixels on a bucket, Kaggle/Modal GPU training, PROVENANCE.json next to every artifact, MLflow run registry, and a gate that cannot be moved after the result is seen.',
        'Production on Railway: FastAPI + built-in scheduler (daily every 5 days, full weekly), Loki + Grafana + Prometheus, per-pixel fetches served through the API only. Results land in the mill\'s SQL Server through SaveRecommendation / SaveStateSnapshot / SavePrediction.',
        'Field-scale cane mapping paper (unregistered field detection from AlphaEarth embeddings, recall 93.2%) submitted to Precision Agriculture (Springer), August 2026.',
      ],
      sections: [
        {
          title: 'System Architecture',
          body: 'Four zones. Zone 1 is the data: Sentinel-2, Sentinel-1 and DEM from Planetary Computer, NISAR from NASA Earthdata, CHIRPS rain, Open-Meteo weather and SoilGrids. Zone 2 is ours on Railway: the agri-ai service, the warehouse and model buckets, Jupyter, MLflow, Postgres, Loki and Grafana. Zone 3 is external GPU training on Kaggle and Modal. Zone 4 is the customer: the TRR backend API, its SQL Server, and the farmer app that shows what we send.',
          image: '/agri/agri-architecture.jpg',
          imageCaption: 'ARCHITECTURE // DATA → RAILWAY → GPU TRAINING → CUSTOMER',
          fullWidth: true,
        },
        {
          title: 'How the harvest signal is proven',
          body: 'A field is labelled "cut" when the share of pixels whose NDVI fell below 0.25 crosses 50%. That rule is scored against the mill\'s own weighbridge tickets: the field counts as truly cut 7 days after its last ticket and truly standing 7 days before its first. Fields that were cut before the baseline image are scored as 0% by design and handed to the radar channel instead, because the optical rule measures change between two images, not cumulative harvest.',
        },
        {
          title: 'What is not claimed',
          body: 'Yield tonnes per field are not shipped as a point estimate: out-of-zone correlation is a third of the in-sample figure, and the P10–P90 band only just covers 80% of real tickets. The gapfill model answers 28.8% of pixels at the 95% gate and abstains on the rest. Dust, burnt-cane and contamination detectors from the weighbridge cameras live in a separate repo (sugarcane-cv) with their own evidence tables.',
        },
      ],
      stack: ['Python', 'FastAPI', 'Sentinel-1 / Sentinel-2', 'Planetary Computer', 'LightGBM', 'PyTorch', 'Kaggle GPU', 'Modal', 'MLflow', 'Railway', 'Loki + Grafana', 'SQL Server'],
      metrics: [
        { label: 'CUT / STANDING F1', value: '0.883' },
        { label: 'GAPFILL WITHIN ±0.10', value: '95.7%' },
        { label: 'FIELDS SCORED', value: '8,924' },
        { label: 'OUT-OF-BLOCK PIXELS', value: '448,986' },
      ],
    }} />
  );
}
