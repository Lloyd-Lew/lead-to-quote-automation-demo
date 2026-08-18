import { randomUUID } from "node:crypto";
export interface AuditWriter {
  write(event: string, fields: Record<string, unknown>): string;
}
export class JsonAuditLogger implements AuditWriter {
  write(event: string, fields: Record<string, unknown>): string {
    const id = `audit_${randomUUID()}`;
    process.stdout.write(
      `${JSON.stringify({ id, timestamp: new Date().toISOString(), event, ...fields })}\n`,
    );
    return id;
  }
}
