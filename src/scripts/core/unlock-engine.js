/**
 * Voyager 1 — Unlock Dependency & Stage Gating Engine
 * 
 * Manages prerequisites and unlock conditions across:
 * - Tasks (prerequisite tasks)
 * - Assembly Stages (stage dependencies and task clearances)
 * - Laboratories (role selection and assembly milestone clearances)
 * - Final Mission Evaluation
 */

export class UnlockEngine {
  /**
   * Determine whether an assembly stage is unlocked
   */
  static isAssemblyStageUnlocked(stageNum, state) {
    if (stageNum === 1) return { unlocked: true, reason: 'Initial stage unlocked.' };
    
    // Stage must be selected role
    if (!state.selectedRole) {
      return { unlocked: false, reason: 'Requires an Engineering Role assignment in Mission Control.' };
    }

    // Previous stage must be assembled
    const prevKey = `stage${stageNum - 1}`;
    if (!state.assemblyStages[prevKey]) {
      return { unlocked: false, reason: `Requires completion of Assembly Stage 0${stageNum - 1}.` };
    }

    // Additional checks for advanced stages
    if (stageNum >= 3) {
      // Must have completed at least 1 task
      if (!state.completedTasks || state.completedTasks.length < 1) {
        return { unlocked: false, reason: 'Requires at least 1 validated Engineering Task completion.' };
      }
    }

    if (stageNum >= 5) {
      // Must have resolved at least 1 engineering decision
      if (!state.decisions || Object.keys(state.decisions).length < 1) {
        return { unlocked: false, reason: 'Requires at least 1 resolved Trade-off Decision.' };
      }
    }

    return { unlocked: true, reason: 'All prerequisites satisfied.' };
  }

  /**
   * Determine whether a task is unlocked based on dependencies
   */
  static isTaskUnlocked(task, state) {
    if (!task) return { unlocked: false, reason: 'Unknown task.' };

    if (!state.selectedRole) {
      return { unlocked: false, reason: 'Select an Engineering Role first.' };
    }

    if (task.dependencies && task.dependencies.length > 0) {
      const completed = state.completedTasks || [];
      for (const depId of task.dependencies) {
        if (!completed.includes(depId)) {
          return { unlocked: false, reason: `Requires prerequisite task [${depId}] completion.` };
        }
      }
    }

    return { unlocked: true, reason: 'Task available for execution.' };
  }

  /**
   * Determine whether laboratories are unlocked
   */
  static isLabUnlocked(labKey, state) {
    if (!state.selectedRole) {
      return { unlocked: false, reason: 'Requires Role Assignment.' };
    }

    switch (labKey) {
      case 'datalab':
        // Data Lab requires at least Stage 1 assembled
        return state.assemblyStages.stage1
          ? { unlocked: true, reason: 'Clearance granted.' }
          : { unlocked: false, reason: 'Requires Stage 01 Bus Assembly completion.' };
      case 'codelab':
        // Code Lab requires Stage 2 (Antenna) assembled
        return state.assemblyStages.stage2
          ? { unlocked: true, reason: 'Clearance granted.' }
          : { unlocked: false, reason: 'Requires Stage 02 High-Gain Antenna alignment.' };
      case 'aimllab':
        // AI/ML simulation requires at least 2 completed tasks
        return (state.completedTasks && state.completedTasks.length >= 2)
          ? { unlocked: true, reason: 'Clearance granted.' }
          : { unlocked: false, reason: 'Requires 2 completed Engineering Tasks.' };
      default:
        return { unlocked: true, reason: 'Unlocked' };
    }
  }

  /**
   * Determine whether final mission completion review is unlocked
   */
  static isMissionCompletionEligible(state) {
    const checks = [
      {
        id: 'role',
        label: 'Engineering Role Assigned',
        passed: !!state.selectedRole,
        detail: state.selectedRole ? `Assigned as [${state.selectedRole}]` : 'No role selected'
      },
      {
        id: 'tasks',
        label: 'Role Engineering Tasks Validated (All assigned)',
        passed: (state.assignedTasks && state.assignedTasks.length > 0) &&
                (state.completedTasks && state.completedTasks.length >= state.assignedTasks.length),
        detail: `${(state.completedTasks || []).length} of ${(state.assignedTasks || []).length} tasks completed`
      },
      {
        id: 'assembly',
        label: 'Full Spacecraft Assembly Completed (6/6 Stages)',
        passed: Object.values(state.assemblyStages || {}).filter(Boolean).length === 6,
        detail: `${Object.values(state.assemblyStages || {}).filter(Boolean).length} of 6 stages completed`
      },
      {
        id: 'decisions',
        label: 'Engineering Trade-Off Dilemmas Resolved (4/4)',
        passed: Object.keys(state.decisions || {}).length >= 4,
        detail: `${Object.keys(state.decisions || {}).length} of 4 decisions resolved`
      },
      {
        id: 'labs',
        label: 'Scientific Laboratory Validation (At least 1 Lab completed)',
        passed: (state.dataLab && state.dataLab.completed) ||
                (state.codeChallenges && Object.values(state.codeChallenges).some(c => c && c.passed)) ||
                (state.aiMlSimulation && state.aiMlSimulation.completed),
        detail: 'Laboratory verification record on file'
      }
    ];

    const allPassed = checks.every(c => c.passed);
    return {
      eligible: allPassed,
      checks
    };
  }
}
