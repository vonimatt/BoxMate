// ─── STRENGTH MOVEMENTS ──────────────────────────────────────────────────────
const STRENGTH_MOVEMENTS = [
  { id: 'back_squat',  label: 'Back Squat',   category: 'lower', cues: [
    'Bar on upper traps, feet shoulder-width, toes 15–30° out',
    'Big breath into belly (Valsalva), brace 360° before descent',
    'Break at hips and knees simultaneously — don\'t sit back only',
    'Knees track over toes the entire rep — push them out',
    'Hip crease below knee at the bottom (full depth)',
    'Drive through mid-foot — chest and hips rise at the same rate',
  ]},
  { id: 'front_squat', label: 'Front Squat',  category: 'lower', cues: [
    'Bar rests on front deltoids, elbows high and parallel to floor',
    'Narrow grip or fingertip contact — never strangle the bar',
    'Upright torso throughout — front squat punishes any forward lean',
    'Knees track over toes, sit straight down between heels',
    'Drive elbows up on the way out to keep torso vertical',
  ]},
  { id: 'deadlift',    label: 'Deadlift',     category: 'hinge', cues: [
    'Bar over mid-foot (about 2–3cm from shins), hip-width stance',
    'Hinge to bar: push hips back, neutral spine, lats engaged',
    'Squeeze the bar hard — "bend the bar" cue activates lats',
    'Push the floor away rather than thinking "pull the bar up"',
    'Hips and shoulders rise at the same rate off the floor',
    'Lock out: glutes squeeze, hips forward — no hyperextension',
  ]},
  { id: 'press',       label: 'Strict Press', category: 'upper', cues: [
    'Bar in heel of palm, wrists slightly back, elbows just in front of bar',
    'Tight glutes and abs — no lower back arch as the bar passes overhead',
    'Press bar in a slight S-curve: back to clear chin, then straight up',
    'Full lockout: arms locked, ears in front of biceps at the top',
    'Lower under control — don\'t let bar crash into the rack position',
  ]},
  { id: 'push_press',  label: 'Push Press',   category: 'upper', cues: [
    'Dip straight down 5–8cm — knees forward, torso stays vertical',
    'Explosive hip extension drives the bar, arms follow immediately',
    'Receive bar overhead with arms locked — don\'t press from middle',
    'Stand tall to finish — hips through, not leaning back',
  ]},
  { id: 'bench_press', label: 'Bench Press',  category: 'upper', cues: [
    'Slight arch, shoulder blades retracted and depressed (packed)',
    'Grip slightly wider than shoulder-width, wrists stacked over elbows',
    'Lower bar to lower chest (sternum), not neck',
    'Drive feet into floor, press through full lockout at top',
  ]},
  { id: 'clean',       label: 'Clean (1RM)',  category: 'oly', cues: [
    'First pull: bar stays close to shins, back angle constant',
    'Double knee bend: re-bend knees as bar passes hips (scoop)',
    'Explosive second pull: full hip, knee, ankle extension + shrug',
    'Fast elbows: pull under the bar, rotate elbows through aggressively',
    'Catch in full front squat — don\'t "power" your heavy singles',
    'Stand up with elbows high throughout the recovery',
  ]},
  { id: 'snatch',      label: 'Snatch (1RM)', category: 'oly', cues: [
    'Wide grip (snatch-width): index finger on or just outside rings',
    'First pull: controlled — maintain back angle, bar stays close',
    'Second pull: explosive — full extension, bar contacts hip crease',
    'Pull under: aggressive elbow turn-over, not just pulling up',
    'Receive in deep OHS — active shoulders, pressing bar into ceiling',
    'Stand up with bar locked out overhead — don\'t bail forward',
  ]},
  { id: 'clean_jerk',  label: 'Clean & Jerk', category: 'oly', cues: [
    'Clean: same cues as Clean — controlled first pull, explosive second',
    'Recover from clean: elbows stay high during the stand',
    'Jerk dip: controlled, vertical torso, 10–15cm dip depth',
    'Drive: explosive leg press — bar goes straight up, not forward',
    'Split: front foot heel down, back foot toes down simultaneously',
    'Stand and bring feet together: front foot back first, then rear',
  ]},
];

const ENDURANCE_BENCHMARKS = [
  { id: 'run_400',  label: '400m Run',  unit: 'mm:ss' },
  { id: 'run_1k',   label: '1km Run',   unit: 'mm:ss' },
  { id: 'run_5k',   label: '5km Run',   unit: 'mm:ss' },
  { id: 'row_500',  label: '500m Row',  unit: 'mm:ss' },
  { id: 'row_2k',   label: '2km Row',   unit: 'mm:ss' },
];

