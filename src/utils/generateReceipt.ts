export const generateReceipt = (payment: {
  full_name: string;
  email: string;
  phone: string;
  course_name: string;
  transaction_id: string;
  amount_paid: number;
  status: string;
  created_at: string;
  id: string;
}) => {
  const receiptNumber = `TDCS-${payment.id.slice(0, 8).toUpperCase()}`;
  const date = new Date(payment.created_at).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Receipt - ${receiptNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f8fafc; padding: 40px; color: #1e293b; }
    .receipt { max-width: 700px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; }
    .header { background: linear-gradient(135deg, #0f172a, #1e293b); color: #fff; padding: 32px 40px; display: flex; justify-content: space-between; align-items: center; }
    .header h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
    .header .badge { background: ${payment.status === "verified" ? "#22c55e" : "#f59e0b"}; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
    .body { padding: 40px; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px dashed #e2e8f0; }
    .meta-item { font-size: 13px; color: #64748b; }
    .meta-item strong { display: block; font-size: 15px; color: #1e293b; margin-top: 4px; }
    .details { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
    .details th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; padding: 12px 0; border-bottom: 2px solid #e2e8f0; }
    .details td { padding: 16px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; }
    .details .amount { text-align: right; font-weight: 700; font-size: 18px; color: #0f172a; }
    .total-row { background: #f0fdf4; border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .total-row .label { font-size: 16px; font-weight: 600; color: #166534; }
    .total-row .value { font-size: 28px; font-weight: 800; color: #166534; }
    .footer { text-align: center; padding: 24px 40px; background: #f8fafc; border-top: 1px solid #e2e8f0; }
    .footer p { font-size: 12px; color: #94a3b8; line-height: 1.6; }
    @media print { body { padding: 0; background: #fff; } .receipt { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <div>
        <h1>TDCS</h1>
        <p style="font-size:13px;opacity:0.8;margin-top:4px">The Digital Cyber Security</p>
      </div>
      <span class="badge">${payment.status === "verified" ? "✓ Verified" : "⏳ Pending"}</span>
    </div>
    <div class="body">
      <div class="meta">
        <div class="meta-item">Receipt No.<strong>${receiptNumber}</strong></div>
        <div class="meta-item">Date<strong>${date}</strong></div>
        <div class="meta-item">UTR / Transaction ID<strong style="font-family:monospace">${payment.transaction_id}</strong></div>
      </div>
      <table class="details">
        <thead><tr><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
        <tbody>
          <tr>
            <td>
              <strong>${payment.course_name}</strong>
              <div style="font-size:12px;color:#64748b;margin-top:4px">Course Enrollment</div>
            </td>
            <td class="amount">₹${payment.amount_paid.toLocaleString("en-IN")}</td>
          </tr>
        </tbody>
      </table>
      <div class="total-row">
        <span class="label">Total Paid</span>
        <span class="value">₹${payment.amount_paid.toLocaleString("en-IN")}</span>
      </div>
      <div style="font-size:13px;color:#64748b">
        <p><strong>Billed to:</strong></p>
        <p>${payment.full_name}</p>
        <p>${payment.email} · ${payment.phone}</p>
      </div>
    </div>
    <div class="footer">
      <p>This is a computer-generated receipt and does not require a signature.<br/>For queries, contact support@tdcs.in</p>
    </div>
  </div>
  <script>window.onload = function() { window.print(); }</script>
</body>
</html>`;

  const newWindow = window.open("", "_blank");
  if (newWindow) {
    newWindow.document.write(html);
    newWindow.document.close();
  }
};
