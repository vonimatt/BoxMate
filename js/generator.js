// ─── PLAN GENERATOR ───────────────────────────────────────────────────────────

const Generator = {
  // Entry point — returns a full plan object
  generate(profile, params) {
    const { daysPerWeek, sessionLength, durationWeeks, startDate } = params;
    const weeks = [];
    const dayRotation = DAY_ROTATIONS[daysPerWeek];

    for (let w = 0; w < durationWeeks; w++) {
      const wave = this._waveForWeek(w, durationWeeks);
      const weekDays = [];

      for (let d = 0; d < daysPerWeek; d++) {
        const dayType = DAY_TYPES[dayRotation[d % dayRotation.length]];
        const date = this._addDays(startDate, w * 7 + this._dayOffset(d, daysPerWeek));
        weekDays.push(this._buildDay(profile, dayType, wave, date, sessionLength, w, d));
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
  _waveForWeek(weekIndex, totalWeeks) {
    if (totalWeeks <= 4) {
      return ['accumulation', 'intensification', 'realization', 'deload'][weekIndex] || 'accumulation';
    }
    const cycle = weekIndex % 4;
    return ['accumulation', 'intensification', 'realization', 'deload'][cycle];
  },

  // Wave → strength params
  _waveParams(wave, cycleNumber = 0) {
    const bonus = cycleNumber * 0.05; // each 4-week cycle adds 5%
    const base = {
      accumulation:    { sets: 5, reps: 5, pct: 0.72 + bonus, label: 'Week A — Accumulation'  },
      intensification: { sets: 4, reps: 4, pct: 0.82 + bonus, label: 'Week B — Intensification' },
      realization:     { sets: 3, reps: 3, pct: 0.92 + bonus, label: 'Week C — Realization'   },
      deload:          { sets: 3, reps: 5, pct: 0.62,          label: 'Week D — Deload'        },
    };
    return base[wave] || base.accumulation;
  },

  _buildDay(profile, dayType, wave, date, sessionLength, weekIdx, dayIdx) {
    const cycleNumber = Math.floor(weekIdx / 4);
    const wp = this._waveParams(wave, cycleNumber);
    const isDeload = wave === 'deload';

    // ── Strength block ──
    const strengthBlock = this._buildStrengthBlock(profile, dayType, wp, isDeload);

    // ── Skill block ──
    const skillBlock = this._buildSkillBlock(profile, dayType, weekIdx);

    // ── MetCon ──
    const metcon = this._pickMetcon(dayType, wave, weekIdx, dayIdx);

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
      accessoryNote: hasAccessory ? this._accessoryNote(dayType) : null,
    };
  },

  _buildStrengthBlock(profile, dayType, wp, isDeload) {
    const lifts = dayType.strengthFocus;
    if (!lifts || lifts.length === 0) return null;

    // Pick first lift with a 1RM entered, fallback to first lift
    const liftId = lifts.find(l => profile.strength && profile.strength[l]) || lifts[0];
    const movement = STRENGTH_MOVEMENTS.find(m => m.id === liftId);
    if (!movement) return null;

    const oneRM = profile.strength?.[liftId] || null;
    const workWeight = oneRM ? Math.round((oneRM * wp.pct) / 2.5) * 2.5 : null;

    return {
      movement: movement.label,
      sets: wp.sets,
      reps: wp.reps,
      pct: Math.round(wp.pct * 100),
      weight: workWeight,
      note: isDeload ? 'Deload — focus on technique, move well' : `Build to ${Math.round(wp.pct * 100)}% by last set`,
    };
  },

  _buildSkillBlock(profile, dayType, weekIdx) {
    const skills = Object.entries(SKILL_PROGRESSIONS)
      .filter(([, s]) => dayType.skillCategories.includes(s.category));

    if (skills.length === 0) return null;

    // Find skills the athlete is working on (not yet RX, has a goal, or is in progress)
    const targets = this._getSkillTargets(profile, skills);
    if (targets.length === 0) return null;

    // Rotate through targets across weeks
    const target = targets[weekIdx % targets.length];
    const progression = SKILL_PROGRESSIONS[target.id];
    const currentStep = target.currentStep;
    const nextStep = progression.steps[Math.min(currentStep + Math.floor(weekIdx / 3), progression.steps.length - 1)];

    return {
      skillName: progression.label,
      currentLevel: progression.steps[currentStep]?.label || 'Working',
      drill: nextStep,
      progressionStep: Math.min(currentStep + Math.floor(weekIdx / 3), progression.steps.length - 1),
      totalSteps: progression.steps.length - 1,
    };
  },

  _getSkillTargets(profile, availableSkills) {
    const targets = [];
    for (const [id, progression] of availableSkills) {
      const profileSkill = profile.skills?.[id];
      if (!profileSkill) continue;
      if (profileSkill.level === 'rx') continue; // already have it

      const currentStep = profileSkill.step ?? 0;
      targets.push({ id, currentStep });
    }
    // Also include goal skills even if not in available list
    if (profile.goals?.skillTargets) {
      for (const goalId of profile.goals.skillTargets) {
        if (!targets.find(t => t.id === goalId) && SKILL_PROGRESSIONS[goalId]) {
          const profileSkill = profile.skills?.[goalId];
          targets.push({ id: goalId, currentStep: profileSkill?.step ?? 0 });
        }
      }
    }
    return targets.slice(0, 2); // max 2 skills per day
  },

  _pickMetcon(dayType, wave, weekIdx, dayIdx) {
    const intensityMap = {
      accumulation:    'moderate',
      intensification: 'moderate',
      realization:     'high',
      deload:          'low',
    };
    const targetIntensity = intensityMap[wave];
    const targetModalities = dayType.metconModality;

    let pool = METCONS.filter(m =>
      m.intensity === targetIntensity &&
      targetModalities.some(mod => m.modality.includes(mod.split('_')[0]))
    );

    if (pool.length === 0) {
      pool = METCONS.filter(m => m.intensity === targetIntensity);
    }
    if (pool.length === 0) pool = METCONS;

    // Use week+day index to get variety, deterministic
    return pool[(weekIdx * 4 + dayIdx) % pool.length];
  },

  _accessoryNote(dayType) {
    const notes = {
      lower_strength:  '2-3 sets: single-leg RDL + Copenhagen plank',
      upper_strength:  '2-3 sets: face pulls + tricep push-downs',
      olympic_lifting: '2-3 sets: snatch balance or clean pull',
      gymnastics_engine: '2-3 sets: hollow hold + arch hold 20s each',
      posterior_chain: '2-3 sets: GHD back extension or good morning',
      chipper_day:     'Stretch: 5 min hip flexors + thoracic rotation',
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
      3: [0, 2, 4],       // Mon, Wed, Fri
      4: [0, 1, 3, 4],    // Mon, Tue, Thu, Fri
      5: [0, 1, 2, 4, 5], // Mon-Wed, Fri-Sat
      6: [0, 1, 2, 4, 5, 6],
    };
    return (patterns[totalDays] || patterns[4])[dayIndex] ?? dayIndex;
  }
};
