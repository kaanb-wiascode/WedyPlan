import { StateDiffResult } from '@/types/enterprise-audit';

export class DiffEngine {
  /**
   * Computes exact field-level diff between before and after states
   */
  static computeDiff(before: Record<string, any> = {}, after: Record<string, any> = {}): StateDiffResult {
    const addedKeys: string[] = [];
    const removedKeys: string[] = [];
    const changedKeys: Record<string, { before: unknown; after: unknown }> = {};

    const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

    allKeys.forEach((key) => {
      const valBefore = before[key];
      const valAfter = after[key];

      if (!(key in before) && key in after) {
        addedKeys.push(key);
      } else if (key in before && !(key in after)) {
        removedKeys.push(key);
      } else if (JSON.stringify(valBefore) !== JSON.stringify(valAfter)) {
        changedKeys[key] = { before: valBefore, after: valAfter };
      }
    });

    return {
      hasChanges: addedKeys.length > 0 || removedKeys.length > 0 || Object.keys(changedKeys).length > 0,
      addedKeys,
      removedKeys,
      changedKeys
    };
  }
}