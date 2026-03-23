import fs from 'node:fs';
import path from 'node:path';
import type { AdminDataState } from '@/lib/admin/types';
import type { PersistenceAdapter } from '@/lib/server/persistence/adapter';

const defaultState: AdminDataState = {
  initializedAt: null,
  leads: [],
  statements: [],
  quotes: [],
  notes: [],
  statusHistory: [],
  auditLogs: []
};

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function parseState(raw: string): AdminDataState {
  try {
    const parsed = JSON.parse(raw) as Partial<AdminDataState>;
    return {
      initializedAt: parsed.initializedAt ?? null,
      leads: parsed.leads ?? [],
      statements: parsed.statements ?? [],
      quotes: parsed.quotes ?? [],
      notes: parsed.notes ?? [],
      statusHistory: parsed.statusHistory ?? [],
      auditLogs: parsed.auditLogs ?? []
    };
  } catch {
    return defaultState;
  }
}

export function createFilePersistenceAdapter(filePath: string): PersistenceAdapter {
  ensureDir(filePath);

  return {
    loadState() {
      if (!fs.existsSync(filePath)) {
        return defaultState;
      }

      const raw = fs.readFileSync(filePath, 'utf8');
      return parseState(raw);
    },
    saveState(state) {
      ensureDir(filePath);
      const tmpPath = `${filePath}.tmp`;
      fs.writeFileSync(tmpPath, JSON.stringify(state, null, 2), 'utf8');
      fs.renameSync(tmpPath, filePath);
    }
  };
}
