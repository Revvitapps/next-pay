import fs from 'node:fs';
import path from 'node:path';
import { createDefaultAdminDataState, normalizeAdminDataState } from '@/lib/server/persistence/adapter';
import type { PersistenceAdapter } from '@/lib/server/persistence/adapter';

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function parseState(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    return normalizeAdminDataState(parsed);
  } catch {
    return createDefaultAdminDataState();
  }
}

export function createFilePersistenceAdapter(filePath: string): PersistenceAdapter {
  ensureDir(filePath);

  return {
    async loadState() {
      if (!fs.existsSync(filePath)) {
        return createDefaultAdminDataState();
      }

      const raw = fs.readFileSync(filePath, 'utf8');
      return parseState(raw);
    },
    async saveState(state) {
      ensureDir(filePath);
      const tmpPath = `${filePath}.tmp`;
      fs.writeFileSync(tmpPath, JSON.stringify(state, null, 2), 'utf8');
      fs.renameSync(tmpPath, filePath);
    }
  };
}
