/**
 * Voyager 1 — Progress Calculation & Synchronization Engine
 * 
 * Computes overall mission progress based on actual validated completions:
 * - Role & Task Completion: 35% weight
 * - Spacecraft Assembly Stages: 30% weight (6 stages, 5% each)
 * - Engineering Decisions: 15% weight (4 dilemmas)
 * - Scientific Laboratories (Data, Code, AI/ML): 20% weight (~6.67% each)
 * 
 * Strictly avoids hardcoded percentages.
 */

export class ProgressCalculator {
  static calculate(state) {
    if (!state) return { totalProgress: 0, breakdown: {} };

    // 1. Task Completion (35% total)
    const assigned = state.assignedTasks || [];
    const completed = state.completedTasks || [];
    const taskRatio = assigned.length > 0 ? (completed.length / assigned.length) : 0;
    const taskScore = Math.min(35, Math.round(taskRatio * 35));

    // 2. Assembly Stages (30% total - 6 stages)
    const assemblyStages = state.assemblyStages || {};
    const stagesCompleted = Object.values(assemblyStages).filter(Boolean).length;
    const assemblyScore = Math.min(30, Math.round((stagesCompleted / 6) * 30));

    // 3. Engineering Decisions (15% total - 4 trade-offs)
    const decisions = state.decisions || {};
    const decisionsCount = Object.keys(decisions).length;
    const decisionScore = Math.min(15, Math.round((decisionsCount / 4) * 15));

    // 4. Laboratories (20% total - Data Lab, Math Lab, Graph Lab, Code Lab, AI/ML Lab)
    let labCount = 0;
    if (state.dataLab && state.dataLab.completed) labCount += 1;
    if (state.mathLab && state.mathLab.completed) labCount += 1;
    if (state.graphLab && state.graphLab.completed) labCount += 1;
    if (state.codeChallenges) {
      const codePassed = Object.values(state.codeChallenges).filter(c => c && c.passed).length;
      if (codePassed >= 2) labCount += 1; // At least 2 coding challenges
    }
    if (state.aiMlSimulation && state.aiMlSimulation.completed) labCount += 1;
    const labScore = Math.min(20, Math.round((labCount / 3) * 20));

    const totalProgress = Math.min(100, taskScore + assemblyScore + decisionScore + labScore);

    return {
      totalProgress,
      breakdown: {
        tasks: { score: taskScore, max: 35, ratio: taskRatio, completedCount: completed.length, totalCount: assigned.length },
        assembly: { score: assemblyScore, max: 30, stagesCompleted, totalStages: 6 },
        decisions: { score: decisionScore, max: 15, decisionsCount, totalDecisions: 4 },
        labs: { score: labScore, max: 20, labCount, totalLabs: 5 }
      }
    };
  }
}
