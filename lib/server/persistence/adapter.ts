import type { AdminDataState } from '@/lib/admin/types';

export type PersistenceAdapter = {
  loadState: () => AdminDataState;
  saveState: (state: AdminDataState) => void;
};
