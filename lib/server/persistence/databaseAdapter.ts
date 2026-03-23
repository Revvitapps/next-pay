import type { PersistenceAdapter } from '@/lib/server/persistence/adapter';

export function createDatabasePersistenceAdapter(): PersistenceAdapter {
  throw new Error(
    'DATABASE_URL is configured but no database adapter is wired yet. TODO(db): add provider implementation and migrations.'
  );
}
