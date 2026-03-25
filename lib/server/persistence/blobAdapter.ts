import { BlobNotFoundError, get, put } from '@vercel/blob';
import { createDefaultAdminDataState, normalizeAdminDataState } from '@/lib/server/persistence/adapter';
import type { PersistenceAdapter } from '@/lib/server/persistence/adapter';

function isNotFoundError(error: unknown) {
  return error instanceof BlobNotFoundError || (error instanceof Error && /404|not found|does not exist/i.test(error.message));
}

async function streamToString(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let text = '';

  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    text += decoder.decode(chunk.value, { stream: true });
  }

  text += decoder.decode();
  return text;
}

export function createBlobPersistenceAdapter(pathname: string, token: string): PersistenceAdapter {
  return {
    async loadState() {
      try {
        const response = await get(pathname, {
          access: 'private',
          token,
          useCache: false
        });

        if (!response) {
          return createDefaultAdminDataState();
        }

        if (response.statusCode !== 200 || !response.stream) {
          throw new Error(`Unable to load Blob persistence state (${response.statusCode}).`);
        }

        const parsed = JSON.parse(await streamToString(response.stream)) as Record<string, unknown>;
        return normalizeAdminDataState(parsed);
      } catch (error) {
        if (isNotFoundError(error)) {
          return createDefaultAdminDataState();
        }

        console.error('[blob_persistence_load_error]', error);
        throw error;
      }
    },
    async saveState(state) {
      await put(pathname, JSON.stringify(state, null, 2), {
        access: 'private',
        allowOverwrite: true,
        addRandomSuffix: false,
        contentType: 'application/json',
        token
      });
    }
  };
}
