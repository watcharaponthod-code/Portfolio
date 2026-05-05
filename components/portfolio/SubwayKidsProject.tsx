import ProjectDetail from './ProjectDetail';

export default function SubwayKidsProject() {
  return (
    <ProjectDetail data={{
      id: 'subway-kids',
      title: 'Subway Kids Runner',
      role: 'COMPUTER VISION ENGINEER',
      year: '2025',
      tagline: 'A Subway Surfers-style endless runner controlled by full-body gestures via webcam. No hardware required — just a laptop camera and your body.',
      overview: 'Subway Kids Runner maps real-world body movements to in-game actions using MediaPipe Pose Estimation. The player jumps by raising their legs, ducks by crouching, and changes lanes by leaning left or right. The core question driving the project was whether a physically engaging gameplay experience could be created using only commodity hardware already available on any laptop.',
      keyFeatures: [
        'MediaPipe BlazePose tracks 33 full-body landmarks per frame, giving sub-20ms pose inference on CPU.',
        'Gesture mapping converts landmark positions to game actions (jump, duck, lane left, lane right) using relative joint angles and distances.',
        'Debounce logic prevents a single gesture from triggering multiple events — each action has a cooldown window after detection.',
        'Endless runner engine with procedurally generated obstacles, lane switching, and increasing speed over time.',
        'Adaptive normalization calibrates to the player\'s standing pose, making the system work reliably across different heights and camera angles.',
      ],
      sections: [
        {
          title: 'Pose-to-Action Mapping',
          body: 'The hardest part of this project was not pose detection — it was the mapping logic. A "jump" must be distinguishable from simply shifting weight. A "lean left" must not trigger when the player slightly adjusts posture. Each action uses a combination of 2–4 joint ratios with hysteresis bands: the gesture must enter AND remain in the trigger zone for a minimum number of frames before registering.',
        },
        {
          title: 'Lane Switching',
          body: 'Lane changes use the lateral displacement of the shoulder midpoint relative to the hip midpoint. This is normalized by torso length so the threshold scales with the player\'s distance from the camera. The result: a consistent "lean 20% left" triggers a lane switch regardless of whether the player is sitting close or standing far from the screen.',
        },
        {
          title: 'Technical Architecture',
          body: 'MediaPipe runs in a dedicated subprocess, publishing pose landmarks to a shared memory buffer at the camera frame rate (~30Hz). The Pygame game loop reads from this buffer at each tick, keeping game physics fully decoupled from pose inference speed. This prevents camera latency from affecting gameplay smoothness.',
        },
      ],
      stack: ['Python', 'MediaPipe', 'Pygame', 'OpenCV', 'NumPy'],
      metrics: [
        { label: 'INFERENCE', value: '< 20MS (CPU)' },
        { label: 'LANDMARKS', value: '33 / FRAME' },
        { label: 'CONTROL', value: 'FULL BODY' },
        { label: 'HARDWARE', value: 'WEBCAM ONLY' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/subway-kids',
    }} />
  );
}
