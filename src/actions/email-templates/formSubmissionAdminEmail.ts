import { formatDate } from "@utils/dateformatter";

export const formSubmissionAdminEmail = {
  html: (data: any, emailGlobal: any) => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Form Submission</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;max-width:600px;width:100%">
        <!-- Logo -->
        <tr><td align="center" style="padding:20px;background:#fff">
          ${emailGlobal.image_url_for_email ? `<img src="${emailGlobal.image_url_for_email}" alt="Logo" width="150" style="display:block">` : ""}
        </td></tr>
        <!-- Header -->
        <tr><td align="center" style="padding:20px 30px;background:#fff">
          <h1 style="font-size:24px;font-weight:bold;color:#d32f2f;margin:0 0 10px">New Form Submission</h1>
          <hr style="border:none;border-top:2px solid #d32f2f;width:60%;margin:0 auto">
        </td></tr>
        <!-- Customer Info -->
        <tr><td style="padding:20px 30px;background:#fff">
          <p style="font-size:16px;font-weight:bold;color:#333;margin:0 0 15px">Customer Information:</p>
          <p style="font-size:14px;color:#555;line-height:2.2;margin:0">
            ${data.firstName ? `<strong>First Name:</strong> ${data.firstName}<br>` : ""}
            ${data.lastName ? `<strong>Last Name:</strong> ${data.lastName}<br>` : ""}
            ${data.email ? `<strong>Email:</strong> <a href="mailto:${data.email}" style="color:#d32f2f">${data.email}</a><br>` : ""}
            ${data.phone ? `<strong>Phone:</strong> <a href="tel:${data.phone}" style="color:#d32f2f">${data.phone}</a><br>` : ""}
          </p>
        </td></tr>
        <!-- Service Details -->
        <tr><td style="padding:20px 30px;background:#f9f9f9">
          <p style="font-size:16px;font-weight:bold;color:#333;margin:0 0 15px">Service Details:</p>
          <p style="font-size:14px;color:#555;line-height:2.2;margin:0">
            ${data.serviceType ? `<strong>Service Type:</strong> ${data.serviceType}<br>` : ""}
            ${data.initialDeliveryZip ? `<strong>Delivery Zip Code:</strong> ${data.initialDeliveryZip}<br>` : ""}
            ${data.finalDeliveryZip ? `<strong>Final Delivery Zip:</strong> ${data.finalDeliveryZip}<br>` : ""}
            ${data.deliveryDate ? `<strong>Delivery Date:</strong> ${formatDate(data.deliveryDate)}<br>` : ""}
            ${data.storeItType ? `<strong>Storage Type:</strong> ${data.storeItType}<br>` : ""}
          </p>
        </td></tr>
        ${data.promoCode ? `
        <!-- Promo Code -->
        <tr><td style="padding:20px 30px;background:#fff3cd">
          <p style="font-size:16px;font-weight:bold;color:#333;margin:0 0 10px">Promo Code Used:</p>
          <p style="font-size:18px;font-weight:bold;color:#d32f2f;margin:0">${data.promoCode}</p>
        </td></tr>` : ""}
        <!-- Action -->
        <tr><td align="center" style="padding:20px 30px;background:#fff">
          <p style="font-size:14px;color:#666;line-height:1.8;margin:0 0 15px"><em>Please follow up with this customer as soon as possible.</em></p>
          <a href="mailto:${data.email}" style="display:inline-block;background:#d32f2f;color:#fff;font-weight:bold;font-family:Arial,sans-serif;padding:15px 30px;text-decoration:none;border-radius:4px">Reply to Customer</a>
        </td></tr>
        <!-- Footer -->
        <tr><td align="center" style="padding:20px;background:#333">
          <p style="color:#fff;font-size:12px;line-height:1.6;margin:0">Box Rental Now<br>${emailGlobal.phone_number}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
};
