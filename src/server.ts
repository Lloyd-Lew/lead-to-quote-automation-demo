import { createApp } from "./api/app.js";
import { readEnvironment } from "./config/env.js";

const environment = readEnvironment();
createApp().listen(environment.PORT, () =>
  process.stdout.write(
    `${JSON.stringify({ event: "server.started", port: environment.PORT, logLevel: environment.LOG_LEVEL })}\n`,
  ),
);
