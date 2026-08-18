# Troubleshooting

| Symptom                              | Likely cause                                              | Resolution                                                                                   |
| ------------------------------------ | --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `npm ci` fails                       | Node is older than 20 or the lock file is stale           | Use Node 20 or newer, remove `node_modules`, and run `npm ci` again.                         |
| Port 3000 is in use                  | Another local service uses the default port               | Set `PORT=3001` in `.env` and restart.                                                       |
| The API returns `422`                | The request body does not match the synthetic lead schema | Compare the payload with the terminal demonstration and include every required field.        |
| `npm run check` fails                | A type or lint rule is violated                           | Fix the reported file and rerun the command; do not suppress it without an explained reason. |
| Tests fail after a dependency change | A behavior or dependency contract changed                 | Run the full suite, inspect the business expectation, and update code or tests deliberately. |
