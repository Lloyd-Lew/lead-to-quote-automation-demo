# Terminal Demonstration

Start the local API with `npm run dev`, then submit this synthetic lead from a second terminal.

```bash
curl --request POST http://localhost:3000/v1/leads \
  --header 'content-type: application/json' \
  --data '{
    "fullName": "Avery Singh",
    "email": "avery.singh@example.test",
    "company": "Northstar Advisory",
    "teamSize": 22,
    "monthlyBudgetUsd": 5000,
    "urgencyDays": 10,
    "interest": "automation",
    "currentChallenge": "Lead follow-up, quoting, and handoffs are split across email and spreadsheets, so the team lacks visibility and spends too much time copying data."
  }'
```

The API returns a CRM-style record identifier, a transparent qualification result, a recommended owner and response target, a quote-brief structure, and an audit-event identifier. All values are generated locally from synthetic input.
