import ProjectDetail from './ProjectDetail';

const RAW = 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main';

export default function SugarcaneCVProject() {
  return (
    <ProjectDetail data={{
      id: 'sugarcane-cv',
      title: 'Sugarcane CV: Nine Detectors at the Mill Gate',
      role: 'COMPUTER VISION / ML ENGINEER',
      year: '2026',
      tagline: 'Nine detection problems from one real project at a Thai sugar mill: read the truck, grade what it carries, watch the cane flow into the shredder. Two of the nine are solved without a neural network, and every number below says what it was measured on.',
      overview: 'A cane truck arrives at the mill, is weighed, identified, graded and tipped; the cane then rides a conveyor into the shredder. Along that path sit CCTV cameras, a webcam at the weighbridge and a microphone at the tipping bay, and each of the nine detectors here answers one question from one of those sensors. The public repo holds the training code and the core algorithms only: no model files and no customer images. Every figure in it states its evidence, including the figures that cannot yet be trusted. That rule carries over to this page. Where the README gives no number, this page says so rather than filling the gap.',
      mediaGallery: [
        { src: `${RAW}/figures/site_map.svg`, caption: 'SITE MAP // where each detector sits: weighbridge (plate, cane-on-truck, burnt/fresh, mix, dirt), tipping bay (dust, acoustic), conveyor (cane flow)' },
        { src: `${RAW}/figures/method_map.svg`, caption: 'METHOD MAP // trained models vs hand-written rules. Cane-on-truck and burnt-mix use no model at all; plate OCR has one model-free reader' },
        { src: `${RAW}/media/dust_real.gif`, caption: 'DUST OPACITY // per-zone opacity while a side-tipper unloads. Public clip, qualitative run only, not part of any score' },
        { src: `${RAW}/figures/cane_flow_grid.jpg`, caption: 'CANE FLOW // frames sampled across a run. Labels start from a small hand-made set, then the model self-trains' },
      ],
      keyFeatures: [
        'Two problems solved without a model, on purpose. Cane-on-truck uses edges and motion only (3.9 ms per frame on CPU, deployed at the weighbridge). Burnt-cane mixing uses one colour statistic, bright%, because burnt piles have almost no bright stalks and a rule the author can read and explain was enough.',
        'Trained models only where a rule failed. Burnt vs fresh went to EfficientNet-B0 after the real CCTV data killed the "burnt is black, fresh is green" assumption. Dust uses LR-ASPP segmentation, but a hand-written zone-evidence veto removes the false alerts instead of a retrain.',
        'Cane flow on the conveyor is a self-training segmenter: a small hand-labelled seed set, then the model labels further frames itself. The binding constraint was speed, not accuracy, and it runs at 69.9 fps on real in-mill video.',
        'Two independent Thai plate readers. One is ONNX + OpenCV with cross-frame voting for accuracy; the other is pure classical CV (morphology, connected components, template match) that runs on a Raspberry Pi with no ML. Both follow one rule: if it answers, it must be right. Weak evidence returns accepted=false and goes to a human.',
        'Contaminants that a camera cannot see (sand, rock, metal inside the pile) are caught by sound: a log-mel CNN trained on generated impacts mixed onto real tipping-bay background audio. Sand reaches 94 to 98 percent recall at near-perfect precision on unseen real audio.',
        'Every result is scored on held-out data split by day and camera, always reported with coverage, and failures are written up with the same weight as successes: the burnt-colour assumption, the dirty-area dataset and the dust test set are each marked as unusable in the README.',
      ],
      sections: [
        {
          title: 'GROUP A · WHAT IS ON THE TRUCK',
          body: 'Four questions asked from the weighbridge cameras, one truck at a time: is there anything on the truck at all, is the cane burnt or fresh, how much of a mixed load is burnt, and how much of it is soil and trash rather than cane. The first is a pure rule, the second a trained classifier, the third a colour statistic, and the fourth a trained model whose data turned out not to be enough.',
        },
        {
          title: 'A1 · Burnt vs fresh cane',
          body: 'What it detects: whether the load on a truck is burnt cane or fresh cane. Some farmers burn the field before cutting; burnt cane is paid less at the weighbridge, so grading each truck has direct commercial value. Method: a trained image classifier, EfficientNet-B0 at 384 px, 6 epochs, 5-fold cross-validation. Data: 8,612 real CCTV frames from the mill, 4 classes, 6 days, 2 cameras (MPDC00 and MPK00), from the public Roboflow dataset aimlsugarcane (CC BY 4.0). This data broke the whole earlier pipeline: everything built before assumed burnt cane is glossy black and fresh cane is green. Real burnt cane is neither. What actually separates them is whether leaves are still attached plus a dry, pale surface, so all synthetic training data and every colour rule derived from it were thrown out. Evidence: mean over 5 folds, recall 0.873 ±0.117, precision 0.843 ±0.108, accuracy 0.9586 ±0.0069; worst fold recall 0.711, precision 0.658, accuracy 0.9500. Mean F1 0.854 against a camera-only baseline of 0.417. Caveat stated up front: class and camera are almost perfectly confounded. 94 percent of burnt samples come from one camera and 79 percent of fresh from the other, so the model can score well by learning which camera took the picture. Measured per camera, recall is 0.944 on MPDC00 and 0.415 on MPK00. The lower number is the more honest one, and it is why every result in the repo is reported per camera. Status: works, but camera-bound.',
          image: `${RAW}/figures/real_burnt_cane.jpg`,
          imageCaption: 'REAL BURNT CANE // greyish-brown, pale, dry dull stalks, leaves burnt off. Not black, not glossy',
          fullWidth: true,
        },
        {
          title: 'A2 · Burnt cane mixed into a load',
          body: 'What it detects: what share of the visible top surface of a load is burnt cane. A truck is rarely all-burnt or all-fresh; the question is how much burnt cane on the surface should flip the grade. Method: no model. The detector counts bright stalks, because a burnt pile has almost none. Two candidate colour statistics were tested on simulated mixes (burnt surface pixels composited onto a fresh pile, both scattered in patches and as one continuous layer). black% fails: fresh cane in the shadow of the truck bed measures 36.6 percent dark and burnt cane 43 to 60 percent, so the ranges overlap and texture filtering does not separate them. bright% works: burnt piles have 0.6 to 6 percent bright stalks while fresh piles always have some, 19 to 21 percent even in shadow, a clear 3x gap. Data: two clips only. Evidence: simulated mix images; the README gives no accuracy figure. Limitations as written: the 8/15 thresholds are provisional, derived from only two clips, and must be re-set on real footage; the frame must be taken after the bed is raised or once the dust has settled, because dust brightens the pile enough to break the rule. Status: rule found, threshold not set.',
          image: `${RAW}/figures/burn_mix_30pct_scattered.jpg`,
          imageCaption: 'SIMULATED MIX // burnt surface pixels composited onto a fresh pile, 30 percent, scattered in patches',
          fullWidth: true,
        },
        {
          title: 'A3 · Dirt, tops and leaf trash',
          body: 'What it detects: what share of the load is soil, cane tops and leaf trash instead of millable cane. The mill does not want to pay for dirt. Method: a trained segmentation model (the README names no architecture; the training scripts live in src/dirty_area). Data: 65 original real images, expanded by Roboflow augmentation to 158; the true unit count is 54 trucks. Result: inconclusive, and the reasons are recorded rather than hidden. The sugar-cane class has zero annotations across all 158 images, so the "fraction of the pile" cannot be computed at all; only dirty ÷ (dirty + labelled clean area) can, and that depends on how wide each annotator drew their boxes. The published split leaks: one original image appears three times in train and once in valid, which is 10 percent of a 10-image validation set. The cross-camera score of 0.842 is exactly equal to a baseline that always guesses the majority class, meaning the model learned nothing. The README is explicit that this does not mean the problem is unsolvable, only that 65 images cannot decide it. Status: inconclusive, data-limited.',
          image: `${RAW}/figures/dirty_area_labels.jpg`,
          imageCaption: 'DIRTY-AREA LABELS // annotation overview. The labelling standard itself is the bottleneck',
          fullWidth: true,
        },
        {
          title: 'A4 · Is there cane on the truck',
          body: 'What it detects: before anything else, a side camera decides whether the incoming truck is loaded or empty and triggers the front camera to capture a paired shot. Method: no trained model for the decision. It fuses classical feature cues (edges and motion) with a tracker, and a pinned test set keeps the Python and browser versions numerically identical. Truck localisation in the same pipeline uses a YOLO11n detector in a web worker, but it runs only occasionally and is not part of the loaded-or-empty decision. Everything runs fully offline at the weighbridge. Evidence: timings measured on CPU with no GPU. Computer vision (motion + tracker), every frame: 3.9 ms, headroom to roughly 250 fps. Truck localisation (YOLO11n, web worker), occasional: 280 ms. Cane decision (cue + fusion), once per truck: 9 ms. Plate read (ONNX + verification), once per truck: 0.2 to 2.5 s. The README gives no detection accuracy figure for this stage. Status: installed and in use on site, 3.9 ms per frame.',
          image: `${RAW}/figures/canegate_live.png`,
          imageCaption: 'CANE GATE LIVE // the pipeline running at the weighbridge, from truck localisation to the loaded-or-empty call',
          fullWidth: true,
        },
        {
          title: 'GROUP B · THE TIPPING BAY',
          body: 'Two detectors watch the moment the truck unloads. One measures the dust cloud from the camera; the other listens for sand, rock and metal that a camera cannot see inside the pile.',
        },
        {
          title: 'B1 · Dust opacity while tipping',
          body: 'What it detects: how thick the dust cloud is as a truck tips, scored per tipping bay and written to an event log, to trigger water spray and feed environmental reporting. Method: a trained model plus a hand-written rule. LR-ASPP segmentation with a density head (cut-off 0.29) marks which pixels are dust; then a zone-evidence veto weights each bay\'s detected% by the fraction of pixels that actually look like airborne dust. That single rule removes false alerts from dark static cane piles and truck beds without retraining the model. The opacity equation itself was checked in simulation before any model existed. Data and evidence: a synthetic test set. The README states the limitation bluntly: the scored test set contains not one real photograph with dust in it. All positive examples are AI-generated, and the only two real images are empty yards that were already used in training. Every recall figure is therefore a test of the pipeline logic on synthetic input, not field accuracy; the README does not publish those recall numbers. The demo clips are public footage, run qualitatively, and count towards no score. A trustworthy false-alert rate still needs fresh empty-yard footage the model has never seen. Status: in use, but not yet verified against real dust.',
          image: `${RAW}/media/dust_base_vs_veto.gif`,
          imageCaption: 'BASE MODEL VS VETO // same clip. The bare model alerts on the dark cane pile; the vetoed model does not',
          fullWidth: true,
        },
        {
          title: 'B2 · Sand, rock and metal by sound',
          body: 'What it detects: sand, stones and metal hidden in the pile, which damage the shredder. A camera cannot see inside the load, but a microphone hears the impact when it hits the conveyor. Method: a trained model on audio. Sound is converted to a log-mel spectrogram and a small CNN reads it. Training data: impact and sand sounds were generated with Stable Audio Open on a GTX 1060, filtered through acceptance criteria (1 to 10 kHz band energy ≥ 0.35, attack ≤ 20 ms, decay ≤ 800 ms, peak/mean ≥ 6), then mixed onto real background audio recorded at the tipping yard at SNR +12 down to −12 dB with millisecond-level ground truth. 57 clips generated, 30 passed the criteria, 80 test clips, 418 events in total. Evidence, tested on real tipping-bay audio the model had never heard. Energy-threshold rule: impact recall/precision 0.58/0.25, sand 0.35/n/a, 7.6 false alerts per minute. CNN with 0.5 s window: impact 0.47/0.59, sand 0.94/1.00, 2.2 false alerts per minute. CNN with 0.25 s window: impact 0.59/0.35, sand 0.98/0.995, 7.2 false alerts per minute. The README calls sand solved: 94 to 98 percent recall at near-perfect precision on real audio, the strongest result in the project. The CNN beats the plain rule by 2.4x on precision and cuts false alerts 3.5x, because it learned not to react to cane hitting the rails, chains and hammers. Impacts (rock and metal) are not claimed as solved: recall sits at 0.47 to 0.59. No figure for this detector exists in the repo. Status: sand solved; impacts still open.',
        },
        {
          title: 'GROUP C · THE CONVEYOR',
          body: 'After tipping, the cane rides a conveyor into the shredder. The belt never stops, so the one detector here has to keep up with it on the hardware the mill already owns.',
        },
        {
          title: 'C1 · Cane flow on the conveyor',
          body: 'What it detects: the share of leaf on the moving sheet of cane, giving a continuous quality signal instead of one still image per truck. Method: a self-training segmentation model. Labels start from a small hand-made set and the model then labels further frames itself; the training and self-training scripts are in src/cane_flow (the README does not name the architecture, and the script names there are the only hint that it is YOLO-based). Data and evidence: real video from inside the mill. The published number is speed, not accuracy: 69.9 fps sustained end to end on real in-mill video. The README gives no leaf-share accuracy figure and says the interesting constraint of this task was speed, because the belt never stops and the segmenter has to keep pace on existing equipment. Status: running at 70 fps on real video; accuracy not reported.',
          image: `${RAW}/media/caneflow_real.gif`,
          imageCaption: 'CANE FLOW // leaf-area segmentation on real in-mill video with live fresh-percentage readout, 69.9 fps sustained',
          fullWidth: true,
        },
        {
          title: 'GROUP D · READING THE TRUCK',
          body: 'Every load must be bound to the right farmer, which means reading the plate at the weighbridge. Thai truck plates are numeric (for example 83-6237) in one standard font nationwide, which makes the problem better defined than general OCR.',
        },
        {
          title: 'D1 · Thai licence plate OCR',
          body: 'What it detects: the number plate of the truck on the weighbridge. Method: two independent readers. The ONNX + OpenCV reader uses a trained detector, an ONNX reader and cross-frame voting, and exists for accuracy. The pure-CV reader uses morphology, then connected components, then template matching against the standard font; it uses no ML at all, runs on a Raspberry Pi, and every step can be explained. Design rule: if it answers, it must be right. The goal is not to read every truck but to make every row written to the CSV trustworthy. On weak evidence it returns accepted=false with a reason and hands the image to a person; one wrong row costs more than ten manual checks. Data and evidence: strict mode on a 60-image hard set, built by compositing plates onto truck images and degrading them with blur, skew, darkness, glare, noise, JPEG quality 40, small size and an off-template font, run on CPU only. Before tuning: answered 48 of 60, 48 correct, 0 wrong, 12 sent to a human, median 2,236 ms per image. After tuning: answered 51 of 60, 51 correct, 0 wrong, 9 sent to a human, median 182 ms per image. The row that matters is wrong = 0; the send-to-human count is the price of it. The README is explicit that this is a controlled synthetic set for comparing readers and catching code regressions, not field accuracy, which depends on the camera, the light and how dirty the plate is. No figure for this detector exists in the repo. Status: designed for zero wrong reads.',
        },
        {
          title: 'GROUP E · SUPPORTING',
          body: 'One model exists to make the others measurable rather than to answer a business question on its own.',
        },
        {
          title: 'E1 · Stalk segmentation',
          body: 'What it detects: the outline of each individual cane stalk. On its own this has no business value; it exists so that downstream features (leaf share, stalk length, stacking orientation) can be measured on real stalks instead of guessed from the colour of the whole image. Method: a trained model with a frozen DINOv2 backbone and a two-layer head. Data: 31 hand-labelled images. Evidence: the README shows the qualitative output below and gives no metric. Status: supporting work.',
          image: `${RAW}/figures/stalk_seg_dino.jpg`,
          imageCaption: 'STALK SEGMENTATION // frozen DINOv2 backbone + two-layer head, trained on 31 hand-labelled images',
          fullWidth: true,
        },
        {
          title: 'How the results are reported',
          body: 'Three rules from the README apply to every number above. Numbers come from held-out data, split along the structure that actually matters, by day and by camera, not by random shuffle. Accuracy is always reported together with coverage, meaning how many cases the model was willing to answer. Failures are recorded with the same weight as successes: the burnt-colour assumption, the dirty-area dataset and the dust test set are each marked as unusable, because a number that cannot be defended is worse than no number. Credits as stated in the repo: real mill images come from the aimlsugarcane dataset on Roboflow (CC BY 4.0), the conveyor and tipping clips are public video, the background audio was recorded at a real tipping yard, and the code is MIT-licensed. The evaluation method is packaged separately as model-proof-loop.',
        },
      ],
      stack: ['Python', 'PyTorch', 'torchvision', 'OpenCV', 'NumPy', 'Pillow', 'ONNX', 'EfficientNet-B0', 'LR-ASPP', 'DINOv2', 'YOLO11n', 'Log-mel CNN', 'Stable Audio Open', 'diffusers / transformers', 'soundfile', 'Raspberry Pi'],
      metrics: [
        { label: 'REAL CCTV FRAMES', value: '8,612' },
        { label: 'CANE FLOW', value: '70 FPS' },
        { label: 'CANE-ON-TRUCK', value: '3.9 MS / FRAME' },
        { label: 'PLATE HARD SET', value: '0 WRONG OF 60' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/sugarcane-cv',
    }} />
  );
}
