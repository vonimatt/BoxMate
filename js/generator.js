// ─── PLAN GENERATOR ───────────────────────────────────────────────────────────

// MetCon movement → athlete's strength lift + typical MetCon % of 1RM
// ─── SKILL UPGRADE PATHS ──────────────────────────────────────────────────────
// When an athlete has a skill at RX AND selects it as a skill target,
// we don't start from scratch. Instead we either:
//   redirect → program the next skill in the natural progression chain
//   startStep → jump into the advanced portion of the existing progression
const SKILL_RX_UPGRADES = {
  // Gymnastics chain — each skill unlocks the next
  pull_up:       { redirect: 'chest_to_bar'   },  // RX pull-up goal → learn C2B
  chest_to_bar:  { redirect: 'bar_muscle_up'  },  // RX C2B goal → learn Bar MU
  bar_muscle_up: { redirect: 'ring_muscle_up' },  // RX Bar MU goal → learn Ring MU

  // Skills with advanced drills already inside the progression
  ring_muscle_up:{ startStep: 5 },  // strict ring MU / competition quality (steps 5-6)
  hspu:          { startStep: 4 },  // deficit HSPU 2cm → 5cm (steps 4-5)
  handstand_walk:{ startStep: 5 },  // HS walk 10m → 25m (steps 5-6)
  toes_to_bar:   { startStep: 4 },  // unbroken TTB sets → strict TTB (steps 4-5)
  double_under:  { startStep: 4 },  // 30 DU unbroken → 50 DU sets (steps 4-5)
  rope_climb:    { startStep: 2 },  // legless rope climbs → J-hook mastery (steps 2-4)
};

// ─── METCON → LIFT MAPPING ────────────────────────────────────────────────────
const MOVEMENT_TO_LIFT = {
  thruster:         { lift: 'front_squat', pct: 0.55 },
  clean:            { lift: 'clean',       pct: 0.70 },  // generic clean (MetCon % of 1RM)
  clean_jerk:       { lift: 'clean_jerk',  pct: 0.75 },
  snatch:           { lift: 'snatch',      pct: 0.65 },
  squat_snatch:     { lift: 'snatch',      pct: 0.68 },
  power_snatch:     { lift: 'snatch',      pct: 0.72 },
  squat_clean:      { lift: 'clean',       pct: 0.72 },
  power_clean:      { lift: 'clean',       pct: 0.78 },
  hang_power_clean: { lift: 'clean',       pct: 0.72 },
  deadlift:         { lift: 'deadlift',    pct: 0.68 },
  press:            { lift: 'press',       pct: 0.70 },
  push_press:       { lift: 'push_press',  pct: 0.70 },
  push_jerk:        { lift: 'push_press',  pct: 0.72 },
  ohs:              { lift: 'snatch',      pct: 0.52 },
  sdhp:             { lift: 'deadlift',    pct: 0.38 },
  back_squat:       { lift: 'back_squat',  pct: 0.65 },
  front_squat:      { lift: 'front_squat', pct: 0.65 },
};

