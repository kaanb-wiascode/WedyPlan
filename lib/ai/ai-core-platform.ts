import { 
    AiGenerationOptions, 
    AiTextResult, 
    VendorMatchCriteria, 
    VendorMatchResult,
    BudgetAnalysisRequest,
    BudgetAnalysisResult,
    TimelineGenerationRequest,
    TimelineGenerationResult,
    DocumentReaderRequest,
    DocumentReaderResult
  } from '@/types/ai-core';
  import { AiProviderFactory } from './providers/provider-abstraction';
  import { VendorMatchEngine } from './engines/vendor-match-engine';
  import { BudgetAnalysisEngine } from './engines/budget-analysis-engine';
  import { TimelineGeneratorEngine } from './engines/timeline-generator-engine';
  import { DocumentReaderEngine } from './engines/document-reader-engine';
  
  export class AiCorePlatform {
    /**
     * Universal Text Generation
     */
    static async generateText(options: AiGenerationOptions): Promise<AiTextResult> {
      const adapter = AiProviderFactory.getAdapter(options.provider);
      return adapter.generateText(options);
    }
  
    /**
     * Universal Structured JSON Generation
     */
    static async generateStructuredData<T>(options: AiGenerationOptions): Promise<T> {
      const adapter = AiProviderFactory.getAdapter(options.provider);
      return adapter.generateStructuredJson<T>(options);
    }
  
    /**
     * Dedicated Vendor Matching
     */
    static async matchVendors(criteria: VendorMatchCriteria): Promise<VendorMatchResult[]> {
      return VendorMatchEngine.executeMatch(criteria);
    }
  
    /**
     * Dedicated Budget Analysis
     */
    static analyzeBudget(request: BudgetAnalysisRequest): BudgetAnalysisResult {
      return BudgetAnalysisEngine.analyze(request);
    }
  
    /**
     * Dedicated Timeline Schedule Generation
     */
    static generateTimeline(request: TimelineGenerationRequest): TimelineGenerationResult {
      return TimelineGeneratorEngine.generate(request);
    }
  
    /**
     * Dedicated Contract & Document Structured Extraction
     */
    static async readDocument(request: DocumentReaderRequest): Promise<DocumentReaderResult> {
      return DocumentReaderEngine.extractStructuredData(request);
    }
  }