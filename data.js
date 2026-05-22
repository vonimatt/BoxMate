// ─── STRENGTH MOVEMENTS ──────────────────────────────────────────────────────
const STRENGTH_MOVEMENTS = [
  { id: 'back_squat',    label: 'Back Squat',       category: 'lower'  },
  { id: 'front_squat',   label: 'Front Squat',       category: 'lower'  },
  { id: 'deadlift',      label: 'Deadlift',          category: 'hinge'  },
  { id: 'press',         label: 'Strict Press',      category: 'upper'  },
  { id: 'push_press',    label: 'Push Press',        category: 'upper'  },
  { id: 'bench_press',   label: 'Bench Press',       category: 'upper'  },
  { id: 'clean',         label: 'Clean (1RM)',        category: 'oly'    },
  { id: 'snatch',        label: 'Snatch (1RM)',       category: 'oly'    },
  { id: 'clean_jerk',    label: 'Clean & Jerk',      category: 'oly'    },
];

const ENDURANCE_BENCHMARKS = [
  { id: 'run_400',  label: '400m Run',  unit: 'mm:ss' },
  { id: 'run_1k',   label: '1km Run',   unit: 'mm:ss' },
  { id: 'run_5k',   label: '5km Run',   unit: 'mm:ss' },
  { id: 'row_500',  label: '500m Row',  unit: 'mm:ss' },
  { id: 'row_2k',   label: '2km Row',   unit: 'mm:ss' },
];

