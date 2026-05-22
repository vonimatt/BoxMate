// ─── STATE ────────────────────────────────────────────────────────────────────
let state = {
  view: 'dashboard',   // dashboard | wizard | configure | plan | day
  wizardStep: 1,
  profile: null,
  plan: null,
  selectedDate: null,
  selectedWeek: 0,
};

function setState(updates) {
  Object.assign(state, updates);
  render();
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  state.profile = Storage.loadProfile();
  state.plan    = Storage.loadPlan();
  state.selectedDate = new Date().toISOString().slice(0, 10);
  render();
});

// ─── ROUTER / RENDER ─────────────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  app.innerHTML = renderNav() + renderView();
  attachEvents();
}

function renderNav() {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'wizard',    label: 'My Profile' },
    { id: 'configure', label: 'New Plan' },
    { id: 'plan',      label: 'Training Plan' },
  ];
  return `
    <nav class="nav">
      <div class="nav-brand">⚡ CF Planner</div>
      <div class="nav-tabs">
        ${tabs.map(t => `
          <button class="nav-tab ${state.view === t.id ? 'active' : ''}"
                  data-nav="${t.id}">${t.label}</button>
        `).join('')}
      </div>
      <div class="nav-actions">
        <button class="btn-icon" id="btn-export" title="Export JSON">↓ Export</button>
        <label class="btn-icon" for="import-input" title="Import JSON">↑ Import</label>
        <input type="file" id="import-input" accept=".json" style="display:none">
      </div>
    </nav>`;
}

