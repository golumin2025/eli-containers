import { formatDate } from "@utils/dateformatter";

export const formSubmissionClientEmail = {
  html: (data: any, emailGlobal: any) => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Thank You for Your Submission</title></head>
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
          <h1 style="font-size:24px;font-weight:bold;color:#333;margin:0 0 10px">Thank You for Your Submission!</h1>
          <hr style="border:none;border-top:2px solid #ffd51d;width:60%;margin:0 auto">
        </td></tr>
        <!-- Message -->
        <tr><td style="padding:20px 30px;background:#fff">
          <p style="font-size:16px;color:#555;line-height:1.8;margin:0">Hello ${data.firstName || ""}${data.firstName && data.lastName ? " " + data.lastName : ""},</p>
          <p style="font-size:16px;color:#555;line-height:1.8;margin:10px 0 0">Thank you for contacting us! We've received your submission and a team member will be in touch with you shortly to discuss your needs.</p>
        </td></tr>
        <!-- Details -->
        <tr><td style="padding:20px 30px;background:#f9f9f9">
          <p style="font-size:14px;font-weight:bold;color:#333;margin:0 0 10px">Submission Details:</p>
          <p style="font-size:14px;color:#555;line-height:2;margin:0">
            ${data.firstName ? `<strong>First Name:</strong> ${data.firstName}<br>` : ""}
            ${data.lastName ? `<strong>Last Name:</strong> ${data.lastName}<br>` : ""}
            ${data.email ? `<strong>Email:</strong> ${data.email}<br>` : ""}
            ${data.phone ? `<strong>Phone:</strong> ${data.phone}<br>` : ""}
            ${data.serviceType ? `<strong>Service Type:</strong> ${data.serviceType}<br>` : ""}
            ${data.initialDeliveryZip ? `<strong>Delivery Zip Code:</strong> ${data.initialDeliveryZip}<br>` : ""}
            ${data.finalDeliveryZip ? `<strong>Final Delivery Zip:</strong> ${data.finalDeliveryZip}<br>` : ""}
            ${data.deliveryDate ? `<strong>Delivery Date:</strong> ${formatDate(data.deliveryDate)}<br>` : ""}
            ${data.storeItType ? `<strong>Storage Type:</strong> ${data.storeItType}<br>` : ""}
            ${data.promoCode ? `<strong>Promo Code:</strong> ${data.promoCode}<br>` : ""}
          </p>
        </td></tr>
        <!-- CTA -->
        <tr><td align="center" style="padding:20px 30px;background:#fff">
          <p style="font-size:16px;color:#555;line-height:1.8;margin:0 0 15px">If you have any immediate questions, feel free to call us:</p>
          <a href="tel:${emailGlobal.phone_number}" style="display:inline-block;background:#ffd51d;color:#000;font-weight:bold;font-family:Arial,sans-serif;padding:15px 30px;text-decoration:none;border-radius:4px">Call Us Now</a>
        </td></tr>
        <!-- Footer -->
        <tr><td align="center" style="padding:20px;background:#ffd51d">
          <p style="color:#fff;font-size:12px;line-height:1.6;margin:0">
            Box Rental Now<br>${emailGlobal.phone_number}<br>
            <a href="https://www.boxrentalnow.com" style="color:#fff;text-decoration:none">Visit Our Website</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
};
