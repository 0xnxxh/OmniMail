import { request } from '../../../shared/api/api-client'

export interface MailCredentialMigrationStatus {
  globalKeyConfigured: boolean
  globalKeyReady: boolean
  keyId: string | null
  total: number
  migrated: number
  pending: number
  providers: Array<{ provider: string; total: number; migrated: number; pending: number; legacyKeyReady: boolean }>
}

export interface MigrationCursor { field: number; afterId: string }
export interface MailCredentialMigrationBatch {
  cursor: MigrationCursor | null
  scanned: number
  migrated: number
  failed: number
  conflicts: number
  status: MailCredentialMigrationStatus
}

export const mailCredentialMigration = {
  status: () => request<MailCredentialMigrationStatus>('/api/admin/mail-credentials/migration'),
  batch: (keyId: string, cursor: MigrationCursor | null) => request<MailCredentialMigrationBatch>(
    '/api/admin/mail-credentials/migration', {
      method: 'POST', body: JSON.stringify({ confirm: true, keyId, cursor }), timeoutMs: 30_000,
    },
  ),
}
