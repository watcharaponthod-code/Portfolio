import ProjectDetail from './ProjectDetail';

const BASE = 'https://raw.githubusercontent.com/watcharaponthod-code/Ninja_fruit/main';
const GIF1 = `${BASE}/demo/demo-gameplay.gif`;
const GIF2 = `${BASE}/demo/demo-gameplay-2.gif`;
const GIF3 = `${BASE}/demo/demo-gameplay-3.gif`;

export default function NinjaFruitProject() {
  return (
    <ProjectDetail data={{
      id: 'ninja-fruit',
      title: 'Ninja Fruit',
      role: 'COMPUTER VISION',
      year: '2024',
      tagline: 'Fruit Ninja-style game controlled entirely by your body. No controllers, no keyboard — just a webcam and your hands. YOLOv8 Pose Detection tracks 17 keypoints per person at 30+ FPS and turns wrist movements into slash trajectories.',
      overview: 'Ninja Fruit replaces the touchscreen of the mobile original with real-time pose estimation from a webcam. YOLOv8 detects and tracks people in the frame, assigns each person to Player 1, 2, or 3 by horizontal position, then continuously monitors the last 6 frames of wrist-keypoint history. When a wrist moves more than 15 pixels between frames, a slash is registered — and the game checks whether that slash trajectory intersects any fruit in mid-air. All of this runs at 30+ FPS on a laptop GPU using Pygame for rendering.',
      mediaGallery: [
        { src: GIF1, caption: 'DEMO_01 // SINGLE PLAYER — SLASH DETECTION AT 30+ FPS' },
        { src: GIF2, caption: 'DEMO_02 // MULTIPLAYER — UP TO 3 PLAYERS SIMULTANEOUSLY' },
        { src: GIF3, caption: 'DEMO_03 // GAMEPLAY — FRUIT SLICING + BOMB AVOIDANCE' },
      ],
      keyFeatures: [
        'YOLOv8 Pose model (yolov8n-pose.pt) detects people and extracts 17 COCO keypoints per tracked person — no additional hardware or special markers required.',
        'Player Assigner maps YOLO track IDs to up to 3 players by X-position on screen. Supports simultaneous multiplayer: left third = Player 1, center = Player 2, right = Player 3.',
        'Hand History Buffer stores the last 6 frames of wrist positions (keypoints 9 and 10) per player. Slash is detected when wrist displacement exceeds 15 px/frame.',
        'Fruit/Bomb collision uses line-segment to circle distance check between the slash path (p1 → p2) and each fruit object. Precise sub-pixel accuracy without heavy physics simulation.',
        'Score & Combo system: +1 point per fruit cut, combo bonus for 3 consecutive cuts, -5 for hitting a bomb. Live score display with juice particle VFX on every cut.',
        '60-second countdown timer with increasing fruit spawn rate. End-game screen shows per-player score breakdown.',
      ],
      sections: [
        {
          title: 'ML Pipeline — Webcam to Slash',
          image: GIF1,
          imageCaption: 'PIPELINE_DEMO // YOLOV8 KEYPOINT TRACKING → SLASH DETECTION',
          body: 'Every frame captured by OpenCV VideoCapture goes through four stages: (1) YOLOv8 Pose infers bounding boxes and 17 keypoints per person. (2) The Player Assigner maps each YOLO track ID to a player slot based on the horizontal centroid of the detection. (3) The Hand History module appends the current wrist positions to a 6-frame rolling buffer. (4) The Slash Detector measures Euclidean distance between the oldest and newest wrist position in the buffer — if it exceeds the threshold, a slash vector (p1 → p2) is emitted to the collision engine.',
        },
        {
          title: 'Multiplayer Architecture',
          image: GIF2,
          imageCaption: 'MULTIPLAYER_DEMO // 3-PLAYER SIMULTANEOUS TRACKING',
          body: 'YOLO's built-in object tracker (ByteTrack) assigns persistent IDs to each detected person across frames. The Player Assigner sorts active track IDs by their bounding box centre x-coordinate and assigns them to slots 1/2/3. This means players can move around and the game automatically reassigns slots — no manual calibration. The GameManager maintains separate score dictionaries and hand-history buffers for each slot.',
        },
        {
          title: 'Slash Detection & Collision',
          image: GIF3,
          imageCaption: 'COLLISION_DEMO // SLASH TRAJECTORY vs FRUIT HITBOX',
          body: 'Once a slash vector (p1 → p2) is emitted, the collision engine checks it against every active fruit object using a line-segment to circle distance formula. Fruit objects are circles with radius proportional to the fruit type. Bomb objects have a slightly larger hit radius and trigger -5 score + particle explosion rather than a cut animation. False positives (accidental slow movement) are suppressed by the 15 px/frame threshold — which was tuned empirically across different webcam resolutions.',
        },
        {
          title: 'Game Engine & Rendering',
          body: 'The Pygame renderer composites three layers on every frame: (1) the mirrored webcam frame as background, (2) all active fruit/bomb sprites with physics (parabolic arc, gravity, rotation), and (3) the HUD overlay (timer, per-player scores, combo indicator). All rendering happens in main.py at 30 FPS. The game uses a fixed-timestep physics update so fruit behaviour is deterministic regardless of GPU speed.',
        },
        {
          title: 'Class Architecture',
          body: 'TrackerCamera (camera.py): wraps YOLO inference and track-ID assignment. update() returns an RGB frame and a dict mapping player slot → list of 17 keypoints. GameManager (game.py): owns the fruit spawn scheduler, slash detection logic, collision engine, score system, and particle pool. The game loop in main.py calls camera.update() → game.update(keypoints) → game.draw(frame) → pygame.display.flip() every frame.',
        },
        {
          title: 'Tech Stack & Requirements',
          body: 'Python 3.x · YOLOv8 (Ultralytics) with yolov8n-pose.pt weights (6.3 MB) · OpenCV for capture and frame pre-processing · Pygame for 60 FPS game rendering · NumPy for keypoint arithmetic. Minimum requirements: any USB webcam at 30 FPS, NVIDIA GPU recommended for real-time inference (CPU-only mode runs at ~15 FPS). All dependencies installable via pip install -r requirements.txt.',
        },
      ],
      stack: ['Python', 'YOLOv8', 'Ultralytics', 'OpenCV', 'Pygame', 'NumPy'],
      metrics: [
        { label: 'INFERENCE SPEED', value: '30+ FPS' },
        { label: 'POSE KEYPOINTS', value: '17 / PERSON' },
        { label: 'MAX PLAYERS', value: '3 SIMULTANEOUS' },
        { label: 'INPUT', value: 'WEBCAM ONLY' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/Ninja_fruit',
    }} />
  );
}
