/**
 * Voyager 1 — Central Mission State Management Engine
 * 
 * Centralized, reactive state store across all pages and modules:
 * - Selected engineering role
 * - Assigned tasks & submissions
 * - Completed tasks
 * - Spacecraft assembly stages & sequence
 * - Selected component inspection
 * - Engineering trade-off decisions
 * - Laboratory experimental results (Data, Code, AI/ML)
 * - Stage unlock states & calculated overall progress
 * - Persistence via MissionStorage
 */

import { MissionStorage } from './storage.js';
import { ProgressCalculator } from './progress.js';
import { UnlockEngine } from './unlock-engine.js';
import { ENGINEERING_ROLES } from '../tasks/roles-data.js';
import { TaskEngine } from '../tasks/task-engine.js';

export const DEFAULT_STATE = {
  version: 1,
  selectedRole: null, // roleId string
  assignedTasks: [], // task IDs
  completedTasks: [], // task IDs
  taskSubmissions: {}, // { [taskId]: { answer, passed, feedback, timestamp } }
  selectedComponentId: 'comp-bus',
  assemblyStages: {
    stage1: false,
    stage2: false,
    stage3: false,
    stage4: false,
    stage5: false,
    stage6: false
  },
  currentAssemblyStage: 1,
  decisions: {}, // { [decisionId]: { choiceId, passed, consequences, timestamp } }
  dataLab: {
    selectedDataset: 'voyager1-trajectory',
    filterSubsystem: 'all',
    calculatedStats: null,
    completed: false
  },
  codeChallenges: {}, // { [challengeId]: { passed, code, testResults, timestamp } }
  aiMlSimulation: {
    threshold: 2.5,
    trained: false,
    results: null,
    completed: false
  },
  mathLab: {
    exercises: {},
    completed: false
  },
  graphLab: {
    tasks: {},
    completed: false
  },
  customProposals: [], // [ { id, title, subsystem, proposalText, justification, verdict, ... } ]
  unlockedStages: ['stage1'],
  overallProgress: 0,
  progressBreakdown: {},
  missionStatus: 'not-started', // 'not-started' | 'in-progress' | 'completed'
  candidateId: 'JPL-MJS77-1977',
  startedAt: null,
  completedAt: null
};

class MissionStateStore {
  constructor() {
    this.listeners = new Set();
    this.state = MissionStorage.loadState(DEFAULT_STATE);

    // Initial recalculation of progress
    this.recalculateProgress(false);
  }

  /**
   * Get current state snapshot
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Subscribe to state mutations
   * @param {Function} listener
   * @returns {Function} unsubscribe function
   */
  subscribe(listener) {
    if (typeof listener === 'function') {
      this.listeners.add(listener);
      // Immediately call with current state
      try {
        listener(this.getState());
      } catch (err) {
        console.error('[MissionStateStore] Listener error on initial call:', err);
      }
    }
    return () => this.listeners.delete(listener);
  }

  /**
   * Emit state change to all listeners and save
   */
  notify() {
    const snapshot = this.getState();
    MissionStorage.saveState(snapshot);
    for (const listener of this.listeners) {
      try {
        listener(snapshot);
      } catch (err) {
        console.error('[MissionStateStore] Listener error during notify:', err);
      }
    }
  }

  /**
   * Recalculate progress and update mission status
   */
  recalculateProgress(shouldNotify = true) {
    const { totalProgress, breakdown } = ProgressCalculator.calculate(this.state);
    this.state.overallProgress = totalProgress;
    this.state.progressBreakdown = breakdown;

    if (totalProgress > 0 && this.state.missionStatus === 'not-started') {
      this.state.missionStatus = 'in-progress';
      if (!this.state.startedAt) this.state.startedAt = new Date().toISOString();
    }

    if (shouldNotify) {
      this.notify();
    }
  }

  /**
   * Select Engineering Role & Assign Tasks
   */
  selectRole(roleId) {
    const role = ENGINEERING_ROLES.find(r => r.id === roleId);
    if (!role) return false;

    this.state.selectedRole = roleId;
    this.state.assignedTasks = [...role.assignedTaskIds];
    
    // Clear completed tasks if switching roles to maintain integrity
    // Keep assembly and labs intact
    if (this.state.missionStatus === 'not-started') {
      this.state.missionStatus = 'in-progress';
      this.state.startedAt = new Date().toISOString();
    }

    this.recalculateProgress(true);
    return true;
  }

  /**
   * Submit and Validate a Task
   */
  submitTask(taskId, answer) {
    const evaluation = TaskEngine.evaluateSubmission(taskId, answer);
    
    this.state.taskSubmissions[taskId] = {
      answer,
      passed: evaluation.passed,
      feedback: evaluation.feedback,
      explanation: evaluation.explanation,
      remediation: evaluation.remediation || null,
      timestamp: new Date().toISOString()
    };

    if (evaluation.passed) {
      if (!this.state.completedTasks.includes(taskId)) {
        this.state.completedTasks.push(taskId);
      }
    }

    this.recalculateProgress(true);
    return evaluation;
  }

