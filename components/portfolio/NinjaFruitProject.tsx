import ProjectDetail from './ProjectDetail';

const GIF_1 = 'https://raw.githubusercontent.com/watcharaponthod-code/Ninja_fruit/main/demo/demo-gameplay.gif';
const GIF_2 = 'https://raw.githubusercontent.com/watcharaponthod-code/Ninja_fruit/main/demo/demo-gameplay-3.gif';

export default function NinjaFruitProject() {
  return (
    <ProjectDetail data={{
      id: 'ninja-fruit',
      title: 'Ninja Fruit',
      role: 'COMPUTER VISION ENGINEER',
      year: '2025',
      tagline: 'A real-time Fruit Ninja-style game controlled entirely by body movement via webcam. No controller. No keyboard. Just YOLOv8 pose detection and your hands.',
      overview: 'Ninja Fruit started as an experiment: could a real-time game be controlled purely through computer vision with acceptable latency? Using YOLOv8 Pose Detection, the system tracks hand keypoints at each frame to infer slash trajectories, then maps those trajectories to fruit collisions in the game world. The result is a genuinely playable game that runs on any laptop with a webcam.',
      keyFeatures: [
        'YOLOv8 pose estimation detects 17 body keypoints per frame in real-time, with wrist positions used as the slash control points.',
        'Trajectory inference converts continuous hand motion into discrete slash vectors, filtered to reduce jitter and false positives.',
        'Fruit physics simulation with spawn, gravity, and collision detection running concurrently with the pose pipeline.',
        'Adaptive thresholds calibrate to the player\'s range of motion at startup, improving accuracy across different body sizes and camera distances.',
      ],
      sections: [
        {
          title: 'Gameplay Demo',
          body: 'Fruits spawn from random positions and fall with simulated gravity. The player raises their hands — tracked by the webcam — and slices fruits by moving their wrists through the fruit hitbox. The game detects the slash direction and plays the appropriate slice animation.',
          image: GIF_1,
          imageCaption: 'LIVE_GAMEPLAY // YOLOV8 POSE DETECTION',
          fullWidth: true,
        },
        {
          title: 'Real-Time Performance',
          body: 'The biggest engineering challenge was latency. YOLOv8n-pose (nano variant) achieves 30+ FPS on a laptop GPU while leaving enough headroom for the game loop. Pose results are processed on a separate thread and passed to the game engine via a shared queue, keeping frame times consistent.',
          image: GIF_2,
          imageCaption: 'MULTI_ANGLE_GAMEPLAY // TRACKING ACCURACY',
          fullWidth: true,
        },
        {
          title: 'False Positive Problem',
          body: 'Initial versions registered accidental slices from elbow or shoulder movements. The solution was a two-frame velocity filter — only wrist movements exceeding a velocity threshold across consecutive frames trigger a slash event. This eliminated ~95% of false positives while keeping intentional slices responsive.',
        },
      ],
      stack: ['Python', 'YOLOv8', 'OpenCV', 'NumPy', 'Pygame', 'Pose Estimation'],
      metrics: [
        { label: 'INFERENCE', value: '30+ FPS' },
        { label: 'KEYPOINTS', value: '17 / FRAME' },
        { label: 'MODEL', value: 'YOLOV8N-POSE' },
        { label: 'CONTROL', value: 'WEBCAM ONLY' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/Ninja_fruit',
    }} />
  );
}
