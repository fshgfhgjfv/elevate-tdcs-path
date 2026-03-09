export interface ReceiptData {
  full_name: string;
  email: string;
  phone: string;
  course_name?: string;
  item_name?: string;
  item_type?: string;
  transaction_id: string;
  amount_paid: number;
  status: string;
  created_at: string;
  id: string;
  // Hardware-specific
  order_number?: string;
  items?: Array<{ name: string; price: number; quantity: number }>;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export const generateReceipt = (payment: ReceiptData) => {
  const receiptNumber = payment.order_number || `TDCS-${payment.id.slice(0, 8).toUpperCase()}`;
  const date = new Date(payment.created_at).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isHardware = !!payment.items && payment.items.length > 0;
  const displayName = payment.item_name || payment.course_name || "Unknown Item";
  const itemType = payment.item_type || (isHardware ? "Hardware Order" : "Course Enrollment");

  const itemRows = isHardware && payment.items
    ? payment.items.map(item => `
        <tr>
          <td>
            <strong>${item.name}</strong>
            <div style="font-size:12px;color:#64748b;margin-top:4px">Qty: ${item.quantity}</div>
          </td>
          <td class="amount">₹${(item.price * item.quantity).toLocaleString("en-IN")}</td>
        </tr>
      `).join("")
    : `<tr>
        <td>
          <strong>${displayName}</strong>
          <div style="font-size:12px;color:#64748b;margin-top:4px">${itemType}</div>
        </td>
        <td class="amount">₹${payment.amount_paid.toLocaleString("en-IN")}</td>
      </tr>`;

  const breakdownRows = isHardware ? `
    <tr style="font-size:13px;color:#64748b">
      <td style="padding:8px 0">Subtotal</td>
      <td style="text-align:right;padding:8px 0">₹${(payment.subtotal || 0).toLocaleString("en-IN")}</td>
    </tr>
    <tr style="font-size:13px;color:#64748b">
      <td style="padding:8px 0">Shipping</td>
      <td style="text-align:right;padding:8px 0">${payment.shipping === 0 ? 'Free' : `₹${(payment.shipping || 0).toLocaleString("en-IN")}`}</td>
    </tr>
    <tr style="font-size:13px;color:#64748b">
      <td style="padding:8px 0">GST (18%)</td>
      <td style="text-align:right;padding:8px 0">₹${(payment.tax || 0).toLocaleString("en-IN")}</td>
    </tr>
  ` : "";

  const shippingAddress = isHardware && payment.address ? `
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e2e8f0">
      <p><strong>Shipping to:</strong></p>
      <p>${payment.address}</p>
      <p>${payment.city}, ${payment.state} - ${payment.pincode}</p>
    </div>
  ` : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Receipt - ${receiptNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f8fafc; padding: 16px; color: #1e293b; }
    .receipt { max-width: 700px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; }
    .header { background: linear-gradient(135deg, #0f172a, #1e293b); color: #fff; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .header h1 { font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .header .badge { background: ${payment.status === "verified" ? "#22c55e" : "#f59e0b"}; color: #fff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .body { padding: 20px 24px; }
    .meta { display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 2px dashed #e2e8f0; }
    .meta-item { font-size: 12px; color: #64748b; min-width: 0; }
    .meta-item strong { display: block; font-size: 13px; color: #1e293b; margin-top: 4px; word-break: break-all; }
    .details { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .details th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; padding: 10px 0; border-bottom: 2px solid #e2e8f0; }
    .details td { padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .details .amount { text-align: right; font-weight: 700; font-size: 16px; color: #0f172a; }
    .total-row { background: #f0fdf4; border-radius: 12px; padding: 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 8px; }
    .total-row .label { font-size: 15px; font-weight: 600; color: #166534; }
    .total-row .value { font-size: 24px; font-weight: 800; color: #166534; }
    .footer { text-align: center; padding: 20px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; }
    .footer p { font-size: 11px; color: #94a3b8; line-height: 1.6; }
    @media (min-width: 640px) {
      body { padding: 40px; }
      .header { padding: 32px 40px; }
      .header h1 { font-size: 28px; }
      .body { padding: 40px; }
      .meta-item { font-size: 13px; }
      .meta-item strong { font-size: 15px; }
      .details td { font-size: 15px; padding: 16px 0; }
      .details .amount { font-size: 18px; }
      .total-row { padding: 20px; }
      .total-row .value { font-size: 28px; }
      .footer { padding: 24px 40px; }
      .footer p { font-size: 12px; }
    }
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
        <div class="meta-item">${isHardware ? 'Order No.' : 'Receipt No.'}<strong>${receiptNumber}</strong></div>
        <div class="meta-item">Date<strong>${date}</strong></div>
        <div class="meta-item">UTR / Transaction ID<strong style="font-family:monospace">${payment.transaction_id}</strong></div>
      </div>
      <table class="details">
        <thead><tr><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
        <tbody>
          ${itemRows}
          ${breakdownRows}
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
        ${shippingAddress}
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