// ─── SKILL PROGRESSIONS ───────────────────────────────────────────────────────
// Each step: { id, label, drill, sets, reps, notes }
const SKILL_PROGRESSIONS = {
  pull_up: {
    label: 'Pull-up',
    category: 'upper_gymnastics',
    steps: [
      { id: 0, label: 'Dead Hang',          drill: 'Dead hang hold',              sets: 3, reps: '20-30s', notes: 'Engage scapula, full grip' },
      { id: 1, label: 'Scapular Pulls',     drill: 'Scapular pull-ups',           sets: 3, reps: '8',     notes: 'Arms straight, depress scapula' },
      { id: 2, label: 'Ring Rows',          drill: 'Ring rows + negatives',       sets: 3, reps: '8+5',   notes: '3s lowering on negatives' },
      { id: 3, label: 'Band-Assisted',      drill: 'Banded pull-ups',             sets: 4, reps: '6',     notes: 'Light band, full ROM' },
      { id: 4, label: 'Kipping Swing',      drill: 'Kipping swing + hip pop',     sets: 3, reps: '10',    notes: 'Hollow → arch → drive hips' },
      { id: 5, label: 'Pull-up (RX)',       drill: 'Strict pull-ups',             sets: 4, reps: '5',     notes: 'Full ROM, chin over bar' },
    ]
  },
  chest_to_bar: {
    label: 'Chest-to-Bar Pull-up',
    category: 'upper_gymnastics',
    steps: [
      { id: 0, label: 'Strict Pull-up x5',   drill: 'Strict pull-ups',             sets: 4, reps: '5',    notes: 'Prerequisite: 5 unbroken' },
      { id: 1, label: 'High Pull-up',         drill: 'Pull-up to sternum',          sets: 3, reps: '5',    notes: 'Drive elbows down hard' },
      { id: 2, label: 'Banded C2B',           drill: 'Banded chest-to-bar',         sets: 4, reps: '6',    notes: 'Chest touches bar' },
      { id: 3, label: 'C2B Kipping',          drill: 'Kipping C2B',                 sets: 4, reps: '5',    notes: 'Aggressive hip drive, chest contact' },
      { id: 4, label: 'C2B (RX)',             drill: 'Chest-to-bar pull-ups',       sets: 3, reps: '8',    notes: 'Consistent contact, unbroken' },
    ]
  },
  bar_muscle_up: {
    label: 'Bar Muscle-up',
    category: 'upper_gymnastics',
    steps: [
      { id: 0, label: 'C2B Pull-up x5',      drill: 'C2B pull-ups',                sets: 3, reps: '5',    notes: 'Prerequisite: 5 unbroken C2B' },
      { id: 1, label: 'Hip Pop Drill',        drill: 'Bar hip pop to hip crease',   sets: 3, reps: '6',    notes: 'Bar hits hip, lean back' },
      { id: 2, label: 'Jumping Bar MU',       drill: 'Low bar jumping muscle-up',   sets: 3, reps: '5',    notes: 'Get the turnover feel' },
      { id: 3, label: 'Banded Bar MU',        drill: 'Banded bar muscle-up',        sets: 3, reps: '4',    notes: 'Band assists the transition' },
      { id: 4, label: 'Bar MU Negatives',     drill: 'Muscle-up negatives from top',sets: 3, reps: '4',    notes: 'Slow 3s lowering' },
      { id: 5, label: 'Bar MU (RX)',          drill: 'Bar muscle-ups',              sets: 3, reps: '3',    notes: 'Smooth kip + turnover' },
    ]
  },
  ring_muscle_up: {
    label: 'Ring Muscle-up',
    category: 'upper_gymnastics',
    steps: [
      { id: 0, label: 'Ring Row',             drill: 'Ring rows (body flat)',       sets: 3, reps: '10',   notes: 'Chest to rings, controlled' },
      { id: 1, label: 'False Grip Hold',      drill: 'False grip dead hang',        sets: 3, reps: '20s',  notes: 'Wrist over ring' },
      { id: 2, label: 'Ring Dip',             drill: 'Strict ring dips',            sets: 3, reps: '6',    notes: 'Full lockout at top' },
      { id: 3, label: 'Banded Ring MU',       drill: 'Banded ring muscle-up',       sets: 3, reps: '4',    notes: 'Hips to rings, turnover' },
      { id: 4, label: 'Low Ring Transition',  drill: 'Transition drill (feet assist)',sets:3, reps: '5',   notes: 'Feel the catch position' },
      { id: 5, label: 'Ring MU Kipping',      drill: 'Kipping ring muscle-up',      sets: 3, reps: '3',    notes: 'Hips → pull → turnover' },
      { id: 6, label: 'Ring MU (RX)',         drill: 'Strict ring muscle-ups',      sets: 3, reps: '2',    notes: 'No kip, full control' },
    ]
  },
  hspu: {
    label: 'Handstand Push-up',
    category: 'upper_gymnastics',
    steps: [
      { id: 0, label: 'Pike Push-up',         drill: 'Pike push-ups',               sets: 3, reps: '10',   notes: 'Hips high, straight body' },
      { id: 1, label: 'Box HSPU',             drill: 'Box handstand push-ups',      sets: 3, reps: '8',    notes: 'Feet on box, pike position' },
      { id: 2, label: 'Wall HSPU (kipping)',  drill: 'Wall HSPU with kip',          sets: 4, reps: '5',    notes: 'Kick and press, heels to wall' },
      { id: 3, label: 'Strict Wall HSPU',     drill: 'Strict wall handstand push-up',sets:4, reps: '4',    notes: 'Slow, controlled, no kip' },
      { id: 4, label: 'Deficit HSPU 2cm',     drill: 'HSPU with 2cm deficit',       sets: 3, reps: '4',    notes: 'Plates under hands' },
      { id: 5, label: 'Deficit HSPU 5cm',     drill: 'HSPU with 5cm deficit',       sets: 3, reps: '3',    notes: 'Full head-below-hands ROM' },
      { id: 6, label: 'HSPU (RX)',            drill: 'Handstand push-ups (strict)', sets: 4, reps: '5',    notes: 'Competition standard' },
    ]
  },
  handstand_walk: {
    label: 'Handstand Walk',
    category: 'upper_gymnastics',
    steps: [
      { id: 0, label: 'Wall Walk',            drill: 'Wall walks',                  sets: 3, reps: '5',    notes: 'Full extension at top' },
      { id: 1, label: 'HS Hold (wall)',       drill: 'Handstand hold at wall',      sets: 3, reps: '30s',  notes: 'Belly to wall, active shoulders' },
      { id: 2, label: 'Shoulder Taps',        drill: 'HS shoulder taps at wall',    sets: 3, reps: '10',   notes: 'Tap alternating shoulders' },
      { id: 3, label: 'Kick to HS (freestand)',drill:'Kick to freestanding HS',     sets: 5, reps: '3 attempts', notes: 'Hold 2-3s if possible' },
      { id: 4, label: 'HS Walk 3m',           drill: 'Handstand walk 3m',           sets: 4, reps: '3m',   notes: 'Small hand steps' },
      { id: 5, label: 'HS Walk 10m',          drill: 'Handstand walk 10m',          sets: 3, reps: '10m',  notes: 'Maintain hollow body' },
      { id: 6, label: 'HS Walk (RX)',         drill: 'Handstand walk 25m',          sets: 3, reps: '25m',  notes: 'Competition standard' },
    ]
  },
  toes_to_bar: {
    label: 'Toes-to-Bar',
    category: 'core_lower',
    steps: [
      { id: 0, label: 'Hanging Knee Raise',   drill: 'Hanging knee raises',         sets: 3, reps: '10',   notes: 'Knees to chest, controlled' },
      { id: 1, label: 'Hip Hinge Hang',       drill: 'Hanging hip hinge',           sets: 3, reps: '8',    notes: 'Pike hips, feel lat engagement' },
      { id: 2, label: 'Kipping Swing',        drill: 'Kipping swing + knee raise',  sets: 3, reps: '8',    notes: 'Hollow → arch → drive knees' },
      { id: 3, label: 'TTB (kipping)',        drill: 'Kipping toes-to-bar',         sets: 4, reps: '5',    notes: 'Touch both feet together' },
      { id: 4, label: 'TTB Unbroken',         drill: 'TTB unbroken sets',           sets: 3, reps: '10',   notes: 'Rhythm, don\'t break early' },
      { id: 5, label: 'TTB (RX)',             drill: 'Strict toes-to-bar',          sets: 3, reps: '8',    notes: 'No kip, pure core' },
    ]
  },
  double_under: {
    label: 'Double-Unders',
    category: 'jump_rope',
    steps: [
      { id: 0, label: 'Single Unders',        drill: '100 single unders',           sets: 1, reps: '100',  notes: 'Consistent rhythm' },
      { id: 1, label: 'Power Jumps',          drill: 'Power jumps (big bounce)',    sets: 3, reps: '20',   notes: 'High jump, prep for DU' },
      { id: 2, label: 'DU Singles (attempts)',drill: 'Attempt 1 DU per jump',       sets: 3, reps: '20 attempts', notes: '1 DU, 1 SU, repeat' },
      { id: 3, label: '10 Consecutive DU',    drill: '10 DU in a row',              sets: 5, reps: '10',   notes: 'Rest between sets' },
      { id: 4, label: '30 Consecutive DU',    drill: '30 DU unbroken',              sets: 4, reps: '30',   notes: 'Focus on wrist flick' },
      { id: 5, label: 'DU (RX)',              drill: 'Double-unders',               sets: 3, reps: '50',   notes: 'Unbroken target' },
    ]
  },
  pistol_squat: {
    label: 'Pistol Squat',
    category: 'core_lower',
    steps: [
      { id: 0, label: 'Box Pistol',           drill: 'Pistol squat to box',         sets: 3, reps: '6/leg', notes: 'Touch box, don\'t sit' },
      { id: 1, label: 'Assisted Pistol',      drill: 'TRX/ring assisted pistol',    sets: 3, reps: '6/leg', notes: 'Hold band/ring for balance' },
      { id: 2, label: 'Negative Pistol',      drill: 'Slow lowering pistol',        sets: 3, reps: '4/leg', notes: '4s lowering, stand with 2 legs' },
      { id: 3, label: 'Pistol (RX)',          drill: 'Pistol squats',               sets: 3, reps: '5/leg', notes: 'Free standing, full depth' },
    ]
  },
  rope_climb: {
    label: 'Rope Climb',
    category: 'other',
    steps: [
      { id: 0, label: 'Ring Row (inverted)',  drill: 'Inverted ring rows',          sets: 3, reps: '8',    notes: 'Horizontal body, arms only' },
      { id: 1, label: 'Rope Pull to Stand',   drill: 'Seated rope pull-to-stand',   sets: 3, reps: '6',    notes: 'Pull from floor to standing' },
      { id: 2, label: 'Legless Rope Climb',   drill: '1 legless rope climb',        sets: 3, reps: '1',    notes: 'Arms only, 1 length if possible' },
      { id: 3, label: 'J-Hook Foot Technique',drill: 'Rope climb with J-hook',      sets: 3, reps: '2',    notes: 'Master the foot wrap' },
      { id: 4, label: 'Rope Climb (RX)',      drill: 'Rope climbs',                 sets: 3, reps: '3',    notes: '15ft standard' },
    ]
  },
};

