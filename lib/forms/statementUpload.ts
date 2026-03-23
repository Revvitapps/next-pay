export const acceptedStatementFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
export const maxStatementFileSizeBytes = 8 * 1024 * 1024;

export type StatementExtractedData = {
  totalVolume: string | null;
  effectiveRate: string | null;
  interchangeFees: string | null;
  processorMarkup: string | null;
  monthlyFees: string | null;
  gatewayFees: string | null;
  estimatedSavingsOpportunity: string | null;
};

export const emptyStatementExtractedData: StatementExtractedData = {
  totalVolume: null,
  effectiveRate: null,
  interchangeFees: null,
  processorMarkup: null,
  monthlyFees: null,
  gatewayFees: null,
  estimatedSavingsOpportunity: null
};

export function validateStatementFile(file: File | null): string | null {
  if (!file) return 'Please upload your latest merchant statement.';
  if (!acceptedStatementFileTypes.includes(file.type)) {
    return 'Upload a PDF, JPG, or PNG file.';
  }
  if (file.size > maxStatementFileSizeBytes) {
    return 'File is too large. Please upload a file under 8MB.';
  }
  return null;
}

export async function fileToDataUrl(input: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
        return;
      }
      reject(new Error('Unable to read file.'));
    };
    reader.onerror = () => reject(new Error('Unable to read file.'));
    reader.readAsDataURL(input);
  });
}
