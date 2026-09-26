import { ExecutiveReport } from "./schema";

export function generateMarkdownReport(report: ExecutiveReport, decision: string): string {
  return `# 🏛️ CouncilAI Executive Consensus Report

**Decision Analyzed:** ${decision}
**Verdict:** ${report.verdict.toUpperCase()} (Confidence: ${report.confidenceScore}%)

---

## 📌 Executive Summary
${report.consensusSummary}

## 📊 Pros vs. Cons

### Key Benefits
${report.pros.map((p) => `- ✅ ${p}`).join("\n")}

### Core Challenges
${report.cons.map((c) => `- ⚠️ ${c}`).join("\n")}

---

## 🛡️ Risk Assessment Matrix
| Risk | Severity | Mitigation Strategy |
| :--- | :--- | :--- |
${report.risks.map((r) => `| ${r.risk} | **${r.severity}** | ${r.mitigation} |`).join("\n")}

---

## 👥 Agent Stances & Key Arguments
${report.agentStances.map((s) => `- **${s.agent}** [${s.stance}]: ${s.keyPoint}`).join("\n")}

---

## 🎯 Action Items & Roadmap
${report.actionItems.map((a) => `- [ ] **[${a.owner}]** ${a.task} *(Timeline: ${a.timeline}, Priority: ${a.priority})*`).join("\n")}

---

**Next Immediate Step:** ${report.nextStep}
`;
}

export function exportToPrintableHTML(report: ExecutiveReport, decision: string) {
  const mdContent = generateMarkdownReport(report, decision);
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Executive Consensus Report - CouncilAI</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; padding: 40px; color: #1e293b; background: #fff; }
          h1 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }
          h2 { color: #334155; margin-top: 24px; }
          .badge { display: inline-block; padding: 6px 16px; border-radius: 9999px; font-weight: bold; font-size: 14px; background: #f1f5f9; }
          .go { background: #dcfce7; color: #15803d; }
          .nogo { background: #ffe4e6; color: #be123c; }
          .conditional { background: #fef3c7; color: #b45309; }
          table { width: 100%; border-collapse: collapse; margin: 16px 0; }
          th, td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
          th { background: #f8fafc; font-weight: 600; }
          ul { padding-left: 20px; }
          li { margin-bottom: 6px; }
        </style>
      </head>
      <body>
        <h1>🏛️ CouncilAI Executive Consensus Report</h1>
        <p><strong>Decision:</strong> ${decision}</p>
        <div class="badge ${report.verdict === "Go" ? "go" : report.verdict === "No-Go" ? "nogo" : "conditional"}">
          Verdict: ${report.verdict} (${report.confidenceScore}% Confidence)
        </div>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
        <h2>Executive Summary</h2>
        <p>${report.consensusSummary}</p>
        <h2>Pros & Cons</h2>
        <h3>Pros</h3>
        <ul>${report.pros.map((p) => `<li>${p}</li>`).join("")}</ul>
        <h3>Cons</h3>
        <ul>${report.cons.map((c) => `<li>${c}</li>`).join("")}</ul>
        <h2>Risks</h2>
        <table>
          <thead><tr><th>Risk</th><th>Severity</th><th>Mitigation</th></tr></thead>
          <tbody>
            ${report.risks.map((r) => `<tr><td>${r.risk}</td><td>${r.severity}</td><td>${r.mitigation}</td></tr>`).join("")}
          </tbody>
        </table>
        <h2>Action Items</h2>
        <ul>
          ${report.actionItems.map((a) => `<li><strong>[${a.owner}]</strong> ${a.task} (Timeline: ${a.timeline}, Priority: ${a.priority})</li>`).join("")}
        </ul>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