// ─── METCON LIBRARY ───────────────────────────────────────────────────────────
// Tags: type, duration (min), modality, intensity
const METCONS = [
  // --- HIGH INTENSITY, SHORT (7-10 min) ---
  {
    id: 'fran',
    name: 'Fran',
    type: 'For Time',
    duration: 8,
    modality: 'barbell_gymnastics',
    intensity: 'high',
    description: '21-15-9: Thrusters (43/29kg) + Pull-ups',
    movements: ['thruster', 'pull_up'],
    scales: { thruster: '29/20kg', pull_up: 'Ring Rows or Band Pull-ups' }
  },
  {
    id: 'grace',
    name: 'Grace',
    type: 'For Time',
    duration: 7,
    modality: 'barbell',
    intensity: 'high',
    description: '30 Clean & Jerks for time (60/43kg)',
    movements: ['clean_jerk'],
    scales: { clean_jerk: '43/29kg' }
  },
  {
    id: 'amrap_12_thruster_du',
    name: 'Thruster Engine',
    type: 'AMRAP',
    duration: 12,
    modality: 'barbell_mono',
    intensity: 'high',
    description: '12 min AMRAP: 10 Thrusters (40kg) + 30 Double-Unders',
    movements: ['thruster', 'double_under'],
    scales: { thruster: '30kg', double_under: '60 Single-Unders' }
  },
  {
    id: 'emom_10_snatch',
    name: 'Snatch EMOM',
    type: 'EMOM',
    duration: 10,
    modality: 'barbell',
    intensity: 'high',
    description: 'EMOM 10: 1 Snatch @ 80-85% 1RM',
    movements: ['snatch'],
    scales: { snatch: 'Power Snatch @ 70%' }
  },
  {
    id: 'cindy',
    name: 'Cindy',
    type: 'AMRAP',
    duration: 20,
    modality: 'gymnastics',
    intensity: 'moderate',
    description: '20 min AMRAP: 5 Pull-ups + 10 Push-ups + 15 Air Squats',
    movements: ['pull_up', 'push_up', 'air_squat'],
    scales: { pull_up: 'Ring Rows', push_up: 'Knee Push-ups' }
  },
  {
    id: 'amrap_8_bmu_bar',
    name: 'MU Ladder',
    type: 'AMRAP',
    duration: 8,
    modality: 'gymnastics',
    intensity: 'high',
    description: '8 min AMRAP: 3 Bar Muscle-ups + 6 Box Jumps (60cm) + 9 Wall Balls (9kg)',
    movements: ['bar_muscle_up', 'box_jump', 'wall_ball'],
    scales: { bar_muscle_up: '6 C2B Pull-ups', box_jump: '50cm' }
  },
  {
    id: 'emom_16_mixed',
    name: 'EMOM 16 Mixed',
    type: 'EMOM',
    duration: 16,
    modality: 'mixed',
    intensity: 'moderate',
    description: 'EMOM 16 (4 rounds): Min1: 12 Cal Row | Min2: 10 TTB | Min3: 8 Clean (65%) | Min4: Rest',
    movements: ['row', 'toes_to_bar', 'clean'],
    scales: { toes_to_bar: 'Hanging Knee Raises', clean: 'Power Clean @ 60%' }
  },
  {
    id: 'for_time_hspu_dl',
    name: 'HSPU Grind',
    type: 'For Time',
    duration: 12,
    modality: 'barbell_gymnastics',
    intensity: 'high',
    description: 'For Time: 21-15-9 Deadlifts (100/70kg) + HSPU',
    movements: ['deadlift', 'hspu'],
    scales: { hspu: 'Box HSPU or Pike Push-ups', deadlift: '70/50kg' }
  },
  {
    id: 'amrap_15_engine',
    name: 'Aerobic Engine',
    type: 'AMRAP',
    duration: 15,
    modality: 'monostructural',
    intensity: 'moderate',
    description: '15 min AMRAP: 400m Run + 20 Air Squats + 15 Push-ups',
    movements: ['run', 'air_squat', 'push_up'],
    scales: { run: '350m or Row 400m' }
  },
  {
    id: 'dt',
    name: 'DT',
    type: 'For Time',
    duration: 12,
    modality: 'barbell',
    intensity: 'high',
    description: '5 Rounds: 12 Deadlifts + 9 Hang Power Cleans + 6 Push Jerks (70/47kg)',
    movements: ['deadlift', 'hang_power_clean', 'push_jerk'],
    scales: { all: '50/35kg' }
  },
  {
    id: 'emom_12_cl_ttb',
    name: 'Clean + TTB EMOM',
    type: 'EMOM',
    duration: 12,
    modality: 'mixed',
    intensity: 'moderate',
    description: 'EMOM 12 (alt): Min odd: 3 Power Cleans @ 75% | Min even: 10 TTB',
    movements: ['power_clean', 'toes_to_bar'],
    scales: { toes_to_bar: 'Knee Raises', power_clean: '65%' }
  },
  {
    id: 'amrap_20_chipper_style',
    name: 'Long Engine',
    type: 'AMRAP',
    duration: 20,
    modality: 'mixed',
    intensity: 'moderate',
    description: '20 min AMRAP: 15/12 Cal Bike + 12 Wall Balls (9/6kg) + 9 TTB + 6 DB Snatch (22.5/15kg)',
    movements: ['bike', 'wall_ball', 'toes_to_bar', 'db_snatch'],
    scales: { toes_to_bar: 'Sit-ups', db_snatch: '15/10kg' }
  },
  {
    id: 'deload_light_amrap',
    name: 'Deload Flow',
    type: 'AMRAP',
    duration: 15,
    modality: 'monostructural',
    intensity: 'low',
    description: '15 min easy AMRAP: 200m Jog + 10 Air Squats + 10 Ring Rows + 10 Push-ups',
    movements: ['run', 'air_squat', 'ring_row', 'push_up'],
    scales: { run: 'Row 250m' }
  },
  {
    id: 'kelly',
    name: 'Kelly',
    type: 'For Time',
    duration: 22,
    modality: 'monostructural_gymnastics',
    intensity: 'moderate',
    description: '5 Rounds: 400m Run + 30 Box Jumps (60cm) + 30 Wall Balls (9kg)',
    movements: ['run', 'box_jump', 'wall_ball'],
    scales: { box_jump: '50cm', wall_ball: '6kg' }
  },
  {
    id: 'emom_10_strict_press',
    name: 'Press EMOM',
    type: 'EMOM',
    duration: 10,
    modality: 'barbell',
    intensity: 'moderate',
    description: 'EMOM 10: 3 Strict Press @ 75% 1RM',
    movements: ['press'],
    scales: { press: '65% for 4 reps' }
  },
  {
    id: 'amrap_10_hs_work',
    name: 'Handstand Aerobic',
    type: 'AMRAP',
    duration: 10,
    modality: 'gymnastics',
    intensity: 'moderate',
    description: '10 min AMRAP: 5 Wall Walks + 10 Push-ups + 15 Air Squats',
    movements: ['wall_walk', 'push_up', 'air_squat'],
    scales: { wall_walk: '3 Wall Walks' }
  },
  {
    id: 'heavy_conditioning',
    name: 'Heavy Day Finisher',
    type: 'For Time',
    duration: 10,
    modality: 'barbell',
    intensity: 'high',
    description: 'For Time: 10-8-6-4-2 Squat Cleans (75% 1RM)',
    movements: ['squat_clean'],
    scales: { squat_clean: 'Power Clean @ 70%' }
  },
  {
    id: 'row_intervals',
    name: 'Row Intervals',
    type: 'For Time',
    duration: 16,
    modality: 'monostructural',
    intensity: 'high',
    description: '4x 500m Row, rest 2 min between each. Target: sub-1:45/500m pace',
    movements: ['row'],
    scales: { row: 'Bike 12/10 Cal or 400m Run' }
  },
  {
    id: 'gymnastics_chipper',
    name: 'Gymnastics Chipper',
    type: 'For Time',
    duration: 18,
    modality: 'gymnastics',
    intensity: 'high',
    description: 'For Time: 50 Pull-ups + 40 TTB + 30 HSPU + 20 Ring Dips + 10 Bar MU',
    movements: ['pull_up', 'toes_to_bar', 'hspu', 'ring_dip', 'bar_muscle_up'],
    scales: { pull_up: 'Ring Rows', hspu: 'Box HSPU', bar_muscle_up: 'C2B' }
  },
  {
    id: 'sprint_wod',
    name: 'Sprint Intervals',
    type: 'For Time',
    duration: 9,
    modality: 'monostructural',
    intensity: 'high',
    description: '3 Rounds: 400m Sprint, rest 1 min. Target: max effort each round',
    movements: ['run'],
    scales: { run: '20/16 Cal Row or Bike' }
  },
  {
    id: 'deload_row_walk',
    name: 'Deload Row + Mobility',
    type: 'For Time',
    duration: 20,
    modality: 'monostructural',
    intensity: 'low',
    description: '20 min easy row or bike at conversational pace (RPE 5-6). Active recovery.',
    movements: ['row'],
    scales: { row: 'Easy bike or walk' }
  },
];

