import { head, put } from '@vercel/blob';
import { createDefaultAdminDataState, normalizeAdminDataState } from '@/lib/server/persistence/adapter';
import type { PersistenceAdapter } from '@/lib/server/persistence/adapter';

function isNotFoundError(error: unknown) {
  return error instanceof Error && /404|not found|does not exist/i.test(error.message);
}

export function createBlobPersistenceAdapter(pathname: string, token: string): PersistenceAdapter {
  return {
    async loadState() {
      try {
        const blob = await head(pathname, { token });
        const response = await fetch(blob.downloadUrl, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Unable to load Blob persistence state (${response.status}).`);
        }

        const parsed = (await response.json()) as Record<string, unknown>;
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
        addRandomSuffix: false,
        contentType: 'application/json',
        token
      });
    }
  };
}
