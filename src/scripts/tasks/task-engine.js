/**
 * Voyager 1 — Task Validation & Completion Engine
 * 
 * Evaluates real user submissions against defined rules.
 * Generates technical feedback explaining why an answer is correct or incorrect.
 * Updates state only upon genuine validation.
 */

import { ENGINEERING_TASKS } from './task-data.js';

export class TaskEngine {
  /**
   * Find task by ID
   */
  static getTaskById(taskId) {
    return ENGINEERING_TASKS.find(t => t.id === taskId) || null;
  }

  /**
   * Get all tasks assigned to a specific role
   */
  static getTasksByRole(roleId) {
    if (!roleId) return [];
    return ENGINEERING_TASKS.filter(t => t.roleId === roleId || (roleId === 'science-payload' && t.roleId === 'science-instrumentation'));
  }

  /**
   * Evaluate a user's task submission
   * @param {string} taskId
   * @param {any} submission (option id or numeric value)
   * @returns {{ passed: boolean, feedback: string, explanation: string, task: object }}
   */
  static evaluateSubmission(taskId, submission) {
    const task = this.getTaskById(taskId);
    if (!task) {
      return {
        passed: false,
        feedback: 'Evaluation Error: Task specification not found in flight database.',
        explanation: '',
        task: null
      };
    }

    if (!submission) {
      return {
        passed: false,
        feedback: 'Submission Incomplete: No response or engineering calculation provided.',
        explanation: task.hint || '',
        task
      };
    }

    if (task.type === 'choice') {
      const isCorrect = submission === task.correctAnswerId;
      if (isCorrect) {
        return {
          passed: true,
          feedback: 'VALIDATION SUCCESSFUL // JPL ENGINEERING SPECIFICATION VERIFIED',
          explanation: task.explanation,
          remediation: task.remediation || null,
          task
        };
      } else {
        return {
          passed: false,
          feedback: 'VALIDATION FAILED // CALCULATION OUT OF SPECIFICATION',
          explanation: `Your submitted choice did not match historical flight telemetry. ${task.hint}`,
          remediation: task.remediation || null,
          task
        };
      }
    }

    return {
      passed: false,
      feedback: 'Unrecognized task validation schema.',
      explanation: '',
      task
    };
  }
}
