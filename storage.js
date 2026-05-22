const KEYS = {
  PROFILE: 'cf_profile',
  PLAN:    'cf_plan',
};

const Storage = {
  saveProfile(profile) {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },
  loadProfile() {
    try { return JSON.parse(localStorage.getItem(KEYS.PROFILE)) || null; }
    catch { return null; }
  },
  savePlan(plan) {
    localStorage.setItem(KEYS.PLAN, JSON.stringify(plan));
  },
  loadPlan() {
    try { return JSON.parse(localStorage.getItem(KEYS.PLAN)) || null; }
    catch { return null; }
  },
  clearAll() {
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.PLAN);
  },
  exportJSON() {
    const data = {
      version: 1,
      exported: new Date().toISOString(),
      profile: Storage.loadProfile(),
      plan: Storage.loadPlan(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cf-plan-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
  importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.profile) Storage.saveProfile(data.profile);
          if (data.plan)    Storage.savePlan(data.plan);
          resolve(data);
        } catch { reject(new Error('Invalid backup file')); }
      };
      reader.onerror = () => reject(new Error('Could not read file'));
      reader.readAsText(file);
    });
  }
};