const Generator = {
  // Entry point — returns a full plan object
  generate(profile, params) {
    const { daysPerWeek, sessionLength, durationWeeks, startDate } = params;
    const weeks = [];
    const dayRotation = DAY_ROTATIONS[daysPerWeek];
    const usedCounts = {}; // track MetCon usage for anti-repeat

    for (let w = 0; w < durationWeeks; w++) {
      const wave = this._waveForWeek(w, durationWeeks);
      const weekDays = [];

      for (let d = 0; d < daysPerWeek; d++) {
        const dayType = DAY_TYPES[dayRotation[d % dayRotation.length]];
        const date = this._addDays(startDate, w * 7 + this._dayOffset(d, daysPerWeek));
        weekDays.push(this._buildDay(profile, dayType, wave, date, sessionLength, w, d, usedCounts));
      }
      weeks.push({ weekNumber: w + 1, wave, days: weekDays });
    }

    return {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      params,
      weeks,
    };
  },

  // Wave type for each week index
  // Last week of 8+ week plans = 'peak' (test week) instead of 'deload'
  _waveForWeek(weekIndex, totalWeeks) {
    if (totalWeeks >= 8 && weekIndex === totalWeeks - 1) return 'peak';
    if (totalWeeks <= 4) {
      return ['accumulation', 'intensification', 'realization', 'deload'][weekIndex] || 'accumulation';
    }
    const cycle = weekIndex % 4;
    return ['accumulation', 'intensification', 'realization', 'deload'][cycle];
  },

  // Wave → strength params (each 4-week cycle adds 5% to non-deload waves)
  _waveParams(wave, cycleNumber = 0) {
    const bonus = cycleNumber * 0.05;
    const base = {
      accumulation:    { sets: 5, reps: 5, pct: 0.72 + bonus, label: 'Week A — Accumulation'       },
      intensification: { sets: 4, reps: 4, pct: 0.82 + bonus, label: 'Week B — Intensification'    },
      realization:     { sets: 3, reps: 3, pct: 0.92 + bonus, label: 'Week C — Realization'        },
      deload:          { sets: 3, reps: 5, pct: 0.62,          label: 'Week D — Deload'             },
      peak:            { sets: 3, reps: 1, pct: 0.97,          label: 'Peak Week — Test Your 1RMs!' },
    };
    return base[wave] || base.accumulation;
  },

  // Olympic lifting wave params — max 3 reps/set (technique degrades above that)
  _olyWaveParams(wave, cycleNumber = 0) {
    const bonus = cycleNumber * 0.05;
    const base = {
      accumulation:    { sets: 6, reps: 3, pct: 0.72 + bonus, label: 'Week A — Accumulation'       },
      intensification: { sets: 5, reps: 2, pct: 0.82 + bonus, label: 'Week B — Intensification'    },
      realization:     { sets: 4, reps: 1, pct: 0.90 + bonus, label: 'Week C — Realization'        },
      deload:          { sets: 4, reps: 3, pct: 0.65,          label: 'Week D — Deload'             },
      peak:            { sets: 3, reps: 1, pct: 0.97,          label: 'Peak Week — Test Your 1RM!'  },
    };
    return base[wave] || base.accumulation;
  },

  _buildDay(profile, dayType, wave, date, sessionLength, weekIdx, dayIdx, usedCounts) {
    const cycleNumber = Math.floor(weekIdx / 4);
    const isDeload = wave === 'deload';
    const isPeak  = wave === 'peak';

    // Use oly-specific params when needed
    const hasOlyFocus = dayType.strengthFocus?.some(l =>
      STRENGTH_MOVEMENTS.find(m => m.id === l)?.category === 'oly'
    );
    const wp = hasOlyFocus
      ? this._olyWaveParams(wave, cycleNumber)
      : this._waveParams(wave, cycleNumber);

    // ── Strength block ──
    const strengthBlock = this._buildStrengthBlock(profile, dayType, wave, cycleNumber, isDeload, isPeak);

    // ── Skill block ──
    const skillBlock = this._buildSkillBlock(profile, dayType, weekIdx);

    // ── MetCon ──
    const metcon = this._pickMetcon(dayType, wave, weekIdx, dayIdx, usedCounts);

    // ── Personalized MetCon weights ──
    const personalizedWeights = this._getPersonalizedWeights(metcon, profile);

    // ── Pacing suggestion from endurance data ──
    const pacingSuggestion = this._getPacingSuggestion(metcon, profile);

    // ── Warm-up ──
    const warmup = WARMUPS[dayType.warmup] || WARMUPS.mixed;

    // Adjust content to session length
    const hasSkill = sessionLength >= 60;
    const hasAccessory = sessionLength >= 75;

    return {
      date,
      label: dayType.label,
      wave,
      warmup,
      strengthBlock: strengthBlock || null,
      skillBlock: (hasSkill && skillBlock) ? skillBlock : null,
      metcon,
      personalizedWeights,
      pacingSuggestion,
      accessoryNote: hasAccessory ? this._accessoryNote(dayType) : null,
    };
  },

  _buildStrengthBlock(profile, dayType, wave, cycleNumber, isDeload, isPeak) {
    const lifts = dayType.strengthFocus;
    if (!lifts || lifts.length === 0) return null;

    // Pick first lift with a 1RM entered, fallback to first lift
    const liftId = lifts.find(l => profile.strength && profile.strength[l]) || lifts[0];
    const movement = STRENGTH_MOVEMENTS.find(m => m.id === liftId);
    if (!movement) return null;

    const isOly = movement.category === 'oly';
    const wp = isOly
      ? this._olyWaveParams(wave, cycleNumber)
      : this._waveParams(wave, cycleNumber);

    const oneRM = profile.strength?.[liftId] || null;
    const workWeight = oneRM ? Math.round((oneRM * wp.pct) / 2.5) * 2.5 : null;

    let note;
    if (isPeak) {
      note = '🏆 Peak Week — attempt a new 1RM today! Warm up thoroughly.';
    } else if (isDeload) {
      note = 'Deload — focus entirely on technique, move well and recover.';
    } else {
      note = `Build to ${Math.round(wp.pct * 100)}% by the last working set.`;
    }

    return {
      movement: movement.label,
      category: movement.category,
      sets: wp.sets,
      reps: wp.reps,
      pct: Math.round(wp.pct * 100),
      weight: workWeight,
      note,
    };
  },

  _buildSkillBlock(profile, dayType, weekIdx) {
    const skills = Object.entries(SKILL_PROGRESSIONS)
      .filter(([, s]) => dayType.skillCategories.includes(s.category));

    if (skills.length === 0) return null;

    const targets = this._getSkillTargets(profile, skills);
    if (targets.length === 0) return null;

    // Rotate through targets across weeks
    const target = targets[weekIdx % targets.length];
    const progression = SKILL_PROGRESSIONS[target.id];
    const currentStep = target.currentStep;
    // Advance 1 step every 3 weeks, capped at last step
    const progressionStep = Math.min(currentStep + Math.floor(weekIdx / 3), progression.steps.length - 1);
    const mainDrill = progression.steps[progressionStep];

    // Pick the right session support phase based on progression step
    const supportDrills = this._getSessionSupportDrills(progression, progressionStep);

    return {
      skillName: progression.label,
      currentLevel: progression.steps[currentStep]?.label || 'Working',
      drill: mainDrill,          // The "key drill" — the main progression step
      supportDrills,             // 2-3 warm-up / strength support drills
      progressionStep,
      totalSteps: progression.steps.length - 1,
      isAdvanced: target.isAdvanced || false,
    };
  },

  // Return the 2-3 support drills for a given skill + step
  // Phase: foundation (steps 0-1) · building (steps 2-3) · performance (steps 4+)
  _getSessionSupportDrills(progression, step) {
    if (!progression.sessionDrills) return [];
    const phase = step <= 1 ? 'foundation' : step <= 3 ? 'building' : 'performance';
    return progression.sessionDrills[phase] || progression.sessionDrills.foundation || [];
  },

  _getSkillTargets(profile, availableSkills) {
    const targets = [];
    for (const [id, progression] of availableSkills) {
      const profileSkill = profile.skills?.[id];
      if (!profileSkill) continue;
      if (profileSkill.level === 'rx') continue; // ✅ already have it — never program progression

      const currentStep = profileSkill.step ?? 0;
      targets.push({ id, currentStep });
    }

    // Include goal skills — with upgrade logic for RX skills
    if (profile.goals?.skillTargets) {
      for (const goalId of profile.goals.skillTargets) {
        if (!SKILL_PROGRESSIONS[goalId]) continue;
        const profileSkill = profile.skills?.[goalId];

        if (profileSkill?.level === 'rx') {
          // ── Skill is already RX — don't restart from scratch, improve it ──
          const upgrade = SKILL_RX_UPGRADES[goalId];

          if (upgrade?.redirect) {
            // e.g. pull_up RX → program chest_to_bar progression instead
            const nextId = upgrade.redirect;
            if (SKILL_PROGRESSIONS[nextId] && !targets.find(t => t.id === nextId)) {
              const nextSkill = profile.skills?.[nextId];
              if (nextSkill?.level !== 'rx') {
                // Next skill isn't RX yet — program it from the athlete's current step
                targets.push({ id: nextId, currentStep: nextSkill?.step ?? 0 });
              }
              // If next skill is ALSO RX, skip (chain fully mastered)
            }
          } else if (upgrade?.startStep !== undefined) {
            // e.g. HSPU RX → start at deficit work (step 4), not pike push-ups (step 0)
            if (!targets.find(t => t.id === goalId)) {
              const prog = SKILL_PROGRESSIONS[goalId];
              const startStep = Math.min(upgrade.startStep, prog.steps.length - 1);
              targets.push({ id: goalId, currentStep: startStep, isAdvanced: true });
            }
          }
          // No upgrade defined for this skill → fully mastered, nothing to add
          continue;
        }

        // ── Skill not yet RX — normal goal programming ──
        if (!targets.find(t => t.id === goalId)) {
          targets.push({ id: goalId, currentStep: profileSkill?.step ?? 0 });
        }
      }
    }
    return targets.slice(0, 2); // max 2 skills per day
  },

  // Anti-repeat MetCon picker: always prefer least-used MetCons in this plan
  _pickMetcon(dayType, wave, weekIdx, dayIdx, usedCounts) {
    const intensityMap = {
      accumulation:    'moderate',
      intensification: 'moderate',
      realization:     'high',
      deload:          'low',
      peak:            'high',
    };
    const targetIntensity = intensityMap[wave] || 'moderate';
    const targetModalities = dayType.metconModality;

    let pool = METCONS.filter(m =>
      m.intensity === targetIntensity &&
      targetModalities.some(mod => m.modality.includes(mod.split('_')[0]))
    );

    if (pool.length === 0) pool = METCONS.filter(m => m.intensity === targetIntensity);
    if (pool.length === 0) pool = [...METCONS];

    // Shuffle pool with a deterministic seed so later MetCons (endurance equipment etc.)
    // have equal chance of selection — without this, earliest items in the array are
    // always preferred when usedCounts are tied at 0.
    const seed = weekIdx * 37 + dayIdx * 13 + pool.length;
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.abs((seed * (i + 1) * 1103515245 + 12345) & 0x7fffffff) % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Sort by usage count ascending (least used first); shuffled order breaks ties
    const poolWithIdx = shuffled.map((m, i) => ({ m, i }));
    poolWithIdx.sort((a, b) => {
      const cA = usedCounts[a.m.id] || 0;
      const cB = usedCounts[b.m.id] || 0;
      return cA - cB; // least used first; ties broken by shuffled position
    });

    const chosen = poolWithIdx[0].m;
    usedCounts[chosen.id] = (usedCounts[chosen.id] || 0) + 1;
    return chosen;
  },

  // Return personalized MetCon weights based on athlete's 1RMs
  _getPersonalizedWeights(metcon, profile) {
    if (!profile || !profile.strength) return {};
    const weights = {};
    for (const movement of (metcon.movements || [])) {
      const mapping = MOVEMENT_TO_LIFT[movement];
      if (!mapping) continue;
      const oneRM = profile.strength[mapping.lift];
      if (!oneRM || oneRM <= 0) continue;
      const w = Math.round((oneRM * mapping.pct) / 2.5) * 2.5;
      if (w <= 0) continue;
      const liftLabel = STRENGTH_MOVEMENTS.find(m => m.id === mapping.lift)?.label || mapping.lift;
      weights[movement] = {
        weight: w,
        note: `~${w}kg (${Math.round(mapping.pct * 100)}% of your ${oneRM}kg ${liftLabel})`,
      };
    }
    return weights;
  },

  // Return pacing suggestion string based on athlete's endurance benchmarks
  _getPacingSuggestion(metcon, profile) {
    if (!profile || !profile.endurance) return null;
    const hasRun = metcon.movements?.includes('run');
    const hasRow = metcon.movements?.includes('row');
    const suggestions = [];

    if (hasRun) {
      const t400 = profile.endurance.run_400;
      if (t400) {
        const [mm, ss] = t400.split(':').map(Number);
        const totalSec = (mm || 0) * 60 + (ss || 0);
        const metconPace = totalSec + 20; // ~20s/400m slower for MetCon
        const paceMin = Math.floor(metconPace / 60);
        const paceSec = metconPace % 60;
        suggestions.push(`Your 400m PR: ${t400} → MetCon pace target: ~${paceMin}:${String(paceSec).padStart(2,'0')}/400m`);
      }
    }
    if (hasRow) {
      const t500 = profile.endurance.row_500;
      if (t500) {
        const [mm, ss] = t500.split(':').map(Number);
        const totalSec = (mm || 0) * 60 + (ss || 0);
        const metconPace = totalSec + 12; // ~12s/500m slower for MetCon
        const paceMin = Math.floor(metconPace / 60);
        const paceSec = metconPace % 60;
        suggestions.push(`Your 500m row PR: ${t500} → MetCon split: ~${paceMin}:${String(paceSec).padStart(2,'0')}/500m`);
      }
    }
    return suggestions.length > 0 ? suggestions.join(' | ') : null;
  },

  _accessoryNote(dayType) {
    const notes = {
      lower_strength:    '2-3 sets: single-leg RDL + Copenhagen plank',
      upper_strength:    '2-3 sets: face pulls + tricep push-downs',
      olympic_lifting:   '2-3 sets: snatch balance or clean pull',
      gymnastics_engine: '2-3 sets: hollow hold + arch hold 20s each',
      posterior_chain:   '2-3 sets: GHD back extension or good morning',
      chipper_day:       'Stretch: 5 min hip flexors + thoracic rotation',
    };
    return notes[Object.keys(DAY_TYPES).find(k => DAY_TYPES[k] === dayType)] || 'Cool down + stretch 5 min';
  },

  _addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  },

  // Spread training days across the week with rest days in between
  _dayOffset(dayIndex, totalDays) {
    const patterns = {
      3: [0, 2, 4],
      4: [0, 1, 3, 4],
      5: [0, 1, 2, 4, 5],
      6: [0, 1, 2, 4, 5, 6],
    };
    return (patterns[totalDays] || patterns[4])[dayIndex] ?? dayIndex;
  }
};
