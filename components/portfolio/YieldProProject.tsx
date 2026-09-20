import ProjectDetail from './ProjectDetail';

export default function YieldProProject() {
  return (
    <ProjectDetail data={{
      id: 'yieldpro',
      title: 'Yield Pro: Health, Cause & Yield',
      role: 'MACHINE LEARNING · SAR→NDVI GAPFILL',
      year: '2026',
      tagline: 'Per-field health state, a cause label (drought, decline, recovery) and P10/P50/P90 tonnes per rai. The hard part is cloud, so a radar-to-NDVI model fills the optical gaps through the wet season.',
      overview: 'Yield Pro is the analysis side of the Agri-AI pipeline. For every field it keeps a health state from NDVI, NDWI and NDRE, labels why the state changed (drought, decline, recovery) using rain, ET0, soil and terrain, and forecasts tonnes per rai as a P10/P50/P90 band. None of that works if the optical series has holes, and in Thailand the rainy season removes weeks of Sentinel-2 at a time. The SAR→NDVI gapfill model predicts the optical index from Sentinel-1 radar for exactly those weeks, answers only when it is confident, and is scored on hundreds of thousands of held-out pixels. Yield is reported as deciles and ranking because the honest out-of-zone correlation does not support a tonne figure.',
      mediaGallery: [
        { src: '/agri/sar-gapfill.png', caption: 'SAR→NDVI GAPFILL // predicted vs true NDVI on 448,986 out-of-block pixels, Round A vs B' },
        { src: '/agri/yieldpro-backtest.png', caption: 'YIELD // back-test against weighbridge tonnes, in-sample vs out-of-zone GroupKFold' },
      ],
      keyFeatures: [
        'SAR→NDVI gapfill: PyTorch model on Sentinel-1 VV/VH plus weather, trained on Kaggle GPU with block-wise splits. Out-of-block n = 448,986 pixels (Nov 2025 → Jun 2026, season 68 EXPANSION only).',
        'Answered pixels: 95.7% within ±0.10 NDVI, MAE 0.034. Conformal intervals at the 95% gate give 28.8% coverage; the model abstains on the rest rather than guess.',
        'Self-training round B (about 22k pseudo-labels per fold) changed nothing measurable (MAE +0.0001), and that null result is kept in the deck.',
        'Yield: LightGBM P10/P50/P90 from optical, radar, CHIRPS rain, Open-Meteo ET0, SoilGrids and DEM. In-sample Spearman 0.72 is the ceiling; out-of-zone GroupKFold over 15 zones gives 0.25–0.31.',
        'The P10–P90 band covers about 80% of real weighbridge tonnes out-of-zone, so it ships as deciles and a ranking, not a point estimate.',
        'Cause labels and health states are pushed to the mill\'s SQL Server through SaveRecommendation / SavePrediction each cycle.',
      ],
      sections: [
        { title: 'Why deciles, not tonnes', body: 'On the in-sample fit the model looks good (ρ 0.72, n = 8,386 at week 14). Held out by zone it drops to 0.25–0.31. The decile ordering still holds (P50 deciles rise monotonically with true tonnes/rai from 7.3 to 12.2), which is useful for prioritising fields, but a per-field tonne figure would be presenting the in-sample number as if it were real.' },
        { title: 'What is not claimed', body: 'The gapfill model answers 28.8% of pixels at the 95% gate; the rest are left blank on purpose. Health and cause labels are rule plus model, not ground truth, and are validated against the mill\'s field activity records rather than against agronomist visits.' },
      ],
      stack: ['PyTorch', 'LightGBM', 'Sentinel-1 / Sentinel-2', 'CHIRPS', 'Open-Meteo', 'SoilGrids', 'Kaggle GPU', 'MLflow', 'Railway'],
      metrics: [
        { label: 'GAPFILL WITHIN ±0.10', value: '95.7%' },
        { label: 'OUT-OF-BLOCK PIXELS', value: '448,986' },
        { label: 'COVERAGE @95% GATE', value: '28.8%' },
        { label: 'YIELD ρ OUT-OF-ZONE', value: '0.25–0.31' },
      ],
    }} />
  );
}
