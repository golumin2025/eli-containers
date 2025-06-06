import { capitalizeFirstLetter } from "@utils/Capitilized";
import { formatDate } from "@utils/dateformatter";

export const adminEmailTemplate = {
  html: (data, emailSettings, general) => `
  <mjml>
    <mj-head>
      <mj-preview>New Cold Storage Quote Request</mj-preview>
      <mj-style inline="inline">
        a { color: #ffd51d; text-decoration: none; font-weight: 600; }
      </mj-style>
    </mj-head>
    <mj-body background-color="#f4f4f4" font-family="Arial, sans-serif">
      <!-- Logo Section -->
      <mj-section background-color="#ffffff" padding="20px" text-align="center">
        <mj-column>
          <mj-image width="150px" src="${emailSettings.logo.imageUrl}" alt="${emailSettings.logo.altTag}" />
        </mj-column>
      </mj-section>

      <!-- Header -->
      <mj-section background-color="#ffffff" padding="20px 30px" border-radius="8px 8px 0 0" text-align="center">
        <mj-column>
          <mj-text font-size="20px" font-weight="bold" color="#333333" align="center">
            New Cold Storage Quote Request
          </mj-text>
          <mj-divider border-color="#ffd51d" border-width="2px" width="60%" align="center" />
        </mj-column>
      </mj-section>

      <!-- Submission Details -->
      <mj-section background-color="#ffffff" padding="20px 30px" border-radius="0 0 8px 8px">
        <mj-column>
          <mj-text font-size="16px" color="#555555" line-height="1.8">
            <strong>First Name:</strong> ${data.firstName || "N/A"}<br/>
            <strong>Last Name:</strong> ${data.lastName || "N/A"}<br/>
            <strong>Delivery Zip Code:</strong> ${data.initialDeliveryZip || "N/A"}<br/>
            <strong>Delivery Date:</strong> ${formatDate(data.deliveryDate)}<br/>
            <strong>Email:</strong> ${data.email}<br/>
            <strong>Phone:</strong> ${data.phone}<br/>
          </mj-text>
          
          <mj-button background-color="#ffd51d" color="#000000" href="mailto:${data.email}" font-family="Arial, sans-serif" padding="15px 30px">
            Reply to Customer
          </mj-button>
        </mj-column>
      </mj-section>

      <!-- Footer -->
      <mj-section background-color="#ffd51d" padding="20px" text-align="center">
        <mj-column>
          <mj-text align="center" color="#ffffff" font-size="12px" line-height="1.6">
            ${general.businessName}<br/>
            ${general.contactInformation.phoneDisplay}
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `,
};