// ─── WARMUP TEMPLATES ─────────────────────────────────────────────────────────
const WARMUPS = {
  lower: {
    label: 'Lower Body Warm-up',
    duration: 10,
    steps: [
      '2 min easy jog or row',
      '2 rounds: 10 air squats + 10 leg swings + 10 hip circles',
      'Banded hip flexor stretch 30s/side',
      '2x5 goblet squat with pause at bottom',
      'Barbell warm-up: 5 empty bar squats, build to working weight',
    ]
  },
  upper: {
    label: 'Upper Body / Press Warm-up',
    duration: 8,
    steps: [
      '1 min row or bike (easy)',
      '2 rounds: 10 band pull-aparts + 10 shoulder circles + 5 wall slides',
      '10 scapular push-ups',
      'Barbell warm-up: 5 empty bar press/push-press, build to working weight',
    ]
  },
  oly: {
    label: 'Olympic Lifting Warm-up',
    duration: 12,
    steps: [
      '2 min easy row',
      '2 rounds: 10 PVC pass-throughs + 10 PVC OHS + 5 hip hinges',
      'PVC skill warm-up: 5 snatch grip DL + 5 muscle snatch + 5 OHS (or clean equivalent)',
      'Barbell build-up: 3 reps at each weight until working weight',
    ]
  },
  gymnastics: {
    label: 'Gymnastics Warm-up',
    duration: 10,
    steps: [
      '2 min easy bike or jump rope',
      '2 rounds: 5 wall walks + 10 hollow rocks + 10 arch rocks',
      'Shoulder prep: 10 banded lat pull-downs + 10 band pull-aparts',
      '2 sets of skill-specific activation (see skill block below)',
    ]
  },
  mixed: {
    label: 'General CrossFit Warm-up',
    duration: 10,
    steps: [
      '2 min easy row or run',
      '2 rounds: 10 air squats + 10 push-ups + 10 sit-ups + 5 burpees',
      'Movement prep specific to today\'s MetCon',
      'Dynamic stretching: 30s hip flexor + 30s thoracic rotation each side',
    ]
  },
};

