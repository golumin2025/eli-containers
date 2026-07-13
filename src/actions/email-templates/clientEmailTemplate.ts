import { capitalizeFirstLetter } from "@utils/Capitilized";
import { formatDate } from "@utils/dateformatter";

export function clientEmailTemplate(data): string {
  return `<!doctype html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <title>Thank You for Your Quote Request</title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a { padding: 0; }
      body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      p { display: block; margin: 13px 0; }
    </style>
    <!--[if mso]>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 { width: 100% !important; max-width: 100%; }
      }
    </style>
  </head>
  <body style="background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <div style="background-color:#f4f4f4;">
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#f4f4f4" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:24px 12px;text-align:center;">

                <!-- HEADER -->
                <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:576px;" ><![endif]-->
                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#111827;border-radius:12px 12px 0 0;vertical-align:top;" width="100%">
                    <tbody>
                      <tr>
                        <td align="left" style="font-size:0px;padding:30px 20px 15px 20px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                            <tbody>
                            <tr><td align="center" style="padding:20px;background:#fff">
                              <img src="https://cms.boxrentalnow.com/assets/a56bb137-6391-4cb4-8533-8182c84fe58a" alt="Logo" width="150" style="display:block">
                            </td></tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:0 25px;word-break:break-word;">
                          <div style="font-family:Arial, sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;line-height:1;text-transform:uppercase;color:#ffd51d;">Quote Request Confirmed</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:5px 25px 30px 25px;word-break:break-word;">
                          <div style="font-family:Arial, sans-serif;font-size:20px;font-weight:800;line-height:1;color:#ffffff;">Thank You for Your Quote Request</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->

                <!-- BODY CONTENT -->
                <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:576px;" ><![endif]-->
                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff;border-radius:0 0 12px 12px;vertical-align:top;" width="100%">
                    <tbody>
                      <tr>
                        <td align="left" style="font-size:0px;padding:30px 24px 10px 24px;word-break:break-word;">
                          <div style="font-family:Arial, sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;line-height:1;text-transform:uppercase;color:#9CA3AF;">Summary of Requested Details</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:0 24px 25px 24px;word-break:break-word;">
                          <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color:#000000;font-family:Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:none;">
                            <tr style="border-bottom: 1px solid #F3F4F6;">
                              <td style="font-size: 14px; color: #4d4d4d; font-weight: normal; width: 140px; padding: 8px 16px 8px 0;">Service Type</td>
                              <td style="font-size: 14px; color: #111827; font-weight: 700; padding: 8px 0;">${capitalizeFirstLetter(data.serviceType)}</td>
                            </tr>
                            ${data.selectedContainerType ? `
                            <tr style="border-bottom: 1px solid #F3F4F6;">
                              <td style="font-size: 14px; color: #4d4d4d; font-weight: normal; width: 140px; padding: 8px 16px 8px 0;">Container Type</td>
                              <td style="font-size: 14px; color: #111827; font-weight: 700; padding: 8px 0;">${capitalizeFirstLetter(data.selectedContainerType)}</td>
                            </tr>` : ''}
                            ${data.storeItType ? `
                            <tr style="border-bottom: 1px solid #F3F4F6;">
                              <td style="font-size: 14px; color: #4d4d4d; font-weight: normal; width: 140px; padding: 8px 16px 8px 0;">Store-It Type</td>
                              <td style="font-size: 14px; color: #111827; font-weight: 700; padding: 8px 0;">${capitalizeFirstLetter(data.storeItType)}</td>
                            </tr>` : ''}
                            ${data.storageType ? `
                            <tr style="border-bottom: 1px solid #F3F4F6;">
                              <td style="font-size: 14px; color: #4d4d4d; font-weight: normal; width: 140px; padding: 8px 16px 8px 0;">Storage Strategy</td>
                              <td style="font-size: 14px; color: #111827; font-weight: 700; padding: 8px 0;">${capitalizeFirstLetter(data.storageType)}</td>
                            </tr>` : ''}
                            <tr style="border-bottom: 1px solid #F3F4F6;">
                              <td style="font-size: 14px; color: #4d4d4d; font-weight: normal; width: 140px; padding: 8px 16px 8px 0;">First Name</td>
                              <td style="font-size: 14px; color: #111827; font-weight: 700; padding: 8px 0;">${data.firstName || "N/A"}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #F3F4F6;">
                              <td style="font-size: 14px; color: #4d4d4d; font-weight: normal; width: 140px; padding: 8px 16px 8px 0;">Last Name</td>
                              <td style="font-size: 14px; color: #111827; font-weight: 700; padding: 8px 0;">${data.lastName || "N/A"}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #F3F4F6;">
                              <td style="font-size: 14px; color: #4d4d4d; font-weight: normal; width: 140px; padding: 8px 16px 8px 0;">Initial Zip</td>
                              <td style="font-size: 14px; color: #111827; font-weight: 700; padding: 8px 0;">${data.initialDeliveryZip || "N/A"}</td>
                            </tr>
                            ${data.finalDeliveryZip ? `
                            <tr style="border-bottom: 1px solid #F3F4F6;">
                              <td style="font-size: 14px; color: #4d4d4d; font-weight: normal; width: 140px; padding: 8px 16px 8px 0;">Final Zip</td>
                              <td style="font-size: 14px; color: #111827; font-weight: 700; padding: 8px 0;">${data.finalDeliveryZip}</td>
                            </tr>` : ''}
                            <tr style="border-bottom: 1px solid #F3F4F6;">
                              <td style="font-size: 14px; color: #4d4d4d; font-weight: normal; width: 140px; padding: 8px 16px 8px 0;">Delivery Date</td>
                              <td style="font-size: 14px; color: #111827; font-weight: 700; padding: 8px 0;">${formatDate(data.deliveryDate)}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #F3F4F6;">
                              <td style="font-size: 14px; color: #4d4d4d; font-weight: normal; width: 140px; padding: 8px 16px 8px 0;">Email</td>
                              <td style="font-size: 14px; color: #111827; font-weight: 700; padding: 8px 0;">${data.email}</td>
                            </tr>
                            <tr>
                              <td style="font-size: 14px; color: #4d4d4d; font-weight: normal; width: 140px; padding: 8px 16px 8px 0;">Phone</td>
                              <td style="font-size: 14px; color: #111827; font-weight: 700; padding: 8px 0;">${data.phone}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->

                <!-- CLIENT STATUS BANNER -->
                <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:576px;" ><![endif]-->
                <div class="mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;margin-top:15px;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#FFFBEB;border-radius:12px;vertical-align:top;" width="100%">
                    <tbody>
                      <tr>
                        <td align="center" style="font-size:0px;padding:25px 24px;word-break:break-word;">
                          <div style="font-family:Arial, sans-serif;font-size:16px;font-weight:bold;line-height:1.5;text-align:center;color:#111827;">Quote Submitted — A Team Member Will Contact You Shortly!</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->

                <!-- FOOTER -->
                <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:576px;" ><![endif]-->
                <div class="mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;margin-top:15px;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#F3F4F6;border-radius:12px;vertical-align:top;" width="100%">
                    <tbody>
                      <tr>
                        <td align="center" style="font-size:0px;padding:20px;word-break:break-word;">
                          <div style="font-family:Arial, sans-serif;font-size:12px;line-height:1.6;text-align:center;color:#9CA3AF;">Thank you for choosing MIBOX VW · If you have any changes, please reply directly to this email.</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->

              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
    </div>
  </body>
  </html>`;
}
