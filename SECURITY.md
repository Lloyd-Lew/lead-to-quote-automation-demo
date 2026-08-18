# Security Policy

This client-safe technical demonstrator must never contain production credentials, customer records, raw workflow exports, private URLs, or client configuration.

Do not create a public issue for a suspected security or privacy concern. Email [letsconnect@companyconnect.tech](mailto:letsconnect@companyconnect.tech?subject=Security%20concern%20-%20Lead-to-Quote%20Demonstrator) with the affected public path or URL and a concise reproduction description. The service validates input, limits JSON body size, avoids CORS by default, emits conservative response headers, uses synthetic inputs, excludes local `.env` files, and logs structured workflow events without raw lead payloads.
