import express, { type NextFunction, type Request, type Response } from "express";
import { InMemoryCrmAdapter } from "../adapters/crmAdapter.js";
import { LeadWorkflow } from "../application/leadWorkflow.js";
import { leadSchema } from "../domain/validation.js";
import { JsonAuditLogger, type AuditWriter } from "../logging/auditLogger.js";

interface AppDependencies {
  workflow?: LeadWorkflow;
  audit?: AuditWriter;
}

export function createApp(dependencies: AppDependencies = {}) {
  const audit = dependencies.audit ?? new JsonAuditLogger();
  const workflow = dependencies.workflow ?? new LeadWorkflow(new InMemoryCrmAdapter(), audit);
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json({ limit: "16kb", strict: true }));
  app.use((_request, response, next) => {
    response.setHeader("content-security-policy", "default-src 'none'");
    response.setHeader("x-content-type-options", "nosniff");
    response.setHeader("referrer-policy", "no-referrer");
    next();
  });
  app.get("/health", (_request, response) =>
    response.status(200).json({ status: "ok", service: "lead-to-quote-automation-demo" }),
  );
  app.post("/v1/leads", async (request, response, next) => {
    try {
      response.status(201).json(await workflow.run(leadSchema.parse(request.body)));
    } catch (error) {
      next(error);
    }
  });
  app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof Error && "issues" in error) {
      response
        .status(422)
        .json({ error: "validation_failed", message: "Lead payload is invalid." });
      return;
    }
    audit.write("request.failed", { errorType: "internal_error" });
    response.status(500).json({ error: "internal_error", message: "Unexpected server error." });
  });
  return app;
}
