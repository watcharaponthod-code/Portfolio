import ProjectDetail from './ProjectDetail';

const BASE = 'https://raw.githubusercontent.com/watcharaponthod-code/subway-kids/main';
const GIF1   = `${BASE}/demo/demo-gameplay.gif`;
const GIF2   = `${BASE}/demo/demo-gameplay-2.gif`;
const MLFLOW = `${BASE}/docs/ml-dataflow.svg`;

export default function SubwayKidsProject() {
  return (
    <ProjectDetail data={{
      id: 'subway-kids',
      title: 'Subway Kids Runner',
      role: 'COMPUTER VISION',
      year: '2024',
      tagline: 'Subway Surfers-style endless runner controlled entirely by your body via webcam. MediaPipe Pose tracks 33 full-body landmarks at 60 FPS. Lean left, lean right, or jump — no keyboard, no controller. Deployable both as a local Pygame game and as a browser-based WebSocket game.',
      overview: 'Subway Kids replaces all keyboard/touch input with real-time human pose estimation. MediaPipe Pose (Lite model, model_complexity=0) detects 33 body landmarks per frame at 60 FPS. The system calculates the horizontal centre of the hips and classifies it into three lanes: left (< 38% of frame width), centre (38–62%), or right (> 62%). In web mode, the browser camera captures frames and streams them to a FastAPI WebSocket server, which runs pose estimation and sends lane + jump commands back to the browser game engine. This dual-mode architecture lets the game run both on desktop (Pygame) and in any modern browser without plugins.',
      mediaGallery: [
        { src: GIF1, caption: 'DEMO_01 // BODY-CONTROLLED LANE SWITCHING AT 60 FPS' },
        { src: GIF2, caption: 'DEMO_02 // OBSTACLE AVOIDANCE — LEAN AND JUMP GESTURES' },
        { src: MLFLOW, caption: 'ML_DATA_FLOW // MEDIAPIPE PIPELINE ARCHITECTURE DIAGRAM' },
      ],
      keyFeatures: [
        'MediaPipe Pose Lite (model_complexity=0) detects 33 full-body landmarks per frame with <10ms inference time — fast enough for 60 FPS gameplay on a standard laptop.',
        'Lane classification uses the average of LEFT_HIP (landmark 23) and RIGHT_HIP (landmark 24) x-coordinate normalised to frame width: < 0.38 = Left lane, 0.38–0.62 = Centre, > 0.62 = Right lane.',
        'Jump detection: when the nose landmark (landmark 0) rises above y < 0.30 of the frame, a jump event fires. Debounce filtering prevents repeated triggers from a single jump.',
        'Dual deployment mode: Local mode runs everything on desktop with Pygame at 60 FPS (no server needed). Web mode uses a FastAPI WebSocket server — browser streams JPEG frames, server runs pose estimation, sends lane/jump commands back over the same socket.',
        'Dockerised architecture: Dockerfile.server for the FastAPI pose server, Dockerfile.web for the Next.js frontend. docker-compose.yml orchestrates both services with a single command.',
        'Keyboard fallback: arrow keys still work for testing or when webcam is unavailable. R to restart, F to toggle fullscreen, ESC/Q to quit.',
      ],
      sections: [
        {
          title: 'Live Gameplay — Local Mode',
          image: GIF1,
          imageCaption: 'LOCAL_MODE // PYGAME + MEDIAPIPE — FULL 60 FPS BODY CONTROL',
          body: 'In local mode, OpenCV VideoCapture grabs frames directly from the webcam. Each frame is flipped horizontally (mirror mode) and converted from BGR to RGB before being passed to MediaPipe Pose. The resulting landmarks are consumed by the Lane Classifier, which maps the hip-centre x-coordinate to one of three lanes. The Pygame game engine reads the lane output every frame and slides the player sprite toward the target lane with lerp-based smooth movement.',
        },
        {
          title: 'Gameplay Demo — Obstacle Avoidance',
          image: GIF2,
          imageCaption: 'WEB_MODE // BROWSER CAMERA → WEBSOCKET → FASTAPI → GAME',
          body: 'Obstacles scroll down the screen at increasing speed. As the player levels up, obstacle density and speed both increase. The jump gesture (nose above y=0.30) lets the player clear low obstacles. Collision detection uses axis-aligned bounding boxes. A debounce timer of 200ms prevents consecutive false-positive lane changes from rapid micro-movements — tuned to match natural walking/leaning speed.',
        },
        {
          title: 'ML Data Flow Architecture',
          image: MLFLOW,
          imageCaption: 'ARCHITECTURE // MEDIAPIPE PIPELINE — WEBCAM TO GAME COMMAND',
          body: 'The data flow starts at the webcam (local OpenCV or browser MediaStream), passes through frame preprocessing (mirror + colour conversion), then into MediaPipe Pose. The 33-landmark output is processed by two parallel classifiers: the Lane Classifier (hip-centre x) and the Jump Detector (nose y threshold). Both outputs are merged into a single game command packet that is either applied directly in Pygame (local mode) or sent over WebSocket to the browser game engine (web mode).',
        },
        {
          title: 'Web Mode — FastAPI + WebSocket',
          body: 'The browser captures camera frames using getUserMedia, encodes them as JPEG, and sends them over a WebSocket connection to the FastAPI server. The server decodes each frame, runs MediaPipe Pose, extracts hip-centre and nose-y values, and returns a JSON response: { "lane": 0|1|2, "jump": true|false }. The browser game loop reads these commands on every tick and updates the player state. Latency on a local network is typically under 20ms, which is imperceptible at 60 FPS.',
        },
        {
          title: 'Docker Deployment',
          body: 'Two Docker containers: the pose server (Python + FastAPI + MediaPipe + OpenCV) and the web frontend (Next.js). docker-compose.yml binds both to a shared network so the browser can reach the WebSocket at ws://localhost:8000/ws. For production, the server container can be deployed on any machine with a GPU and the Next.js app can be deployed on Vercel with the WebSocket URL configured as an environment variable.',
        },
        {
          title: 'Tech Stack & Performance',
          body: 'Python 3 · MediaPipe Pose (Lite, model_complexity=0) · OpenCV (cv2) · Pygame @ 60 FPS · FastAPI + WebSocket (web mode) · Next.js (web frontend) · Docker + docker-compose. Local mode runs at 60 FPS on any laptop with a webcam. Web mode introduces a round-trip WebSocket latency of ~15–20ms on localhost. MediaPipe Lite model requires no GPU — it runs on CPU with <10ms inference per frame.',
        },
      ],
      stack: ['Python', 'MediaPipe', 'OpenCV', 'Pygame', 'FastAPI', 'WebSocket', 'Next.js', 'Docker', 'TypeScript'],
      metrics: [
        { label: 'GAME FPS', value: '60 FPS' },
        { label: 'POSE LANDMARKS', value: '33 / FRAME' },
        { label: 'INFERENCE TIME', value: '<10ms' },
        { label: 'DEPLOYMENT', value: 'LOCAL + WEB' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/subway-kids',
    }} />
  );
}