function renderView() {
  switch (state.view) {
    case 'dashboard': return renderDashboard();
    case 'wizard':    return renderWizard();
    case 'configure': return renderConfigure();
    case 'plan':      return renderPlan();
    default:          return renderDashboard();
  }
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function renderDashboard() {
  if (!state.profile || !state.plan) {
    return `
      <div class="view">
        <div class="hero">
          <h1>CrossFit Training Planner</h1>
          <p class="hero-sub">Mayhem-style programming tailored to your current level and goals.</p>
          <div class="hero-actions">
            <button class="btn btn-primary" data-nav="wizard">Set Up My Profile →</button>
          </div>
        </div>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">💪</div>
            <h3>Wave Loading Cycles</h3>
            <p>3-week waves: Accumulation → Intensification → Realization, with auto-calculated weights from your 1RMs.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🤸</div>
            <h3>Skill Progressions</h3>
            <p>Step-by-step drills for muscle-ups, HSPU, handstand walk, TTB, and more — starting from your exact level.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📅</div>
            <h3>Up to 12 Weeks</h3>
            <p>Full daily workouts: warm-up, strength/skill block, and MetCon — built for 3 to 6 days per week.</p>
          </div>
        </div>
      </div>`;
  }

  const today = new Date().toISOString().slice(0, 10);
  const todayWorkout = findDayInPlan(state.plan, today);
  const totalWeeks = state.plan.weeks.length;
  const currentWeekNum = findCurrentWeek(state.plan, today);

  return `
    <div class="view">
      <div class="dashboard-header">
        <div>
          <h2>Welcome back! 👋</h2>
          <p class="subtitle">Week ${currentWeekNum} of ${totalWeeks} · ${state.plan.weeks[currentWeekNum-1]?.wave || ''}</p>
        </div>
        <div class="dashboard-actions">
          <button class="btn btn-secondary" data-nav="plan">View Full Plan</button>
          <button class="btn btn-outline" data-nav="configure">New Plan</button>
        </div>
      </div>

      ${todayWorkout ? renderDayCard(todayWorkout, true) : `
        <div class="rest-day-card">
          <div class="rest-icon">😴</div>
          <h3>Rest Day</h3>
          <p>No training scheduled today. Recovery is part of the program.</p>
        </div>`}

      <div class="week-strip">
        <h3>This Week</h3>
        <div class="week-days">
          ${renderWeekStrip(state.plan, currentWeekNum - 1, today)}
        </div>
      </div>
    </div>`;
}

function renderDayCard(day, highlight = false) {
  if (!day) return '';
  const dateLabel = formatDate(day.date);
  return `
    <div class="day-card ${highlight ? 'today' : ''}" data-date="${day.date}">
      <div class="day-card-header">
        <span class="day-type-badge">${day.label}</span>
        <span class="day-date">${dateLabel}</span>
        <span class="wave-badge wave-${day.wave}">${day.wave}</span>
      </div>
      <div class="day-card-body">
        ${day.strengthBlock ? `
          <div class="block-preview">
            <span class="block-label">💪 Strength</span>
            <span>${day.strengthBlock.movement} — ${day.strengthBlock.sets}×${day.strengthBlock.reps}
              ${day.strengthBlock.weight ? `@ ${day.strengthBlock.weight}kg` : `@ ${day.strengthBlock.pct}%`}</span>
          </div>` : ''}
        ${day.skillBlock ? `
          <div class="block-preview">
            <span class="block-label">🤸 Skill</span>
            <span>${day.skillBlock.skillName} — ${day.skillBlock.drill.label}</span>
          </div>` : ''}
        <div class="block-preview">
          <span class="block-label">🔥 MetCon</span>
          <span>${day.metcon.name} · ${day.metcon.type} · ~${day.metcon.duration}min</span>
        </div>
      </div>
      <button class="btn btn-primary btn-full" data-open-day="${day.date}">View Full Workout →</button>
    </div>`;
}

function renderWeekStrip(plan, weekIdx, today) {
  const week = plan.weeks[weekIdx];
  if (!week) return '';
  return week.days.map(day => {
    const isToday = day.date === today;
    const isPast = day.date < today;
    return `
      <div class="strip-day ${isToday ? 'today' : ''} ${isPast ? 'past' : ''}" data-open-day="${day.date}">
        <span class="strip-dow">${getDOW(day.date)}</span>
        <span class="strip-type">${day.label.split(' ')[0]}</span>
        <span class="strip-meta">${day.metcon.name}</span>
      </div>`;
  }).join('');
}

// ─── WIZARD ───────────────────────────────────────────────────────────────────
function renderWizard() {
  const step = state.wizardStep;
  const profile = state.profile || {};

  return `
    <div class="view">
      <div class="wizard">
        <div class="wizard-header">
          <h2>Athlete Profile</h2>
          <div class="steps-indicator">
            ${[1,2,3,4].map(i => `<div class="step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}">
              ${i < step ? '✓' : i}
            </div>`).join('<div class="step-line"></div>')}
          </div>
          <div class="step-labels">
            <span class="${step===1?'active':''}">Strength</span>
            <span class="${step===2?'active':''}">Endurance</span>
            <span class="${step===3?'active':''}">Skills</span>
            <span class="${step===4?'active':''}">Goals</span>
          </div>
        </div>

        <form id="wizard-form" class="wizard-form">
          ${step === 1 ? renderWizardStep1(profile) : ''}
          ${step === 2 ? renderWizardStep2(profile) : ''}
          ${step === 3 ? renderWizardStep3(profile) : ''}
          ${step === 4 ? renderWizardStep4(profile) : ''}

          <div class="wizard-footer">
            ${step > 1 ? `<button type="button" class="btn btn-outline" id="btn-prev">← Back</button>` : '<div></div>'}
            ${step < 4
              ? `<button type="button" class="btn btn-primary" id="btn-next">Next →</button>`
              : `<button type="submit" class="btn btn-primary">Save Profile ✓</button>`}
          </div>
        </form>
      </div>
    </div>`;
}

function renderWizardStep1(profile) {
  const s = profile.strength || {};
  return `
    <div class="step-content">
      <h3>Step 1 — Strength Maxes</h3>
      <p class="step-desc">Enter your current 1 Rep Max (1RM) in kg. Leave blank if unknown.</p>
      <div class="input-grid">
        ${STRENGTH_MOVEMENTS.map(m => `
          <div class="input-group">
            <label>${m.label}</label>
            <div class="input-row">
              <input type="number" name="strength_${m.id}" placeholder="kg"
                     value="${s[m.id] || ''}" min="0" step="2.5">
              <span class="input-unit">kg</span>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderWizardStep2(profile) {
  const e = profile.endurance || {};
  return `
    <div class="step-content">
      <h3>Step 2 — Endurance Benchmarks</h3>
      <p class="step-desc">Your best times. Format: mm:ss (e.g. 1:42 for a 500m row). Leave blank if unknown.</p>
      <div class="input-grid">
        ${ENDURANCE_BENCHMARKS.map(b => `
          <div class="input-group">
            <label>${b.label}</label>
            <input type="text" name="endurance_${b.id}" placeholder="mm:ss"
                   value="${e[b.id] || ''}" pattern="\\d{1,2}:\\d{2}">
          </div>`).join('')}
      </div>
    </div>`;
}

function renderWizardStep3(profile) {
  const skills = profile.skills || {};
  const categories = {
    upper_gymnastics: 'Upper Gymnastics',
    core_lower:       'Core & Lower',
    jump_rope:        'Jump Rope',
    other:            'Other Skills',
  };

  return `
    <div class="step-content">
      <h3>Step 3 — Skills</h3>
      <p class="step-desc">Select your current level for each skill.</p>
      ${Object.entries(categories).map(([cat, catLabel]) => {
        const catSkills = Object.entries(SKILL_PROGRESSIONS).filter(([,s]) => s.category === cat);
        if (!catSkills.length) return '';
        return `
          <div class="skill-category">
            <h4>${catLabel}</h4>
            <div class="skill-grid">
              ${catSkills.map(([id, prog]) => {
                const current = skills[id] || { level: 'not_yet', step: 0 };
                return `
                  <div class="skill-row">
                    <span class="skill-name">${prog.label}</span>
                    <div class="skill-level-select">
                      <label class="skill-radio ${current.level === 'rx' ? 'active' : ''}">
                        <input type="radio" name="skill_level_${id}" value="rx"
                               ${current.level === 'rx' ? 'checked' : ''}> RX
                      </label>
                      <label class="skill-radio ${current.level === 'scaling' ? 'active' : ''}">
                        <input type="radio" name="skill_level_${id}" value="scaling"
                               ${current.level === 'scaling' ? 'checked' : ''}> Scaling
                      </label>
                      <label class="skill-radio ${current.level === 'not_yet' ? 'active' : ''}">
                        <input type="radio" name="skill_level_${id}" value="not_yet"
                               ${current.level === 'not_yet' ? 'checked' : ''}> Not yet
                      </label>
                    </div>
                    <div class="skill-step-select ${current.level === 'scaling' ? '' : 'hidden'}" id="step-select-${id}">
                      <select name="skill_step_${id}">
                        ${prog.steps.map((step, i) => `
                          <option value="${i}" ${current.step === i ? 'selected' : ''}>${step.label}</option>
                        `).join('')}
                      </select>
                    </div>
                  </div>`;
              }).join('')}
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function renderWizardStep4(profile) {
  const goals = profile.goals || {};
  const strength = profile.strength || {};
  const goalOptions = [
    { id: 'strength',      label: '💪 Build Strength',       desc: 'Focus on barbell numbers and wave loading cycles' },
    { id: 'skill_mastery', label: '🤸 Skill Mastery',        desc: 'Prioritize gymnastics progressions in programming' },
    { id: 'engine',        label: '🫁 Build Engine',          desc: 'Aerobic capacity and metabolic conditioning' },
    { id: 'competition',   label: '🏆 Competition Prep',      desc: 'Balanced across all domains like Mayhem' },
    { id: 'general',       label: '⚡ General Fitness',       desc: 'Varied programming, no single focus' },
  ];

  return `
    <div class="step-content">
      <h3>Step 4 — Goals</h3>
      <p class="step-desc">What are you training for?</p>

      <h4>Primary Goal</h4>
      <div class="goal-grid">
        ${goalOptions.map(g => `
          <label class="goal-card ${goals.primary === g.id ? 'active' : ''}">
            <input type="radio" name="goal_primary" value="${g.id}"
                   ${goals.primary === g.id ? 'checked' : ''}>
            <strong>${g.label}</strong>
            <span>${g.desc}</span>
          </label>`).join('')}
      </div>

      <h4 style="margin-top:2rem">Skill Targets <small>(up to 3)</small></h4>
      <div class="skill-targets">
        ${Object.entries(SKILL_PROGRESSIONS).map(([id, prog]) => {
          const checked = (goals.skillTargets || []).includes(id);
          return `
            <label class="tag-checkbox ${checked ? 'active' : ''}">
              <input type="checkbox" name="skill_target_${id}" value="${id}"
                     ${checked ? 'checked' : ''}> ${prog.label}
            </label>`;
        }).join('')}
      </div>

      <h4 style="margin-top:2rem">Strength Targets <small>(optional)</small></h4>
      <div class="input-grid">
        ${STRENGTH_MOVEMENTS.slice(0, 4).map(m => {
          const target = (goals.strengthTargets || []).find(t => t.lift === m.id);
          return `
            <div class="input-group">
              <label>${m.label} goal</label>
              <div class="input-row">
                <input type="number" name="str_target_${m.id}" placeholder="kg"
                       value="${target?.weight || ''}" min="0" step="2.5">
                <span class="input-unit">kg</span>
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

// ─── CONFIGURE PLAN ──────────────────────────────────────────────────────────
function renderConfigure() {
  const params = state.lastParams || {};
  return `
    <div class="view">
      <div class="configure-panel">
        <h2>Generate Training Plan</h2>
        ${!state.profile ? `<div class="alert">Complete your athlete profile first to get personalised weights and skill progressions.</div>` : ''}
        <form id="configure-form">
          <div class="config-grid">
            <div class="config-section">
              <h3>Training Days</h3>
              <div class="btn-group" data-group="daysPerWeek">
                ${[3,4,5,6].map(n => `
                  <button type="button" class="toggle-btn ${(params.daysPerWeek||4) === n ? 'active' : ''}"
                          data-value="${n}">${n} days</button>`).join('')}
              </div>
              <input type="hidden" name="daysPerWeek" value="${params.daysPerWeek || 4}">
            </div>

            <div class="config-section">
              <h3>Session Length</h3>
              <div class="btn-group" data-group="sessionLength">
                ${[45,60,75,90].map(n => `
                  <button type="button" class="toggle-btn ${(params.sessionLength||60) === n ? 'active' : ''}"
                          data-value="${n}">${n} min</button>`).join('')}
              </div>
              <input type="hidden" name="sessionLength" value="${params.sessionLength || 60}">
            </div>

            <div class="config-section">
              <h3>Plan Duration</h3>
              <div class="btn-group" data-group="durationWeeks">
                ${[4,8,12].map(n => `
                  <button type="button" class="toggle-btn ${(params.durationWeeks||12) === n ? 'active' : ''}"
                          data-value="${n}">${n} weeks</button>`).join('')}
              </div>
              <input type="hidden" name="durationWeeks" value="${params.durationWeeks || 12}">
            </div>

            <div class="config-section">
              <h3>Start Date</h3>
              <input type="date" name="startDate" class="date-input"
                     value="${params.startDate || new Date().toISOString().slice(0,10)}">
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-large">⚡ Generate My Plan</button>
        </form>
      </div>
    </div>`;
}

// ─── PLAN VIEW ────────────────────────────────────────────────────────────────
function renderPlan() {
  if (!state.plan) {
    return `
      <div class="view">
        <div class="empty-state">
          <p>No plan yet. <button class="btn btn-primary" data-nav="configure">Generate a plan →</button></p>
        </div>
      </div>`;
  }

  const selectedDay = state.selectedDate
    ? findDayInPlan(state.plan, state.selectedDate)
    : null;

  return `
    <div class="view plan-view">
      <div class="plan-header">
        <h2>Training Plan <span class="plan-meta">${state.plan.weeks.length} weeks · ${state.plan.params.daysPerWeek} days/week</span></h2>
        <div class="plan-export-row">
          <button class="btn btn-outline" id="btn-print">🖨 Print Day</button>
        </div>
      </div>

      <div class="week-nav">
        <button class="btn-icon" id="btn-prev-week" ${state.selectedWeek === 0 ? 'disabled' : ''}>← Week ${state.selectedWeek}</button>
        <span class="week-label">Week ${state.selectedWeek + 1} — <em>${state.plan.weeks[state.selectedWeek]?.wave || ''}</em></span>
        <button class="btn-icon" id="btn-next-week" ${state.selectedWeek >= state.plan.weeks.length - 1 ? 'disabled' : ''}>Week ${state.selectedWeek + 2} →</button>
      </div>

      <div class="week-grid">
        ${renderWeekGrid(state.plan.weeks[state.selectedWeek], state.selectedDate)}
      </div>

      ${selectedDay ? renderDayDetail(selectedDay) : ''}
    </div>`;
}

function renderWeekGrid(week, selectedDate) {
  if (!week) return '';
  return week.days.map(day => {
    const isSelected = day.date === selectedDate;
    const today = new Date().toISOString().slice(0, 10);
    const isToday = day.date === today;
    return `
      <div class="week-grid-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}"
           data-open-day="${day.date}">
        <div class="wg-header">
          <span class="wg-dow">${getDOW(day.date)}</span>
          <span class="wg-date">${formatShortDate(day.date)}</span>
        </div>
        <div class="wg-type">${day.label}</div>
        <div class="wg-metcon">${day.metcon.name}</div>
        <div class="wg-duration">${day.metcon.type} · ${day.metcon.duration}min</div>
      </div>`;
  }).join('');
}

function renderDayDetail(day) {
  return `
    <div class="day-detail" id="day-detail">
      <div class="dd-header">
        <h3>${formatDate(day.date)} — ${day.label}</h3>
        <span class="wave-badge wave-${day.wave}">${day.wave}</span>
      </div>

      <div class="dd-section">
        <div class="dd-section-header">
          <span class="dd-icon">🏃</span>
          <h4>Warm-up <small>${day.warmup.duration} min</small></h4>
        </div>
        <ul class="warmup-list">
          ${day.warmup.steps.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>

      ${day.strengthBlock ? `
        <div class="dd-section">
          <div class="dd-section-header">
            <span class="dd-icon">💪</span>
            <h4>Strength Block</h4>
          </div>
          <div class="strength-detail">
            <div class="strength-main">
              <span class="movement-name">${day.strengthBlock.movement}</span>
              <span class="strength-scheme">${day.strengthBlock.sets} × ${day.strengthBlock.reps}</span>
              <span class="strength-weight ${day.strengthBlock.weight ? '' : 'pct-only'}">
                ${day.strengthBlock.weight
                  ? `<strong>${day.strengthBlock.weight} kg</strong> <em>(${day.strengthBlock.pct}% 1RM)</em>`
                  : `<strong>${day.strengthBlock.pct}% of 1RM</strong>`}
              </span>
            </div>
            <p class="strength-note">${day.strengthBlock.note}</p>
          </div>
        </div>` : ''}

      ${day.skillBlock ? `
        <div class="dd-section">
          <div class="dd-section-header">
            <span class="dd-icon">🤸</span>
            <h4>Skill Work — ${day.skillBlock.skillName}</h4>
          </div>
          <div class="skill-detail">
            <div class="skill-progress-bar">
              <div class="skill-progress-fill"
                   style="width:${Math.round((day.skillBlock.progressionStep / day.skillBlock.totalSteps) * 100)}%"></div>
            </div>
            <div class="skill-step-info">
              <span class="skill-step-label">${day.skillBlock.drill.label}</span>
              <span class="skill-step-count">Step ${day.skillBlock.progressionStep + 1} / ${day.skillBlock.totalSteps + 1}</span>
            </div>
            <div class="skill-drill-detail">
              <strong>${day.skillBlock.drill.drill}</strong>
              <span>${day.skillBlock.drill.sets} sets × ${day.skillBlock.drill.reps}</span>
              <p class="skill-notes">${day.skillBlock.drill.notes}</p>
            </div>
          </div>
        </div>` : ''}

      <div class="dd-section metcon-section">
        <div class="dd-section-header">
          <span class="dd-icon">🔥</span>
          <h4>MetCon — ${day.metcon.name}</h4>
          <span class="metcon-badge">${day.metcon.type} · ${day.metcon.duration} min</span>
        </div>
        <div class="metcon-detail">
          <p class="metcon-description">${day.metcon.description}</p>
          ${Object.keys(day.metcon.scales || {}).length ? `
            <div class="scales">
              <h5>Scaling Options</h5>
              ${Object.entries(day.metcon.scales).map(([mv, scale]) =>
                `<div class="scale-row"><span>${mv.replace(/_/g,' ')}</span><span>→ ${scale}</span></div>`
              ).join('')}
            </div>` : ''}
        </div>
      </div>

      ${day.accessoryNote ? `
        <div class="dd-section accessory-section">
          <div class="dd-section-header">
            <span class="dd-icon">✚</span>
            <h4>Accessory Work</h4>
          </div>
          <p>${day.accessoryNote}</p>
        </div>` : ''}
    </div>`;
}

// ─── EVENT HANDLING ───────────────────────────────────────────────────────────
function attachEvents() {
  // Nav tabs
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => setState({ view: btn.dataset.nav, wizardStep: 1 }));
  });

  // Open day detail
  document.querySelectorAll('[data-open-day]').forEach(el => {
    el.addEventListener('click', () => {
      const date = el.dataset.openDay;
      const weekIdx = findWeekIndexForDate(state.plan, date);
      setState({ view: 'plan', selectedDate: date, selectedWeek: weekIdx >= 0 ? weekIdx : state.selectedWeek });
      requestAnimationFrame(() => {
        document.getElementById('day-detail')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  });

  // Wizard navigation
  document.getElementById('btn-next')?.addEventListener('click', () => {
    saveWizardStep(state.wizardStep);
    setState({ wizardStep: state.wizardStep + 1 });
  });
  document.getElementById('btn-prev')?.addEventListener('click', () => {
    setState({ wizardStep: state.wizardStep - 1 });
  });

  // Wizard form submit (step 4)
  document.getElementById('wizard-form')?.addEventListener('submit', e => {
    e.preventDefault();
    saveWizardStep(4);
    Storage.saveProfile(state.profile);
    showToast('Profile saved! Now generate your plan.');
    setState({ view: 'configure' });
  });

  // Skill level radio → show/hide step selector
  document.querySelectorAll('[name^="skill_level_"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const id = radio.name.replace('skill_level_', '');
      const stepEl = document.getElementById(`step-select-${id}`);
      if (stepEl) {
        stepEl.classList.toggle('hidden', radio.value !== 'scaling');
      }
      // Update radio label active state
      radio.closest('.skill-level-select')?.querySelectorAll('.skill-radio').forEach(l => l.classList.remove('active'));
      radio.closest('label')?.classList.add('active');
    });
  });

  // Goal card selection
  document.querySelectorAll('.goal-card input').forEach(r => {
    r.addEventListener('change', () => {
      document.querySelectorAll('.goal-card').forEach(c => c.classList.remove('active'));
      r.closest('.goal-card')?.classList.add('active');
    });
  });

  // Skill target checkboxes
  document.querySelectorAll('.tag-checkbox input').forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = document.querySelectorAll('.tag-checkbox input:checked').length;
      if (checked > 3) { cb.checked = false; return; }
      cb.closest('.tag-checkbox')?.classList.toggle('active', cb.checked);
    });
  });

  // Toggle buttons (plan configure)
  document.querySelectorAll('.btn-group').forEach(group => {
    group.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const hiddenInput = group.parentElement.querySelector('input[type=hidden]');
        if (hiddenInput) hiddenInput.value = btn.dataset.value;
      });
    });
  });

  // Configure form submit
  document.getElementById('configure-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const params = {
      daysPerWeek:   parseInt(fd.get('daysPerWeek')),
      sessionLength: parseInt(fd.get('sessionLength')),
      durationWeeks: parseInt(fd.get('durationWeeks')),
      startDate:     fd.get('startDate'),
    };
    const profile = state.profile || buildEmptyProfile();
    const plan = Generator.generate(profile, params);
    Storage.savePlan(plan);
    showToast('Plan generated! 🎉');
    setState({ plan, view: 'plan', selectedWeek: 0, selectedDate: plan.weeks[0]?.days[0]?.date || null, lastParams: params });
  });

  // Week navigation
  document.getElementById('btn-prev-week')?.addEventListener('click', () => {
    setState({ selectedWeek: Math.max(0, state.selectedWeek - 1) });
  });
  document.getElementById('btn-next-week')?.addEventListener('click', () => {
    setState({ selectedWeek: Math.min(state.plan.weeks.length - 1, state.selectedWeek + 1) });
  });

  // Export / Import
  document.getElementById('btn-export')?.addEventListener('click', () => Storage.exportJSON());
  document.getElementById('import-input')?.addEventListener('change', async e => {
    if (!e.target.files[0]) return;
    try {
      await Storage.importJSON(e.target.files[0]);
      state.profile = Storage.loadProfile();
      state.plan    = Storage.loadPlan();
      showToast('Backup restored!');
      render();
    } catch (err) {
      showToast('Import failed: ' + err.message, 'error');
    }
  });

  // Print
  document.getElementById('btn-print')?.addEventListener('click', () => window.print());
}

