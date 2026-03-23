import path from 'node:path';
import type { PersistenceAdapter } from '@/lib/server/persistence/adapter';
import { createDatabasePersistenceAdapter } from '@/lib/server/persistence/databaseAdapter';
import { createFilePersistenceAdapter } from '@/lib/server/persistence/fileAdapter';

let adapter: PersistenceAdapter | null = null;

export function getPersistenceAdapter(): PersistenceAdapter {
  if (adapter) return adapter;

  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (databaseUrl) {
    try {
      adapter = createDatabasePersistenceAdapter();
      return adapter;
    } catch (error) {
      console.warn('[persistence_adapter_fallback]', error);
    }
  }

  const filePath = process.env.ADMIN_DATA_FILE_PATH?.trim() || path.join(process.cwd(), 'data', 'admin-store.json');
  adapter = createFilePersistenceAdapter(filePath);
  return adapter;
}
