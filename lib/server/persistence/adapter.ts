import type { AdminDataState } from '@/lib/admin/types';

export function createDefaultAdminDataState(): AdminDataState {
  return {
    initializedAt: null,
    leads: [],
    statements: [],
    quotes: [],
    notes: [],
    statusHistory: [],
    auditLogs: []
  };
}

export function normalizeAdminDataState(state: Partial<AdminDataState> | null | undefined): AdminDataState {
  return {
    initializedAt: state?.initializedAt ?? null,
    leads: state?.leads ?? [],
    statements: state?.statements ?? [],
    quotes: state?.quotes ?? [],
    notes: state?.notes ?? [],
    statusHistory: state?.statusHistory ?? [],
    auditLogs: state?.auditLogs ?? []
  };
}

export type PersistenceAdapter = {
  loadState: () => Promise<AdminDataState>;
  saveState: (state: AdminDataState) => Promise<void>;
};