  /**
   * Set Inspected Component
   */
  selectComponent(componentId) {
    this.state.selectedComponentId = componentId;
    this.notify();
  }

  /**
   * Attempt to Assemble a Stage
   */
  assembleStage(stageNum) {
    const unlockCheck = UnlockEngine.isAssemblyStageUnlocked(stageNum, this.state);
    if (!unlockCheck.unlocked) {
      return { success: false, reason: unlockCheck.reason };
    }

    const stageKey = `stage${stageNum}`;
    this.state.assemblyStages[stageKey] = true;
    
    // Unlock next stage if exists
    if (stageNum < 6) {
      const nextStageKey = `stage${stageNum + 1}`;
      if (!this.state.unlockedStages.includes(nextStageKey)) {
        this.state.unlockedStages.push(nextStageKey);
      }
      this.state.currentAssemblyStage = stageNum + 1;
    }

    this.recalculateProgress(true);
    return { success: true, reason: `Stage 0${stageNum} successfully integrated and qualified.` };
  }

  /**
   * Submit an Engineering Trade-off Decision
   */
  submitDecision(decisionId, choiceId, resultData) {
    this.state.decisions[decisionId] = {
      choiceId,
      passed: resultData.passed,
      title: resultData.title,
      consequences: resultData.consequences,
      historicalContext: resultData.historicalContext,
      timestamp: new Date().toISOString()
    };

    this.recalculateProgress(true);
    return true;
  }

  /**
   * Save or Update a Custom Engineering Proposal
   */
  saveCustomProposal(proposal) {
    if (!this.state.customProposals) {
      this.state.customProposals = [];
    }
    const idx = this.state.customProposals.findIndex(p => p.id === proposal.id);
    if (idx >= 0) {
      this.state.customProposals[idx] = { ...proposal, updatedAt: new Date().toISOString() };
    } else {
      this.state.customProposals.unshift({ ...proposal, createdAt: new Date().toISOString() });
    }
    this.notify();
    return true;
  }

  /**
   * Delete a Custom Engineering Proposal
   */
  deleteCustomProposal(proposalId) {
    if (!this.state.customProposals) return false;
    this.state.customProposals = this.state.customProposals.filter(p => p.id !== proposalId);
    this.notify();
    return true;
  }

  /**
   * Record Data Lab Analysis
   */
  recordDataLabResult(stats) {
    this.state.dataLab = {
      ...this.state.dataLab,
      calculatedStats: stats,
      completed: true,
      completedAt: new Date().toISOString()
    };

    this.recalculateProgress(true);
  }

  /**
   * Record Code Challenge Result
   */
  recordCodeChallenge(challengeId, result) {
    this.state.codeChallenges[challengeId] = {
      ...result,
      timestamp: new Date().toISOString()
    };

    this.recalculateProgress(true);
  }

  /**
   * Record AI/ML Simulation Result
   */
  recordAiMlResult(results) {
    this.state.aiMlSimulation = {
      ...this.state.aiMlSimulation,
      ...results,
      completed: true,
      completedAt: new Date().toISOString()
    };

    this.recalculateProgress(true);
  }

  /**
   * Record Math Lab Exercise
   */
  recordMathExercise(exerciseId, result) {
    this.state.mathLab = this.state.mathLab || { exercises: {}, completed: false };
    this.state.mathLab.exercises = this.state.mathLab.exercises || {};
    this.state.mathLab.exercises[exerciseId] = {
      ...result,
      timestamp: new Date().toISOString()
    };
    const solvedCount = Object.values(this.state.mathLab.exercises).filter(e => e && e.passed).length;
    if (solvedCount >= 3) {
      this.state.mathLab.completed = true;
    }
    this.recalculateProgress(true);
  }

  /**
   * Record Graph Lab Interpretation Task
   */
  recordGraphTask(taskId, result) {
    this.state.graphLab = this.state.graphLab || { tasks: {}, completed: false };
    this.state.graphLab.tasks = this.state.graphLab.tasks || {};
    this.state.graphLab.tasks[taskId] = {
      ...result,
      timestamp: new Date().toISOString()
    };
    const solvedCount = Object.values(this.state.graphLab.tasks).filter(t => t && t.passed).length;
    if (solvedCount >= 2) {
      this.state.graphLab.completed = true;
    }
    this.recalculateProgress(true);
  }

  /**
   * Mark Final Mission Completed if eligible
   */
  finalizeMission() {
    const eligibility = UnlockEngine.isMissionCompletionEligible(this.state);
    if (!eligibility.eligible) {
      return { success: false, details: eligibility.checks };
    }

    this.state.missionStatus = 'completed';
    this.state.completedAt = new Date().toISOString();
    this.state.overallProgress = 100;
    this.notify();
    return { success: true, details: eligibility.checks };
  }

  /**
   * Reset Entire Mission State
   */
  resetMission() {
    MissionStorage.clearState();
    this.state = {
      ...DEFAULT_STATE,
      candidateId: MissionStorage.generateCandidateId()
    };
    this.recalculateProgress(true);
    return true;
  }
}

export const missionStore = new MissionStateStore();
