import { randomUUID } from "node:crypto";
import type { CrmRecord, LeadInput, Qualification } from "../domain/types.js";

export interface CrmAdapter {
  createLead(lead: LeadInput, qualification: Qualification): Promise<CrmRecord>;
}

export class InMemoryCrmAdapter implements CrmAdapter {
  private readonly records = new Map<string, CrmRecord>();
  async createLead(lead: LeadInput, qualification: Qualification): Promise<CrmRecord> {
    const record: CrmRecord = {
      id: `crm_${randomUUID()}`,
      createdAt: new Date().toISOString(),
      lead,
      qualification,
    };
    this.records.set(record.id, record);
    return record;
  }
}
