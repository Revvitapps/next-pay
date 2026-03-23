import { head, put } from '@vercel/blob';

const ACCEPTED_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png']);
const MAX_BYTES = 8 * 1024 * 1024;

export type StoredStatementFile = {
  storageReference: string;
  contentType: string;
  fileSize: number;
  uploadedAt: string;
  originalFileName: string;
};

function parseDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    throw new Error('Invalid file payload.');
  }

  const contentType = match[1];
  const base64 = match[2];
  const buffer = Buffer.from(base64, 'base64');
  return { contentType, buffer };
}

export function validateStatementFileInput(file: {
  name?: string;
  type?: string;
  size?: number;
  dataUrl?: string;
}) {
  if (!file.name || !file.type || typeof file.size !== 'number' || !file.dataUrl) {
    return { ok: false as const, error: 'Missing statement file fields.' };
  }

  if (!ACCEPTED_TYPES.has(file.type)) {
    return { ok: false as const, error: 'Unsupported file type. Upload PDF, JPG, or PNG.' };
  }

  if (file.size <= 0 || file.size > MAX_BYTES) {
    return { ok: false as const, error: 'Invalid file size. Max supported size is 8MB.' };
  }

  return { ok: true as const };
}

export async function storeStatementFile(params: {
  statementId: string;
  file: {
    name: string;
    type: string;
    size: number;
    dataUrl: string;
  };
}): Promise<StoredStatementFile> {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) {
    throw new Error('Blob storage token is not configured.');
  }

  const parsed = parseDataUrl(params.file.dataUrl);

  if (parsed.contentType !== params.file.type) {
    throw new Error('File MIME mismatch.');
  }

  const pathname = `statements/${params.statementId}/${Date.now()}-${params.file.name.replace(/\s+/g, '-').toLowerCase()}`;

  const result = await put(pathname, parsed.buffer, {
    access: 'private',
    contentType: params.file.type,
    addRandomSuffix: false,
    token
  });

  return {
    storageReference: result.pathname,
    contentType: params.file.type,
    fileSize: params.file.size,
    uploadedAt: new Date().toISOString(),
    originalFileName: params.file.name
  };
}

export async function getSignedStatementDownloadUrl(storageReference: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return null;

  try {
    const info = await head(storageReference, { token });
    return info.downloadUrl ?? null;
  } catch (error) {
    console.error('[blob_signed_url_error]', error);
    return null;
  }
}
