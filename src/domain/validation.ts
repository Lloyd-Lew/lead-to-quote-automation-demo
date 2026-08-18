import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(2).max(120),
  teamSize: z.number().int().min(1).max(10000),
  monthlyBudgetUsd: z.number().int().min(0).max(1000000),
  urgencyDays: z.number().int().min(1).max(365),
  interest: z.enum(["crm", "automation", "integration", "ai-operations"]),
  currentChallenge: z.string().trim().min(10).max(1000),
});
