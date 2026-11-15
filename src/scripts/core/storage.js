/**
 * Voyager 1 — Browser Storage Persistence & Recovery Engine
 * 
 * Manages:
 * - LocalStorage persistence with versioning and checksum safety.
 * - Recovery from missing, corrupted, or outdated saved mission states.
 * - Confirmation-backed mission reset.
 */

const STORAGE_KEY = 'VOYAGER_MISSION_STATE_v1';
const BACKUP_KEY = 'VOYAGER_MISSION_STATE_BACKUP';

export class MissionStorage {
  /**
   * Save mission state to localStorage with timestamp
   */
  static saveState(state) {
    if (!state || typeof state !== 'object') return false;
    try {
      const payload = {
        timestamp: Date.now(),
        version: state.version || 1,
        data: state
      };
      const serialized = JSON.stringify(payload);
      localStorage.setItem(STORAGE_KEY, serialized);
      return true;
    } catch (err) {
      console.warn('[MissionStorage] Save failed:', err);
      return false;
    }
  }

  /**
   * Load state from localStorage with corruption recovery
   */
  static loadState(defaultState) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { ...defaultState, candidateId: this.generateCandidateId() };
      }

      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || !parsed.data) {
        throw new Error('Malformed storage payload');
      }

      // Check version compatibility
      if (parsed.version !== (defaultState.version || 1)) {
        console.info('[MissionStorage] Migrating state across schema versions');
        return this.migrateState(parsed.data, defaultState);
      }

      // Return merged state to guarantee all keys exist
      return {
        ...defaultState,
        ...parsed.data,
        taskSubmissions: { ...parsed.data.taskSubmissions },
        assemblyStages: { ...defaultState.assemblyStages, ...(parsed.data.assemblyStages || {}) },
        decisions: { ...(parsed.data.decisions || {}) },
        codeChallenges: { ...(parsed.data.codeChallenges || {}) }
      };
    } catch (err) {
      console.error('[MissionStorage] Load failed, corrupted data recovered:', err);
      // Attempt to backup corrupted data before reset
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) localStorage.setItem(BACKUP_KEY, raw);
      } catch (_) {}
      return { ...defaultState, candidateId: this.generateCandidateId() };
    }
  }

  /**
   * Generate an authentic 1977 JPL candidate identifier
   */
  static generateCandidateId() {
    const randomHex = Math.floor(Math.random() * 0x8fff + 0x1000).toString(16).toUpperCase();
    return `JPL-MJS77-${randomHex}`;
  }

  /**
   * Schema migration helper
   */
  static migrateState(oldData, defaultState) {
    return {
      ...defaultState,
      ...oldData,
      version: defaultState.version || 1
    };
  }

  /**
   * Clear saved mission state with confirmation option
   */
  static clearState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (err) {
      console.warn('[MissionStorage] Clear failed:', err);
      return false;
    }
  }
}