// ─── SKILL PROGRESSIONS ───────────────────────────────────────────────────────
// Each skill has:
//   steps[]        — progression milestones (the "main drill" for each step)
//   sessionDrills  — support drills for each phase to build a full 3-5 exercise session
//     foundation (steps 0-1) · building (steps 2-3) · performance (steps 4+)
const SKILL_PROGRESSIONS = {
  pull_up: {
    label: 'Pull-up',
    category: 'upper_gymnastics',
    sessionDrills: {
      foundation: [
        { drill: 'Band lat pull-down', sets: 3, reps: '12', notes: 'Prime the lats — feel the shoulder blade move', purpose: 'Activation' },
        { drill: 'Dead hang hold', sets: 3, reps: '20-30s', notes: 'Full grip, engaged scapula — build shoulder stability', purpose: 'Strength' },
      ],
      building: [
        { drill: 'Scapular pull-ups', sets: 3, reps: '10', notes: 'Arms straight, depress and elevate — activate lats before pull', purpose: 'Activation' },
        { drill: 'Ring row + 4s negative', sets: 3, reps: '6+3', notes: 'Slow eccentric = fastest strength builder', purpose: 'Strength' },
      ],
      performance: [
        { drill: 'Kipping swing (hollow ↔ arch)', sets: 3, reps: '15', notes: 'Perfect rhythm before loading — hips initiate the drive', purpose: 'Activation' },
        { drill: 'Tempo strict pull-up (2-1-2)', sets: 3, reps: '4', notes: '2s up, 1s pause at top, 2s down — control every inch', purpose: 'Strength' },
      ],
    },
    steps: [
      { id: 0, label: 'Dead Hang',      drill: 'Dead hang hold',          sets: 3, reps: '20-30s', notes: 'Engage scapula, full grip' },
      { id: 1, label: 'Scapular Pulls', drill: 'Scapular pull-ups',       sets: 3, reps: '8',     notes: 'Arms straight, depress scapula' },
      { id: 2, label: 'Ring Rows',      drill: 'Ring rows + negatives',   sets: 3, reps: '8+5',   notes: '3s lowering on negatives' },
      { id: 3, label: 'Band-Assisted',  drill: 'Banded pull-ups',         sets: 4, reps: '6',     notes: 'Light band, full ROM' },
      { id: 4, label: 'Kipping Swing',  drill: 'Kipping swing + hip pop', sets: 3, reps: '10',    notes: 'Hollow → arch → drive hips' },
      { id: 5, label: 'Pull-up (RX)',   drill: 'Strict pull-ups',         sets: 4, reps: '5',     notes: 'Full ROM, chin over bar' },
    ]
  },
  chest_to_bar: {
    label: 'Chest-to-Bar Pull-up',
    category: 'upper_gymnastics',
    sessionDrills: {
      foundation: [
        { drill: 'Active hang + scapular pull-ups', sets: 3, reps: '10', notes: 'Depress shoulder blades aggressively — lats must drive', purpose: 'Activation' },
        { drill: 'Strict pull-up to sternum', sets: 3, reps: '4', notes: 'Drive elbows down and back hard at the top', purpose: 'Strength' },
      ],
      building: [
        { drill: 'Kipping swing + hip drive', sets: 3, reps: '12', notes: 'Big hip pop to catapult body upward', purpose: 'Activation' },
        { drill: 'Weighted pull-up or negative C2B', sets: 3, reps: '4', notes: 'Extra load or 4s lowering from chest-to-bar position', purpose: 'Strength' },
      ],
      performance: [
        { drill: 'Kipping pull-up → C2B combo', sets: 3, reps: '3+3', notes: '3 kipping pull-ups then 3 C2B — feel the difference in hip power', purpose: 'Activation' },
        { drill: 'C2B max unbroken set', sets: 3, reps: 'max', notes: 'Rest 2min between sets — track and beat your number', purpose: 'Practice' },
      ],
    },
    steps: [
      { id: 0, label: 'Strict Pull-up x5', drill: 'Strict pull-ups',       sets: 4, reps: '5',  notes: 'Prerequisite: 5 unbroken' },
      { id: 1, label: 'High Pull-up',       drill: 'Pull-up to sternum',   sets: 3, reps: '5',  notes: 'Drive elbows down hard' },
      { id: 2, label: 'Banded C2B',         drill: 'Banded chest-to-bar',  sets: 4, reps: '6',  notes: 'Chest touches bar' },
      { id: 3, label: 'C2B Kipping',        drill: 'Kipping C2B',          sets: 4, reps: '5',  notes: 'Aggressive hip drive, chest contact' },
      { id: 4, label: 'C2B (RX)',           drill: 'Chest-to-bar pull-ups',sets: 3, reps: '8',  notes: 'Consistent contact, unbroken' },
    ]
  },
  bar_muscle_up: {
    label: 'Bar Muscle-up',
    category: 'upper_gymnastics',
    sessionDrills: {
      foundation: [
        { drill: 'C2B pull-ups', sets: 3, reps: '5', notes: 'Drive elbows down aggressively at the top — bar must touch chest', purpose: 'Strength Prereq' },
        { drill: 'Bar dip (high bar or rings)', sets: 3, reps: '8', notes: 'Full lockout at top — the dip is half the muscle-up', purpose: 'Strength' },
      ],
      building: [
        { drill: 'Kipping swing + high hip pop', sets: 3, reps: '8', notes: 'Bar hits hip crease — this is the transition mechanic', purpose: 'Activation' },
        { drill: 'Low bar jumping MU transition', sets: 3, reps: '5', notes: 'Jump to get over the bar — learn the turnover without load', purpose: 'Skill Drill' },
      ],
      performance: [
        { drill: 'Banded bar MU or MU negatives', sets: 3, reps: '4', notes: 'Band = force the movement pattern. Negatives = 3s lowering from top', purpose: 'Strength' },
        { drill: 'MU singles + reset', sets: 4, reps: '1', notes: 'Full stop between reps — perfect technique every time, no rushed kips', purpose: 'Practice' },
      ],
    },
    steps: [
      { id: 0, label: 'C2B Pull-up x5',  drill: 'C2B pull-ups',               sets: 3, reps: '5', notes: 'Prerequisite: 5 unbroken C2B' },
      { id: 1, label: 'Hip Pop Drill',    drill: 'Bar hip pop to hip crease',  sets: 3, reps: '6', notes: 'Bar hits hip, lean back' },
      { id: 2, label: 'Jumping Bar MU',   drill: 'Low bar jumping muscle-up',  sets: 3, reps: '5', notes: 'Get the turnover feel' },
      { id: 3, label: 'Banded Bar MU',    drill: 'Banded bar muscle-up',       sets: 3, reps: '4', notes: 'Band assists the transition' },
      { id: 4, label: 'Bar MU Negatives', drill: 'Muscle-up negatives from top',sets:3, reps: '4', notes: 'Slow 3s lowering' },
      { id: 5, label: 'Bar MU (RX)',      drill: 'Bar muscle-ups',             sets: 3, reps: '3', notes: 'Smooth kip + turnover' },
    ]
  },
  ring_muscle_up: {
    label: 'Ring Muscle-up',
    category: 'upper_gymnastics',
    sessionDrills: {
      foundation: [
        { drill: 'False grip dead hang', sets: 3, reps: '20s', notes: 'Wrist above ring — this grip is non-negotiable for ring MU', purpose: 'Activation' },
        { drill: 'Ring row (body flat) with false grip', sets: 3, reps: '10', notes: 'Maintain false grip throughout — chest to rings each rep', purpose: 'Strength' },
      ],
      building: [
        { drill: 'Strict ring dip', sets: 3, reps: '6', notes: 'Full lockout at top, full ROM at bottom — build the push half', purpose: 'Strength' },
        { drill: 'Low ring transition drill', sets: 3, reps: '5', notes: 'Rings at hip height, feet on floor — practice the turnover', purpose: 'Skill Drill' },
      ],
      performance: [
        { drill: 'Kipping pull to ring dip', sets: 3, reps: '5', notes: 'Explosive hip drive then immediately punch into dip — connect the two phases', purpose: 'Integration' },
        { drill: 'Ring MU singles + controlled lower', sets: 4, reps: '1', notes: 'Each rep from dead hang. Lower slowly back to false grip hang.', purpose: 'Practice' },
      ],
    },
    steps: [
      { id: 0, label: 'Ring Row',            drill: 'Ring rows (body flat)',          sets: 3, reps: '10',  notes: 'Chest to rings, controlled' },
      { id: 1, label: 'False Grip Hold',     drill: 'False grip dead hang',           sets: 3, reps: '20s', notes: 'Wrist over ring' },
      { id: 2, label: 'Ring Dip',            drill: 'Strict ring dips',               sets: 3, reps: '6',   notes: 'Full lockout at top' },
      { id: 3, label: 'Banded Ring MU',      drill: 'Banded ring muscle-up',          sets: 3, reps: '4',   notes: 'Hips to rings, turnover' },
      { id: 4, label: 'Low Ring Transition', drill: 'Transition drill (feet assist)',  sets: 3, reps: '5',   notes: 'Feel the catch position' },
      { id: 5, label: 'Ring MU Kipping',     drill: 'Kipping ring muscle-up',         sets: 3, reps: '3',   notes: 'Hips → pull → turnover' },
      { id: 6, label: 'Ring MU (RX)',        drill: 'Strict ring muscle-ups',         sets: 3, reps: '2',   notes: 'No kip, full control' },
    ]
  },
  hspu: {
    label: 'Handstand Push-up',
    category: 'upper_gymnastics',
    sessionDrills: {
      foundation: [
        { drill: 'Hollow body hold', sets: 3, reps: '20s', notes: 'Core braced, lower back flat — this is your HSPU body position', purpose: 'Activation' },
        { drill: 'DB strict press (seated)', sets: 3, reps: '10', notes: 'Build overhead pressing strength — the direct transfer to HSPU', purpose: 'Strength' },
      ],
      building: [
        { drill: 'Wall walk + 10s hold at top', sets: 3, reps: '3+10s', notes: 'Full extension overhead, belly to wall — feel the inverted position', purpose: 'Activation' },
        { drill: 'Headstand hold + slow lower', sets: 3, reps: '5', notes: 'Lower head to mat slowly — eccentric loading for the press', purpose: 'Strength' },
      ],
      performance: [
        { drill: 'Kipping HSPU + strict alternation', sets: 3, reps: '3+3', notes: '3 kipping then 3 strict same set — tests stamina and control', purpose: 'Activation' },
        { drill: 'HSPU negative (4s lower)', sets: 3, reps: '5', notes: '4 seconds head to mat, explosive drive up — strengthen the sticking point', purpose: 'Strength' },
      ],
    },
    steps: [
      { id: 0, label: 'Pike Push-up',        drill: 'Pike push-ups',                sets: 3, reps: '10', notes: 'Hips high, straight body' },
      { id: 1, label: 'Box HSPU',            drill: 'Box handstand push-ups',       sets: 3, reps: '8',  notes: 'Feet on box, pike position' },
      { id: 2, label: 'Wall HSPU (kipping)', drill: 'Wall HSPU with kip',           sets: 4, reps: '5',  notes: 'Kick and press, heels to wall' },
      { id: 3, label: 'Strict Wall HSPU',    drill: 'Strict wall handstand push-up',sets: 4, reps: '4',  notes: 'Slow, controlled, no kip' },
      { id: 4, label: 'Deficit HSPU 2cm',    drill: 'HSPU with 2cm deficit',        sets: 3, reps: '4',  notes: 'Plates under hands' },
      { id: 5, label: 'Deficit HSPU 5cm',    drill: 'HSPU with 5cm deficit',        sets: 3, reps: '3',  notes: 'Full head-below-hands ROM' },
      { id: 6, label: 'HSPU (RX)',           drill: 'Handstand push-ups (strict)',  sets: 4, reps: '5',  notes: 'Competition standard' },
    ]
  },
  handstand_walk: {
    label: 'Handstand Walk',
    category: 'upper_gymnastics',
    sessionDrills: {
      foundation: [
        { drill: 'Hollow body rock', sets: 3, reps: '15', notes: 'Lower back stays on floor — this body shape is your handstand shape', purpose: 'Activation' },
        { drill: 'Plank shoulder tap', sets: 3, reps: '10/side', notes: 'Weight shift without hip rotation — trains single-arm balance', purpose: 'Strength' },
      ],
      building: [
        { drill: 'Belly-to-wall HS hold', sets: 3, reps: '30s', notes: 'Active shoulders pressing into floor, hollow body — own this position', purpose: 'Activation' },
        { drill: 'HS shoulder tap at wall', sets: 3, reps: '8/side', notes: 'Tap shoulder, return to base — each tap is a mini freestanding moment', purpose: 'Balance Drill' },
      ],
      performance: [
        { drill: 'Kick to freestanding HS hold', sets: 5, reps: '3 attempts', notes: 'Target 3-5s hold — use wall as safety, not a crutch', purpose: 'Balance Drill' },
        { drill: 'HS walk + turn attempts', sets: 4, reps: 'max distance', notes: 'Walk as far as possible each attempt — track your PR distance', purpose: 'Practice' },
      ],
    },
    steps: [
      { id: 0, label: 'Wall Walk',             drill: 'Wall walks',                 sets: 3, reps: '5',         notes: 'Full extension at top' },
      { id: 1, label: 'HS Hold (wall)',        drill: 'Handstand hold at wall',     sets: 3, reps: '30s',       notes: 'Belly to wall, active shoulders' },
      { id: 2, label: 'Shoulder Taps',         drill: 'HS shoulder taps at wall',   sets: 3, reps: '10',        notes: 'Tap alternating shoulders' },
      { id: 3, label: 'Kick to HS (freestand)',drill: 'Kick to freestanding HS',    sets: 5, reps: '3 attempts',notes: 'Hold 2-3s if possible' },
      { id: 4, label: 'HS Walk 3m',            drill: 'Handstand walk 3m',          sets: 4, reps: '3m',        notes: 'Small hand steps' },
      { id: 5, label: 'HS Walk 10m',           drill: 'Handstand walk 10m',         sets: 3, reps: '10m',       notes: 'Maintain hollow body' },
      { id: 6, label: 'HS Walk (RX)',          drill: 'Handstand walk 25m',         sets: 3, reps: '25m',       notes: 'Competition standard' },
    ]
  },
  toes_to_bar: {
    label: 'Toes-to-Bar',
    category: 'core_lower',
    sessionDrills: {
      foundation: [
        { drill: 'Hollow body rock', sets: 3, reps: '15', notes: 'Core compression is everything in TTB — master this shape first', purpose: 'Activation' },
        { drill: 'Hanging knee raise (slow)', sets: 3, reps: '10', notes: 'Control the lower, don\'t swing — build midline tension', purpose: 'Strength' },
      ],
      building: [
        { drill: 'Kipping swing (hollow ↔ arch)', sets: 3, reps: '15', notes: 'Lat engagement at the bottom is what drives the hip lift', purpose: 'Activation' },
        { drill: 'Pike compression holds', sets: 3, reps: '20s', notes: 'Seated L-position, push floor, compress hip flexors hard', purpose: 'Strength' },
      ],
      performance: [
        { drill: 'Single TTB + reset (touch each rep)', sets: 3, reps: '8', notes: 'No strings — each rep from a dead hang, clean mechanic', purpose: 'Skill Drill' },
        { drill: 'Kipping TTB unbroken — max set', sets: 3, reps: 'max', notes: 'Rest 2min. Track your number. Focus on steady rhythm, not speed', purpose: 'Practice' },
      ],
    },
    steps: [
      { id: 0, label: 'Hanging Knee Raise', drill: 'Hanging knee raises',        sets: 3, reps: '10', notes: 'Knees to chest, controlled' },
      { id: 1, label: 'Hip Hinge Hang',     drill: 'Hanging hip hinge',          sets: 3, reps: '8',  notes: 'Pike hips, feel lat engagement' },
      { id: 2, label: 'Kipping Swing',      drill: 'Kipping swing + knee raise', sets: 3, reps: '8',  notes: 'Hollow → arch → drive knees' },
      { id: 3, label: 'TTB (kipping)',      drill: 'Kipping toes-to-bar',        sets: 4, reps: '5',  notes: 'Touch both feet together' },
      { id: 4, label: 'TTB Unbroken',       drill: 'TTB unbroken sets',          sets: 3, reps: '10', notes: 'Rhythm, don\'t break early' },
      { id: 5, label: 'TTB (RX)',           drill: 'Strict toes-to-bar',         sets: 3, reps: '8',  notes: 'No kip, pure core' },
    ]
  },
  double_under: {
    label: 'Double-Unders',
    category: 'jump_rope',
    sessionDrills: {
      foundation: [
        { drill: 'Single-unders: 3×50 fast', sets: 3, reps: '50', notes: 'Maintain rhythm and light bounces — wrists do the work, not arms', purpose: 'Activation' },
        { drill: 'Power jump drill (no rope)', sets: 3, reps: '15', notes: 'Jump high enough to pass rope twice — feel the timing', purpose: 'Timing Drill' },
      ],
      building: [
        { drill: 'DU attempts: 1 DU every 3 SU', sets: 3, reps: '30 jumps', notes: 'Single, single, DOUBLE — get the feel without pressure', purpose: 'Skill Drill' },
        { drill: 'Wrist circle speed drill (rope only)', sets: 3, reps: '20s', notes: 'Fast wrist circles, rope in front — isolate wrist speed', purpose: 'Speed Drill' },
      ],
      performance: [
        { drill: '10 DU + rest + 10 DU (ladder)', sets: 5, reps: '10', notes: 'Perfect 10 reps. Rest. Beat your score. No tripping allowed', purpose: 'Skill Drill' },
        { drill: 'DU max unbroken + SU active rest', sets: 4, reps: 'max', notes: 'Go until you trip. 30s easy singles rest. Record your number.', purpose: 'Practice' },
      ],
    },
    steps: [
      { id: 0, label: 'Single Unders',         drill: '100 single unders',      sets: 1, reps: '100',       notes: 'Consistent rhythm' },
      { id: 1, label: 'Power Jumps',           drill: 'Power jumps (big bounce)',sets: 3, reps: '20',        notes: 'High jump, prep for DU' },
      { id: 2, label: 'DU Singles (attempts)', drill: 'Attempt 1 DU per jump',  sets: 3, reps: '20 attempts',notes: '1 DU, 1 SU, repeat' },
      { id: 3, label: '10 Consecutive DU',     drill: '10 DU in a row',         sets: 5, reps: '10',        notes: 'Rest between sets' },
      { id: 4, label: '30 Consecutive DU',     drill: '30 DU unbroken',         sets: 4, reps: '30',        notes: 'Focus on wrist flick' },
      { id: 5, label: 'DU (RX)',               drill: 'Double-unders',          sets: 3, reps: '50',        notes: 'Unbroken target' },
    ]
  },
  rope_climb: {
    label: 'Rope Climb',
    category: 'other',
    sessionDrills: {
      foundation: [
        { drill: 'Dead hang hold (rope)', sets: 3, reps: '20s', notes: 'Grip the rope tight — build hand and forearm strength', purpose: 'Activation' },
        { drill: 'Inverted ring row (body horizontal)', sets: 3, reps: '8', notes: 'Horizontal pull = direct rope climb strength builder', purpose: 'Strength' },
      ],
      building: [
        { drill: 'Seated rope pull-to-stand', sets: 3, reps: '6', notes: 'Seated on floor, pull hand-over-hand to standing — feel the rope mechanic', purpose: 'Skill Drill' },
        { drill: 'Rope hang + slow lower', sets: 3, reps: '5', notes: 'Climb a few moves up, lower slowly — eccentric strength', purpose: 'Strength' },
      ],
      performance: [
        { drill: 'J-hook practice (static)', sets: 5, reps: '5', notes: 'Foot wrap without climbing — perfect the hook then release', purpose: 'Skill Drill' },
        { drill: 'Rope climb + controlled descent', sets: 3, reps: '2', notes: 'Climb and descend slowly — no sliding, hand-over-hand down', purpose: 'Practice' },
      ],
    },
    steps: [
      { id: 0, label: 'Ring Row (inverted)',   drill: 'Inverted ring rows',         sets: 3, reps: '8', notes: 'Horizontal body, arms only' },
      { id: 1, label: 'Rope Pull to Stand',    drill: 'Seated rope pull-to-stand',  sets: 3, reps: '6', notes: 'Pull from floor to standing' },
      { id: 2, label: 'Legless Rope Climb',    drill: '1 legless rope climb',       sets: 3, reps: '1', notes: 'Arms only, 1 length if possible' },
      { id: 3, label: 'J-Hook Foot Technique', drill: 'Rope climb with J-hook',     sets: 3, reps: '2', notes: 'Master the foot wrap' },
      { id: 4, label: 'Rope Climb (RX)',       drill: 'Rope climbs',                sets: 3, reps: '3', notes: '15ft standard' },
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

  // ── Named Benchmarks ──────────────────────────────────────────────────────────
  {
    id: 'jackie',
    name: 'Jackie',
    type: 'For Time',
    duration: 10,
    modality: 'barbell_gymnastics',
    intensity: 'high',
    description: 'For Time: 1000m Row → 50 Thrusters (20kg) → 30 Pull-ups',
    movements: ['row', 'thruster', 'pull_up'],
    scales: { thruster: '15kg', pull_up: 'Ring Rows or Band Pull-ups' }
  },
  {
    id: 'isabel',
    name: 'Isabel',
    type: 'For Time',
    duration: 8,
    modality: 'barbell',
    intensity: 'high',
    description: '30 Snatches for time (60/43kg)',
    movements: ['snatch'],
    scales: { snatch: '43/29kg or Power Snatch' }
  },
  {
    id: 'elizabeth',
    name: 'Elizabeth',
    type: 'For Time',
    duration: 12,
    modality: 'barbell_gymnastics',
    intensity: 'high',
    description: '21-15-9: Squat Cleans (60/43kg) + Ring Dips',
    movements: ['squat_clean', 'ring_dip'],
    scales: { squat_clean: '43/29kg or Power Clean', ring_dip: 'Box Dips' }
  },
  {
    id: 'helen',
    name: 'Helen',
    type: 'For Time',
    duration: 11,
    modality: 'mixed',
    intensity: 'high',
    description: '3 Rounds: 400m Run + 21 KB Swings (24/16kg) + 12 Pull-ups',
    movements: ['run', 'kb_swing', 'pull_up'],
    scales: { kb_swing: '16/12kg', pull_up: 'Ring Rows' }
  },
  {
    id: 'diane',
    name: 'Diane',
    type: 'For Time',
    duration: 10,
    modality: 'barbell_gymnastics',
    intensity: 'high',
    description: '21-15-9: Deadlifts (102/70kg) + Handstand Push-ups',
    movements: ['deadlift', 'hspu'],
    scales: { deadlift: '70/50kg', hspu: 'Box HSPU or Pike Push-ups' }
  },
  {
    id: 'fight_gone_bad',
    name: 'Fight Gone Bad',
    type: 'For Score',
    duration: 17,
    modality: 'mixed',
    intensity: 'high',
    description: '3 Rounds (1 min/station, no rest within rounds): Wall Balls (9kg) → SDHP (35kg) → Box Jumps (60cm) → Push Press (35kg) → Row (cals). 1 min rest between rounds. Score = total reps.',
    movements: ['wall_ball', 'sdhp', 'box_jump', 'push_press', 'row'],
    scales: { wall_ball: '6kg', sdhp: '25kg', push_press: '25kg', box_jump: '50cm' }
  },
  {
    id: 'amanda',
    name: 'Amanda',
    type: 'For Time',
    duration: 10,
    modality: 'barbell_gymnastics',
    intensity: 'high',
    description: '9-7-5: Ring Muscle-ups + Squat Snatches (60/43kg)',
    movements: ['ring_muscle_up', 'squat_snatch'],
    scales: { ring_muscle_up: 'Bar Muscle-ups or C2B', squat_snatch: '43/29kg or Power Snatch' }
  },
  {
    id: 'karen',
    name: 'Karen',
    type: 'For Time',
    duration: 15,
    modality: 'mixed',
    intensity: 'high',
    description: '150 Wall Balls for time (9/6kg to 10ft/9ft target)',
    movements: ['wall_ball'],
    scales: { wall_ball: '6kg to lower target' }
  },
  {
    id: 'nancy',
    name: 'Nancy',
    type: 'For Time',
    duration: 20,
    modality: 'barbell_mono',
    intensity: 'moderate',
    description: '5 Rounds: 400m Run + 15 OHS (43/29kg)',
    movements: ['run', 'ohs'],
    scales: { ohs: '29/20kg or PVC for skill focus' }
  },
  {
    id: 'annie',
    name: 'Annie',
    type: 'For Time',
    duration: 12,
    modality: 'monostructural_gymnastics',
    intensity: 'moderate',
    description: '50-40-30-20-10: Double-Unders + Sit-ups',
    movements: ['double_under', 'sit_up'],
    scales: { double_under: '2× Single-Unders (100-80-60-40-20)' }
  },
  {
    id: 'barbara',
    name: 'Barbara',
    type: 'For Time',
    duration: 25,
    modality: 'gymnastics',
    intensity: 'moderate',
    description: '5 Rounds: 20 Pull-ups + 30 Push-ups + 40 Sit-ups + 50 Air Squats. Rest exactly 3 min between rounds.',
    movements: ['pull_up', 'push_up', 'sit_up', 'air_squat'],
    scales: { pull_up: 'Ring Rows', push_up: 'Knee Push-ups' }
  },
  // ── EMOM / Interval Variety ───────────────────────────────────────────────────
  {
    id: 'emom_20_squat_box',
    name: 'Squat & Box EMOM',
    type: 'EMOM',
    duration: 20,
    modality: 'barbell_mono',
    intensity: 'moderate',
    description: 'EMOM 20 (alt): Min odd: 5 Back Squats @ 65% 1RM | Min even: 8 Box Jumps (60cm) + 6 Burpees',
    movements: ['back_squat', 'box_jump', 'burpee'],
    scales: { back_squat: '55% for newer athletes', box_jump: '50cm' }
  },
  {
    id: 'emom_14_ohs_build',
    name: 'OHS Build EMOM',
    type: 'EMOM',
    duration: 14,
    modality: 'barbell',
    intensity: 'moderate',
    description: 'EMOM 14: Odd mins: 3 OHS building from 50%→75% | Even mins: 10 Air Squats + 5 Hollow Rocks',
    movements: ['ohs'],
    scales: { ohs: 'PVC or empty bar — focus on overhead position' }
  },
  {
    id: 'emom_12_row_push',
    name: 'Row & Push EMOM',
    type: 'EMOM',
    duration: 12,
    modality: 'monostructural_gymnastics',
    intensity: 'moderate',
    description: 'EMOM 12 (alt): Min 1: 14/12 Cal Row | Min 2: 15 Push-ups + 5 Burpees',
    movements: ['row', 'push_up', 'burpee'],
    scales: { push_up: 'Knee Push-ups', row: '10 Cal' }
  },
  // ── AMRAP Variety ─────────────────────────────────────────────────────────────
  {
    id: 'amrap_12_gymnastics_ring',
    name: 'Ring & Pull AMRAP',
    type: 'AMRAP',
    duration: 12,
    modality: 'gymnastics',
    intensity: 'moderate',
    description: '12 min AMRAP: 8 Pull-ups + 8 Ring Dips + 16 Air Squats',
    movements: ['pull_up', 'ring_dip', 'air_squat'],
    scales: { pull_up: 'Ring Rows', ring_dip: 'Box Dips' }
  },
  {
    id: 'amrap_10_ttb_box',
    name: 'TTB & Box Jump AMRAP',
    type: 'AMRAP',
    duration: 10,
    modality: 'gymnastics',
    intensity: 'high',
    description: '10 min AMRAP: 10 Toes-to-Bar + 10 Box Jumps (60cm) + 10 Push-ups',
    movements: ['toes_to_bar', 'box_jump', 'push_up'],
    scales: { toes_to_bar: 'Hanging Knee Raises', box_jump: '50cm' }
  },
  // ── Chipper / For Time Variety ────────────────────────────────────────────────
  {
    id: 'five_rft_classic',
    name: '5-Round Classic',
    type: 'For Time',
    duration: 18,
    modality: 'mixed',
    intensity: 'moderate',
    description: '5 Rounds: 10 Deadlifts (80/60kg) + 10 Box Jumps (60cm) + 10 Wall Balls (9kg) + 200m Run',
    movements: ['deadlift', 'box_jump', 'wall_ball', 'run'],
    scales: { deadlift: '60/40kg', wall_ball: '6kg', box_jump: '50cm' }
  },
  {
    id: 'three_rft_barbell',
    name: 'Barbell Complex RFT',
    type: 'For Time',
    duration: 14,
    modality: 'barbell_gymnastics',
    intensity: 'high',
    description: '3 Rounds: 10 Push Jerks (60% 1RM) + 20 TTB + 400m Run',
    movements: ['push_jerk', 'toes_to_bar', 'run'],
    scales: { push_jerk: '50%', toes_to_bar: 'Hanging Knee Raises' }
  },
  // ── Endurance Equipment — Air Bike, Ski ERG, Bike ERG, mixed cardio ──────────
  {
    id: 'air_bike_intervals',
    name: 'Air Bike Intervals',
    type: 'For Score',
    duration: 15,
    modality: 'monostructural',
    intensity: 'high',
    description: '5 rounds: 30s max effort Air Bike + 90s complete rest. Score = total calories. Target: 15+ cal/round.',
    movements: ['air_bike'],
    scales: { air_bike: 'Echo Bike or Assault Bike — same protocol' }
  },
  {
    id: 'ski_erg_intervals',
    name: 'Ski ERG Intervals',
    type: 'For Time',
    duration: 16,
    modality: 'monostructural',
    intensity: 'high',
    description: '4 × 500m Ski ERG. Rest 2 min between efforts. Target: consistent splits within 5s of each other.',
    movements: ['ski_erg'],
    scales: { ski_erg: '4×500m Row or 4×250m Air Bike' }
  },
  {
    id: 'emom_12_mixed_cardio',
    name: 'Mixed Cardio EMOM',
    type: 'EMOM',
    duration: 12,
    modality: 'monostructural',
    intensity: 'moderate',
    description: 'EMOM 12 (4 rounds of 3): Min 1: 12/10 Cal Row | Min 2: 10/8 Cal Ski ERG | Min 3: 12/10 Cal Air Bike',
    movements: ['row', 'ski_erg', 'air_bike'],
    scales: { all: 'Scale cals down 2-3 to finish each minute with 15s+ rest' }
  },
  {
    id: 'bike_erg_threshold',
    name: 'Bike ERG Threshold',
    type: 'For Time',
    duration: 20,
    modality: 'monostructural',
    intensity: 'moderate',
    description: '20 min Bike ERG at threshold pace (RPE 7-8). Target wattage: ~75-80% of max. Track avg watts + total kJ.',
    movements: ['bike_erg'],
    scales: { bike_erg: 'Air Bike at same RPE, or 5km easy run' }
  },
  {
    id: 'cardio_chipper',
    name: 'Cardio Chipper',
    type: 'For Time',
    duration: 20,
    modality: 'monostructural',
    intensity: 'moderate',
    description: 'For Time: 500m Row → 30 Cal Ski ERG → 400m Run → 20 Cal Air Bike → 500m Row',
    movements: ['row', 'ski_erg', 'run', 'air_bike'],
    scales: { all: 'Scale to: 400m Row → 20 Cal Ski → 300m Run → 15 Cal Bike → 400m Row' }
  },
  {
    id: 'air_bike_amrap',
    name: 'Bike & Barbell',
    type: 'AMRAP',
    duration: 12,
    modality: 'barbell_mono',
    intensity: 'high',
    description: '12 min AMRAP: 10 Cal Air Bike + 5 Power Cleans (70% 1RM) + 10 Cal Air Bike + 10 Burpees',
    movements: ['air_bike', 'power_clean', 'burpee'],
    scales: { power_clean: '60% 1RM', air_bike: '8 Cal' }
  },
  {
    id: 'ski_row_couplet',
    name: 'Ski & Row Couplet',
    type: 'For Time',
    duration: 14,
    modality: 'monostructural',
    intensity: 'moderate',
    description: '5 Rounds: 250m Ski ERG + 250m Row. Rest 30s between rounds. Target: negative split on rounds 4-5.',
    movements: ['ski_erg', 'row'],
    scales: { all: '200m each or 15 Cal each machine' }
  },
  {
    id: 'run_bike_intervals',
    name: 'Run & Bike',
    type: 'For Time',
    duration: 16,
    modality: 'monostructural',
    intensity: 'high',
    description: '4 Rounds: 400m Run + 15 Cal Bike ERG. Rest 1 min. Push the run, recover on the bike.',
    movements: ['run', 'bike_erg'],
    scales: { run: '300m run or 250m row', bike_erg: '12 Cal Air Bike' }
  },
  {
    id: 'deload_easy_cardio',
    name: 'Easy Cardio Flow',
    type: 'For Time',
    duration: 20,
    modality: 'monostructural',
    intensity: 'low',
    description: '5 rounds easy: 2 min Row → 2 min easy Ski ERG. Conversational pace. Heart rate below 130bpm.',
    movements: ['row', 'ski_erg'],
    scales: { all: 'Any 2 cardio machines. Same easy pace.' }
  },

  // ── Deload / Low Intensity ────────────────────────────────────────────────────
  {
    id: 'deload_gymnastics_flow',
    name: 'Gymnastics Flow',
    type: 'AMRAP',
    duration: 20,
    modality: 'gymnastics',
    intensity: 'low',
    description: '20 min easy AMRAP: 3 Wall Walks + 10 Hollow Rocks + 10 Ring Rows + 10 Good Mornings (empty bar)',
    movements: ['wall_walk', 'hollow_rock', 'ring_row'],
    scales: { wall_walk: '2 Wall Walks' }
  },
  {
    id: 'deload_run_mobility',
    name: 'Easy Run & Mobility',
    type: 'For Time',
    duration: 20,
    modality: 'monostructural',
    intensity: 'low',
    description: '3 Rounds: 400m Easy Jog (conversational) + 90s Hip Flexor Stretch/side + 10 Thoracic Rotations',
    movements: ['run'],
    scales: { run: '500m Row or 3 min easy bike' }
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

// ─── METCON COACHING CUES ─────────────────────────────────────────────────────
// Keyed by MetCon id
const METCON_COACHING = {
  fran:                { intent: 'Test of speed and capacity — Fran is a sprint. If you haven\'t gone sub-5min before, this is your chance.', strategy: 'Go unbroken on thrusters all 3 rounds. Break pull-ups: 12-9 or 8-7-6 in round of 21.', pacing: 'All-out from the first rep. Breathe during transitions only.' },
  grace:               { intent: 'Barbell cycling speed and technique under fatigue. A true test of your Clean & Jerk efficiency.', strategy: 'Find a sustainable pace from the first rep — don\'t sprint the first 10 and die. Touch-and-go if possible.', pacing: 'Aim for sets of 5-10 depending on experience. Sub-5min target for competitive athletes.' },
  amrap_12_thruster_du:{ intent: 'Sustain high-output barbell cycling paired with cardiovascular demand. Tests your aerobic capacity under load.', strategy: 'Set a rep target per round and hold it. Thrusters: sets of 5, DUs: unbroken.', pacing: 'Sustainable pace — you should be moving the whole 12 minutes without hitting a wall.' },
  emom_10_snatch:      { intent: 'Olympic lifting skill under pressure. One heavy rep per minute forces focus on technique, not speed.', strategy: 'Hit exactly 1 rep per minute. Rest the remaining time. Reset fully between reps.', pacing: 'Each rep is max effort — treat it like a true 1RM attempt with controlled aggression.' },
  cindy:               { intent: 'Aerobic gymnastics benchmark. Tests your ability to sustain bodyweight movements for 20 minutes.', strategy: 'Set a round target based on your level (15+ rounds = good). Steady pace beats a fast start.', pacing: 'Start slower than you think. If you go out hot, you\'ll struggle after minute 10.' },
  amrap_8_bmu_bar:     { intent: 'Gymnastics power and capacity. Bar muscle-ups require full-body coordination — this tests efficiency under fatigue.', strategy: 'Singles on bar MUs if needed — don\'t miss reps. Box jumps: step down to protect legs. Wall balls: unbroken.', pacing: 'Explosive on the MUs, controlled on everything else.' },
  emom_16_mixed:       { intent: 'Aerobic threshold work. Four movements across 16 minutes builds your engine systematically.', strategy: 'Each minute should feel manageable (RPE 7/10). If you\'re gasping, you\'re too heavy on the clean.', pacing: 'Consistent effort across all 4 rounds. The rest minute is golden — use it.' },
  for_time_hspu_dl:    { intent: 'Strict posterior chain and pressing — heavy compound superset. Tests strength-endurance.', strategy: '21s: 12-9 DL, 12-9 HSPU. 15s: 8-7, 8-7. 9s: unbroken if possible.', pacing: 'Move through deadlifts quickly, then take short breaks on HSPU as needed.' },
  amrap_15_engine:     { intent: 'Aerobic base builder. Long steady-state work at comfortable intensity — your aerobic engine in action.', strategy: 'Conversational pace on the run. Air squats and push-ups should be unbroken every round.', pacing: 'RPE 6-7 max. You should be able to hold a conversation. Count rounds — aim for 5+.' },
  dt:                  { intent: 'Classic CrossFit barbell complex — one of the most demanding barbell cycling workouts. Tests strength-endurance under load.', strategy: '5 rounds of 12 DL + 9 HPC + 6 PJ. The key: don\'t drop the bar between DL and HPC.', pacing: 'Touch-and-go on deadlifts, hang power clean into push jerk. Sub-10min is competitive.' },
  emom_12_cl_ttb:      { intent: 'Olympic lifting meets core — alternating between power movements and gymnastics forces quick recovery.', strategy: 'Clean: smooth and fast — these should be touch-and-go. TTB: kipping, find a rhythm.', pacing: 'You have the full minute — don\'t rush. Finish each movement with 15+ seconds to spare.' },
  amrap_20_chipper_style:{ intent: 'Long aerobic grind. 20 minutes of mixed modal work tests your fitness across all energy systems.', strategy: 'Start slow — round 1 pace should feel easy. TTB: sets of 5-7. DB snatch: alternate arms each set.', pacing: 'RPE 7 for first 12 min, then push. Aim to maintain or increase pace in the last 5 min.' },
  deload_light_amrap:  { intent: 'Active recovery — the goal is blood flow, not fatigue. Your body is rebuilding this week.', strategy: 'Move continuously but comfortably. Ring rows at 70% effort. Never out of breath.', pacing: 'Conversational pace throughout. RPE 4-5 max.' },
  kelly:               { intent: 'Classic long benchmark — tests aerobic capacity, leg endurance and coordination under fatigue.', strategy: 'Paced run, not a sprint. Box jumps: step down between reps. Wall balls: sets of 10.', pacing: 'Consistent splits across all 5 rounds. Negative split (last round faster than first) is the goal.' },
  emom_10_strict_press:{ intent: 'Overhead pressing strength-endurance. 10 minutes of sub-max work builds volume safely.', strategy: '3 strict reps at 75% each minute. Lock out completely, lower under control.', pacing: 'These should feel moderate (not grinding). If you miss a rep, the weight is too heavy.' },
  amrap_10_hs_work:    { intent: 'Handstand and pressing volume — builds the specific strength needed for HSPU and HS walk progressions.', strategy: 'Wall walks: take your time and own each rep. Push-ups: perfect form. Air squats: unbroken.', pacing: 'Moderate — not a race. Quality over quantity on wall walks.' },
  heavy_conditioning:  { intent: 'Heavy barbell cycling — the descending ladder lets you build confidence as the reps drop.', strategy: 'Singles or doubles at this weight are fine. Don\'t rush the setup. Stand up fully each rep.', pacing: 'Rest as needed between reps. This is skill + strength, not a cardio piece.' },
  row_intervals:       { intent: 'High-intensity monostructural — rowing intervals improve power output and VO2max.', strategy: 'Each 500m should be at or below your target pace. Use the 2min rest fully.', pacing: 'All 4 efforts should be within 5 seconds of each other. Consistent is better than one fast + three slow.' },
  gymnastics_chipper:  { intent: 'High-volume gymnastics test — this is a benchmark for raw gymnastics capacity and mental endurance.', strategy: 'Pull-ups: sets of 10-15. TTB: sets of 8-10. HSPU: 5s. Ring dips: singles ok. MUs: singles.', pacing: 'Go out controlled on pull-ups — they\'ll fatigue everything downstream. Sub-20min is strong.' },
  sprint_wod:          { intent: 'Maximal aerobic power — 400m sprints at race effort with full recovery. Builds top-end speed.', strategy: 'Each 400m should be near-max. If splits drop more than 5 seconds, you\'re not recovering enough.', pacing: 'All-out on each effort. The 1min rest is short by design — embrace the discomfort.' },
  deload_row_walk:     { intent: 'Full recovery — 20 minutes of easy aerobic work to flush lactate and maintain movement quality.', strategy: 'Conversational pace only. Heart rate below 130bpm if possible. Stop and stretch if you want.', pacing: 'RPE 4-5. This is not a workout — it\'s active recovery. Enjoy it.' },

  // ── Named Benchmarks ──────────────────────────────────────────────────────────
  jackie:              { intent: 'Triplet benchmark testing rowing power, barbell cycling, and gymnastics endurance in sequence. Each movement taxes a different system.', strategy: 'Row hard but not all-out (aim for 1:50-1:55/500m pace). Thrusters: sets of 10-15, don\'t drop the bar. Pull-ups: sets of 10 until you can\'t.', pacing: 'Sub-8 min is competitive. The transition between movements is where time is lost — move fast.' },
  isabel:              { intent: 'Pure barbell cycling benchmark — 30 snatches tests your technique and strength-endurance under time pressure.', strategy: 'Find a weight that lets you do touch-and-go reps. Singles are fine for heavier athletes. Consistent rep rhythm beats sprinting and resting.', pacing: 'Sub-5 min is strong. Aim for consistent 5-rep sets with 15-20s rests.' },
  elizabeth:           { intent: 'Classic couplet of Olympic lifting and gymnastics — squat cleans demand full hip extension and fast elbows, then immediately test pressing endurance with ring dips.', strategy: '21s: 12+9 cleans, 12+9 ring dips. 15s: 8+7, 8+7. 9s: unbroken if possible. Never pause under the bar in the catch.', pacing: 'Moderate-fast start. Ring dips fatigue fast — protect them early.' },
  helen:               { intent: 'Monostructural-gymnastics benchmark testing aerobic capacity and pulling endurance across 3 rounds.', strategy: 'Run at 85% — not a sprint. KB swings: unbroken all 3 rounds (21 is achievable if you keep going). Pull-ups: sets of 6-4-2.', pacing: 'All 3 rounds at similar pace. Negative split is ideal. Sub-10 min is strong.' },
  diane:               { intent: 'Strength-gymnastics couplet — heavy deadlifts followed immediately by inverted pressing tests posterior chain and shoulder endurance together.', strategy: '21s: move through the deadlifts, then 5-5-5-6 on HSPU. 15s: sets of 5. 9s: push for unbroken. Don\'t let hips rise first on the deadlifts.', pacing: 'Moderate pace — HSPU will be the limiter. Protect your sets early.' },
  fight_gone_bad:      { intent: 'High-rep, high-variety conditioning benchmark. 15 stations of 1 minute each tests your ability to sustain effort across every movement pattern.', strategy: 'Pace wall balls and push press — these are where you score the most reps. Row hard in the last 20s of each row minute. KB swings: keep moving.', pacing: 'Score target: 300+ reps is good. The 1-minute rest between rounds matters — breathe deep.' },
  amanda:              { intent: 'Elite gymnastics + Olympic lifting couplet. Amanda is one of the most demanding benchmark workouts in CrossFit.', strategy: 'Snatches: singles are fine at this weight. MUs: get your first attempt every round even if singles. Transitions fast.', pacing: 'This is short and brutal. Everything is near-maximal effort. Sub-10 min is very strong.' },
  karen:               { intent: '150 wall balls is a pure endurance + consistency benchmark. This tests your ability to maintain quality under accumulated fatigue.', strategy: 'Goal: break as few times as possible. Sets of 25-30 unbroken then short rest. Watch your depth — shallow squats don\'t count.', pacing: 'The first 60 should feel easy. The last 30 will hurt. Sub-12 min is competitive.' },
  nancy:               { intent: 'Classic 5-rounder combining running with overhead squats — tests hip mobility, shoulder stability, and aerobic capacity simultaneously.', strategy: 'Run paced (not sprinted). OHS: unbroken if your mobility allows. 15 reps at moderate weight should be manageable.', pacing: 'All 5 runs at the same pace. The OHS is the test — maintain overhead position when fatigued.' },
  annie:               { intent: 'DU + sit-ups benchmark testing coordination, pacing and midline endurance over diminishing rep counts.', strategy: 'DUs: unbroken when possible, especially the last 3 rounds. Sit-ups: steady tempo, anchor your feet if needed.', pacing: 'Sub-10 min is solid. The 50s are the key — don\'t trip up there and lose momentum.' },
  barbara:             { intent: 'High-volume gymnastics benchmark with forced rest — the 3-minute break tests pacing discipline. Can you hold your round 1 pace through round 5?', strategy: 'Pull-ups: sets of 5-7. Push-ups: sets of 10. Sit-ups and air squats: unbroken. Use the 3-min rest fully — breathe and mentally reset.', pacing: 'All 5 rounds within 10-15 seconds of each other. Round 1 pace = round 5 pace. That\'s the test.' },
  emom_20_squat_box:   { intent: 'Strength-endurance EMOM — alternating heavy squats with explosive conditioning challenges your ability to stay powerful throughout 20 minutes.', strategy: 'Squats should be at 65% — each set of 5 should feel moderate, not grinding. Box jumps: step down to protect legs. Burpees: methodical.', pacing: 'RPE 7/10. You should finish each minute with 10+ seconds to spare.' },
  emom_14_ohs_build:   { intent: 'Technical overhead squat development — the building sets teach you to own the overhead position under progressive load.', strategy: 'Start light and focus on: active shoulders, heels down, upright torso. Add weight only if form is perfect. Air squats and hollow rocks fill the even minutes.', pacing: 'This is skill work, not conditioning. Quality reps > heavy reps.' },
  emom_12_row_push:    { intent: 'Aerobic threshold work — alternating rowing and pushing tests your ability to sustain output with minimal rest between very different movements.', strategy: 'Row: consistent split, not a sprint. Push-ups: sets of 8 if needed. Burpees: steady pace, same speed every minute.', pacing: 'Each minute should feel like RPE 7. If you\'re failing reps, scale back.' },
  amrap_12_gymnastics_ring: { intent: 'Gymnastics triplet building pulling, pushing and squatting capacity simultaneously across 12 minutes.', strategy: 'Set a target round pace and hold it. Pull-ups: sets of 4-5. Ring dips: singles if needed. Air squats: unbroken every time.', pacing: 'Aim for 6+ rounds. Go out controlled — if round 1 feels easy, you\'re doing it right.' },
  amrap_10_ttb_box:    { intent: 'Gymnastics AMRAP testing core endurance, explosive leg power and pushing — three very different demands in 10 minutes.', strategy: 'TTB: kipping, stay rhythmic. Box jumps: step down if heart rate is spiking. Push-ups: keep a set pace of 5-5.', pacing: 'Aim for 5+ rounds. Short rest only at transitions — keep moving.' },
  five_rft_classic:    { intent: 'Classic 5-round mixed-modal workout testing hip hinge strength, leg power, pushing endurance and running over 5 rounds.', strategy: 'Deadlifts: touch-and-go, fast. Box jumps: step down to protect legs for later rounds. Wall balls: 10-rep sets. Run: paced, not sprinted.', pacing: 'Rounds 1-3 should feel moderate. Rounds 4-5 are where you push. Total time target: sub-20 min.' },
  three_rft_barbell:   { intent: 'Heavy barbell couplet with aerobic pacing — three rounds of push jerk, core, and running tests total fitness at moderate intensity.', strategy: 'Push jerks: sets of 5, no dropped bar on the way down. TTB: sets of 10 rhythmically. Run: pace it, not a sprint.', pacing: 'All 3 rounds within 30s of each other. Consistent effort beats sprinting round 1 and dying.' },
  deload_gymnastics_flow: { intent: 'Deload skill-and-flow session — this is about quality movement, not intensity. Focus on positions and breathing.', strategy: 'Wall walks: slow and controlled. Hollow rocks: perfect shape. Ring rows: pause at the top. Good mornings: feel the hamstrings.', pacing: 'RPE 4-5. Never out of breath. This session is for the nervous system to recover, not be stressed.' },
  deload_run_mobility:  { intent: 'Active recovery run + mobility — the easy jog keeps blood moving while the stretching work directly improves your movement quality for next week.', strategy: 'Jog at a conversational pace. Hip flexor stretch: 90s/side. Thoracic rotation: slow, full range.', pacing: 'Heart rate below 130bpm throughout. If you\'re breathing hard, slow down.' },

  // Endurance equipment
  air_bike_intervals:   { intent: 'Max aerobic power intervals — 30s on/90s off forces true maximal output while full recovery between efforts preserves quality.', strategy: 'Every round should feel like the first. Damper setting 6-8. Sprint posture: lean forward, push AND pull the handles, drive the legs.', pacing: 'All-out every 30 seconds — RPE 10. If round 5 feels the same as round 1, you nailed it.' },
  ski_erg_intervals:    { intent: 'High-intensity rowing intervals on the Ski ERG — builds pulling strength, posterior chain endurance and VO2max simultaneously.', strategy: 'Drive with the lats, not just the arms. Big reach forward, powerful pull to hips. Consistent stroke rate (26-30 spm).', pacing: 'All 4 efforts within 5s of each other. Use the 2min fully. Sub-1:50/500m is strong.' },
  emom_12_mixed_cardio: { intent: 'Multi-machine aerobic capacity — rotating machines challenges your body to produce power in 3 different patterns every minute.', strategy: 'Each machine: settle into a power output you can hold. Row: 1:50-2:00/500m. Ski: similar. Bike: 80+ rpm cadence.', pacing: 'RPE 7 across all 12 minutes. Finish each minute with 10-15s rest — if not, scale cals down.' },
  bike_erg_threshold:   { intent: 'Aerobic threshold development — 20 min at sustained high-output trains the body to clear lactate and sustain power output over time.', strategy: 'Find your threshold wattage in the first 3 min and hold it. Don\'t go harder in the middle — discipline is the workout.', pacing: 'Avg watts should stay within ±5% the entire 20 min. Finish slightly faster than you started (negative split).' },
  cardio_chipper:       { intent: 'Mixed cardio chipper — 5 different machines and running in sequence tests your ability to transfer effort between completely different movement patterns.', strategy: 'Row paced, ski hard, run controlled, bike sprint, row strong finish. Don\'t blow up on the ski — it comes right before the run.', pacing: 'Even pacing with a push at the end. The second row should be faster than the first.' },
  air_bike_amrap:       { intent: 'Bike and barbell couplet — tests ability to hit the bike hard, then immediately move a barbell, then do it all over again.', strategy: 'Bike: 10 cals hard but not sprint. Power cleans: controlled, fast elbows. Burpees: steady rhythm. Transition speed wins.', pacing: 'Aim for 4+ rounds. The barbell is the limiter — stay smooth on the cleans.' },
  ski_row_couplet:      { intent: 'Alternating monostructural intervals — each machine uses similar muscles but different patterns, forcing adaptation without full recovery.', strategy: 'Ski: drive with arms and core, legs assist. Row: legs drive first, then arms. Focus on consistent split times.', pacing: 'Target the same split on ski and row. Rounds 4-5 should be equal to or faster than rounds 1-2.' },
  run_bike_intervals:   { intent: 'Running + cycling intervals — the bike serves as active recovery between running efforts, keeping intensity high without full rest.', strategy: 'Run at 85-90% effort — this is a speed workout. Bike at 70% — recover, but keep moving. Don\'t coast.', pacing: 'All 4 runs within 5-10s of each other. Consistent splits beat one fast round and three slow ones.' },
  deload_easy_cardio:   { intent: 'Active recovery across multiple machines — 20 minutes of easy, varied movement keeps the body moving without adding stress.', strategy: 'Conversational pace throughout. If you can\'t speak a sentence, slow down. Heart rate target: below 130 bpm.', pacing: 'RPE 4-5. This is not a workout — it\'s body maintenance. Enjoy the machines.' },
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
    programmingNote: 'Lower body strength focus. The squat builds your foundation for every CrossFit movement — from wall balls to clean & jerks. The MetCon is deliberately less leg-dominant to protect your quality on the main lift.',
  },
  upper_strength: {
    label: 'Upper Strength',
    warmup: 'upper',
    strengthFocus: ['press', 'push_press', 'bench_press'],
    metconModality: ['gymnastics', 'barbell_gymnastics', 'mixed'],
    skillCategories: ['upper_gymnastics'],
    programmingNote: 'Overhead pressing strength is the base for HSPU, push jerk, and handstand work. Today pairs heavy pressing with gymnastics-heavy conditioning — both demand shoulder stability and lockout strength.',
  },
  olympic_lifting: {
    label: 'Olympic Lifting',
    warmup: 'oly',
    strengthFocus: ['clean', 'snatch', 'clean_jerk'],
    metconModality: ['barbell', 'barbell_gymnastics', 'mixed'],
    skillCategories: ['upper_gymnastics', 'core_lower'],
    programmingNote: 'Olympic lifting day. The snatch and clean & jerk are technically the most demanding movements in CrossFit. Today\'s focus is on quality over load — own every rep with correct mechanics before adding weight.',
  },
  gymnastics_engine: {
    label: 'Gymnastics + Engine',
    warmup: 'gymnastics',
    strengthFocus: [],
    metconModality: ['gymnastics', 'mixed', 'monostructural'],
    skillCategories: ['upper_gymnastics', 'core_lower', 'jump_rope'],
    programmingNote: 'Gymnastics skill development combined with aerobic engine work. No barbell today — this session is about bodyweight mastery and building your aerobic base. The skill block targets your next progression step.',
  },
  posterior_chain: {
    label: 'Posterior Chain',
    warmup: 'lower',
    strengthFocus: ['deadlift'],
    metconModality: ['barbell', 'mixed'],
    skillCategories: ['core_lower', 'other'],
    programmingNote: 'Posterior chain (hamstrings, glutes, lower back) is the engine of CrossFit. Heavy deadlifts build pulling strength and protect your back in every other movement. The MetCon reinforces hip hinge patterns under fatigue.',
  },
  chipper_day: {
    label: 'Long Chipper',
    warmup: 'mixed',
    strengthFocus: [],
    metconModality: ['mixed', 'monostructural_gymnastics'],
    skillCategories: ['upper_gymnastics', 'jump_rope'],
    programmingNote: 'Long mixed-modal conditioning. This is the Mayhem "chipper" day — high volume, all movement patterns, tests your capacity to sustain effort across time. Pacing is everything here. Go out too fast and you\'ll suffer.',
  },
};

// Days/week → day type rotation
const DAY_ROTATIONS = {
  3: ['lower_strength', 'gymnastics_engine', 'olympic_lifting'],
  4: ['lower_strength', 'gymnastics_engine', 'upper_strength', 'olympic_lifting'],
  5: ['lower_strength', 'gymnastics_engine', 'upper_strength', 'olympic_lifting', 'posterior_chain'],
  6: ['lower_strength', 'gymnastics_engine', 'upper_strength', 'olympic_lifting', 'posterior_chain', 'chipper_day'],
};