// ─── DAY TYPE TEMPLATES ───────────────────────────────────────────────────────
// Used by generator to assign character to each training day
const DAY_TYPES = {
  lower_strength: {
    label: 'Lower Strength',
    warmup: 'lower',
    strengthFocus: ['back_squat', 'front_squat'],
    metconModality: ['barbell', 'mixed', 'monostructural'],
    skillCategories: ['core_lower'],
  },
  upper_strength: {
    label: 'Upper Strength',
    warmup: 'upper',
    strengthFocus: ['press', 'push_press', 'bench_press'],
    metconModality: ['gymnastics', 'barbell_gymnastics', 'mixed'],
    skillCategories: ['upper_gymnastics'],
  },
  olympic_lifting: {
    label: 'Olympic Lifting',
    warmup: 'oly',
    strengthFocus: ['clean', 'snatch', 'clean_jerk'],
    metconModality: ['barbell', 'barbell_gymnastics', 'mixed'],
    skillCategories: ['upper_gymnastics', 'core_lower'],
  },
  gymnastics_engine: {
    label: 'Gymnastics + Engine',
    warmup: 'gymnastics',
    strengthFocus: [],
    metconModality: ['gymnastics', 'mixed', 'monostructural'],
    skillCategories: ['upper_gymnastics', 'core_lower', 'jump_rope'],
  },
  posterior_chain: {
    label: 'Posterior Chain',
    warmup: 'lower',
    strengthFocus: ['deadlift'],
    metconModality: ['barbell', 'mixed'],
    skillCategories: ['core_lower', 'other'],
  },
  chipper_day: {
    label: 'Long Chipper',
    warmup: 'mixed',
    strengthFocus: [],
    metconModality: ['mixed', 'monostructural_gymnastics'],
    skillCategories: ['upper_gymnastics', 'jump_rope'],
  },
};

// Days/week → day type rotation
const DAY_ROTATIONS = {
  3: ['lower_strength', 'gymnastics_engine', 'olympic_lifting'],
  4: ['lower_strength', 'gymnastics_engine', 'upper_strength', 'olympic_lifting'],
  5: ['lower_strength', 'gymnastics_engine', 'upper_strength', 'olympic_lifting', 'posterior_chain'],
  6: ['lower_strength', 'gymnastics_engine', 'upper_strength', 'olympic_lifting', 'posterior_chain', 'chipper_day'],
};
