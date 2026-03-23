export type StatementExtractionOutput = {
  rawText: string;
  extractionMethod: 'pdf-text' | 'ocr-image' | 'mock' | 'unknown';
  pageCount: number;
  warnings: string[];
  extractionConfidence: number;
  rawMetadata: Record<string, unknown>;
};

export type StatementExtractor = {
  extract: (input: { fileBuffer: Buffer; contentType: string; fileName: string }) => Promise<StatementExtractionOutput>;
};

class MockStatementExtractor implements StatementExtractor {
  async extract(input: { fileBuffer: Buffer; contentType: string; fileName: string }): Promise<StatementExtractionOutput> {
    const byteLength = input.fileBuffer.byteLength;
    const isPdf = input.contentType === 'application/pdf';

    return {
      rawText: [
        `FILE_NAME: ${input.fileName}`,
        `CONTENT_TYPE: ${input.contentType}`,
        `BYTES: ${byteLength}`,
        'PROCESSOR: Unknown Processor',
        'TOTAL_VOLUME: 0',
        'TRANSACTION_COUNT: 0',
        'EFFECTIVE_RATE: 0'
      ].join('\n'),
      extractionMethod: isPdf ? 'pdf-text' : 'ocr-image',
      pageCount: 1,
      warnings: ['Using mock extractor. Configure OCR provider for production extraction.'],
      extractionConfidence: 0.35,
      rawMetadata: {
        provider: 'mock',
        isPdf,
        TODO: 'Plug OCR/text provider here.'
      }
    };
  }
}

let extractor: StatementExtractor | null = null;

export function getStatementExtractor(): StatementExtractor {
  if (extractor) return extractor;

  // TODO(ocr-provider): swap mock extractor for provider-backed implementation.
  extractor = new MockStatementExtractor();
  return extractor;
}
