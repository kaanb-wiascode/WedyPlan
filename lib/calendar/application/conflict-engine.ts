import { ConflictCheckRequest, ConflictCheckResult } from '@/types/enterprise-calendar';

export class ConflictEngine {
  /**
   * Evaluates overlaps considering start, end, and travel time buffers
   */
  static hasTimeOverlap(
    reqStart: Date,
    reqEnd: Date,
    reqBufferBeforeMin = 0,
    reqBufferAfterMin = 0,
    existStart: Date,
    existEnd: Date,
    existBufferBeforeMin = 0,
    existBufferAfterMin = 0
  ): boolean {
    // Effective Request Range
    const effReqStart = new Date(reqStart.getTime() - reqBufferBeforeMin * 60000);
    const effReqEnd = new Date(reqEnd.getTime() + reqBufferAfterMin * 60000);

    // Effective Existing Range
    const effExistStart = new Date(existStart.getTime() - existBufferBeforeMin * 60000);
    const effExistEnd = new Date(existEnd.getTime() + existBufferAfterMin * 60000);

    return effReqStart < effExistEnd && effReqEnd > effExistStart;
  }
}