// ─── WIZARD SAVE ─────────────────────────────────────────────────────────────
function saveWizardStep(step) {
  const form = document.getElementById('wizard-form');
  if (!form) return;
  const fd = new FormData(form);
  if (!state.profile) state.profile = {};

  if (step === 1) {
    state.profile.strength = {};
    STRENGTH_MOVEMENTS.forEach(m => {
      const val = parseFloat(fd.get(`strength_${m.id}`));
      if (!isNaN(val) && val > 0) state.profile.strength[m.id] = val;
    });
  }
  if (step === 2) {
    state.profile.endurance = {};
    ENDURANCE_BENCHMARKS.forEach(b => {
      const val = fd.get(`endurance_${b.id}`);
      if (val) state.profile.endurance[b.id] = val;
    });
  }
  if (step === 3) {
    state.profile.skills = {};
    Object.keys(SKILL_PROGRESSIONS).forEach(id => {
      const level = fd.get(`skill_level_${id}`);
      const stepVal = parseInt(fd.get(`skill_step_${id}`)) || 0;
      if (level) state.profile.skills[id] = { level, step: stepVal };
    });
  }
  if (step === 4) {
    const primary = fd.get('goal_primary');
    const skillTargets = Object.keys(SKILL_PROGRESSIONS)
      .filter(id => fd.get(`skill_target_${id}`));
    const strengthTargets = STRENGTH_MOVEMENTS.slice(0, 4)
      .map(m => ({ lift: m.id, weight: parseFloat(fd.get(`str_target_${m.id}`)) || 0 }))
      .filter(t => t.weight > 0);
    state.profile.goals = { primary, skillTargets, strengthTargets };
  }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function findDayInPlan(plan, date) {
  for (const week of plan.weeks) {
    const day = week.days.find(d => d.date === date);
    if (day) return day;
  }
  return null;
}

function findWeekIndexForDate(plan, date) {
  return plan.weeks.findIndex(w => w.days.some(d => d.date === date));
}

function findCurrentWeek(plan, today) {
  const idx = plan.weeks.findIndex(w =>
    w.days.some(d => d.date >= today)
  );
  return idx >= 0 ? idx + 1 : plan.weeks.length;
}

function buildEmptyProfile() {
  return { strength: {}, endurance: {}, skills: {}, goals: { primary: 'general', skillTargets: [], strengthTargets: [] } };
}

function getDOW(dateStr) {
  return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(dateStr + 'T12:00:00').getDay()];
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function formatShortDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
