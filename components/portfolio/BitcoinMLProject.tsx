import ProjectDetail from './ProjectDetail';

const ARCH = 'https://raw.githubusercontent.com/watcharaponthod-code/bitcoin-ml-prediction/main/architecture_diagram.png';

export default function BitcoinMLProject() {
  return (
    <ProjectDetail data={{
      id: 'bitcoin-ml',
      title: 'Bitcoin ML Prediction',
      role: 'MACHINE LEARNING ENGINEER',
      year: '2025',
      tagline: 'Multi-model ensemble for Bitcoin price prediction using LSTM, XGBoost, and Random Forest. LSTM achieves 87.81% accuracy trained on 12 years of BTC-USD data with 18 engineered technical indicators.',
      overview: 'Predicting cryptocurrency prices is one of the hardest time-series problems: high noise, regime changes, and complex temporal dependencies. This project builds a three-model ensemble to attack the problem from different angles — LSTM for continuous price regression using 90-day sequences, XGBoost and Random Forest for directional classification using 18 technical indicators. The LSTM model reaches 87.81% accuracy (MAPE-based) on held-out test data.',
      keyFeatures: [
        'LSTM neural network: 3-layer architecture (128 → 64 → 32 units) with Dropout(0.2) between layers. Huber loss for outlier robustness. 90-day lookback window. Trained with early stopping (patience 5) and LR reduction on plateau.',
        'XGBoost classifier: 500 estimators, max_depth 5, learning_rate 0.05 with subsampling for direction prediction.',
        'Random Forest: 500 estimators, max_depth 8, balanced class weights for signal confirmation.',
        '18 technical indicators across 5 categories: trend (MA7/30/50, EMA12/26), momentum (rate of return, trend strength), volatility (Bollinger Bands, 7/14-day volatility), oscillators (RSI, MACD, signal, histogram), and volume (change ratio).',
        '12 years of BTC-USD daily OHLCV data from Yahoo Finance (2013–2025), 4,200+ samples after feature engineering. 80/20 train/test split with MinMaxScaler normalisation.',
        'Top 5 XGBoost features by importance: RSI, MACD Histogram, 7-day Volatility, MA30, Volume Ratio.',
      ],
      sections: [
        {
          title: 'Model Architecture',
          body: 'The LSTM takes a (90, 7) input tensor — 90 days of OHLCV + derived features — and passes it through three stacked LSTM layers with progressive dimensionality reduction and Dropout regularisation. The final Dense(1, Linear) output produces a continuous price prediction. XGBoost and Random Forest take a flat (n_samples, 18) feature matrix and produce binary direction labels (up/down).',
          image: ARCH,
          imageCaption: 'SYSTEM_ARCHITECTURE // LSTM + XGBOOST + RANDOM FOREST ENSEMBLE',
          fullWidth: true,
        },
        {
          title: 'Model Performance',
          body: 'LSTM regression achieves 87.81% accuracy (100 - MAPE), MAE $2,847, RMSE $5,219 — strong performance for a single-asset daily predictor. XGBoost and Random Forest classification sit near 48–49%, which is expected: directional prediction on daily crypto data is close to random due to market efficiency. The ensemble combines LSTM price estimates with XGBoost/RF direction signals for confidence-weighted position sizing.',
        },
        {
          title: 'Feature Engineering Pipeline',
          body: 'Raw OHLCV data is enriched with 18 indicators before model input. Trend indicators capture multi-timeframe momentum via moving averages. Volatility indicators (Bollinger Bands width and position, 7/14-day rolling std) quantify uncertainty. Oscillators (RSI, MACD, histogram) identify overbought/oversold conditions. Volume change ratios detect abnormal accumulation or distribution events that often precede price moves.',
        },
        {
          title: 'Limitations & Future Work',
          body: 'The models are trained on daily OHLCV data only — no sentiment, news, or macroeconomic inputs. Classification accuracy near 50% reflects inherent market efficiency at the daily timeframe. Planned improvements: attention mechanisms in LSTM, Transformer model comparison, SHAP explainability, real-time prediction pipeline, and news sentiment integration via FinBERT.',
        },
      ],
      stack: ['Python', 'TensorFlow 2.x', 'Keras', 'XGBoost', 'scikit-learn', 'pandas', 'numpy', 'yfinance', 'joblib', 'MinMaxScaler'],
      metrics: [
        { label: 'LSTM ACCURACY', value: '87.81%' },
        { label: 'TRAINING DATA', value: '12 YEARS' },
        { label: 'INDICATORS', value: '18 FEATURES' },
        { label: 'LOOKBACK', value: '90 DAYS' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/bitcoin-ml-prediction',
    }} />
  );
}
