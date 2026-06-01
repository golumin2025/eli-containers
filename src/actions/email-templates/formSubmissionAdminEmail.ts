import { formatDate } from "@utils/dateformatter";

export const formSubmissionAdminEmail = {
  html: (data, emailGlobal) => `
  <mjml>
    <mj-head>
      <mj-preview>New Form Submission - Action Required</mj-preview>
      <mj-style inline="inline">
        a { color: #ffd51d; text-decoration: none; font-weight: 600; }
        .detail-label { font-weight: bold; color: #333333; }
        .detail-value { color: #555555; }
      </mj-style>
    </mj-head>
    <mj-body background-color="#f4f4f4" font-family="Arial, sans-serif">
      <!-- Logo Section -->
      <mj-section background-color="#ffffff" padding="20px" text-align="center">
        <mj-column>
          <mj-image
            width="150px"
            src="${emailGlobal.image_url_for_email}"
            alt="Logo"
          />
        </mj-column>
      </mj-section>

      <!-- Header Section -->
      <mj-section background-color="#ffffff" padding="20px 30px" border-radius="8px 8px 0 0" text-align="center">
        <mj-column>
          <mj-text font-size="24px" font-weight="bold" color="#d32f2f" align="center">
             New Form Submission
          </mj-text>
          <mj-divider border-color="#d32f2f" border-width="2px" width="60%" />
        </mj-column>
      </mj-section>

      <!-- Customer Details Section -->
      <mj-section background-color="#ffffff" padding="20px 30px">
        <mj-column>
          <mj-text font-size="16px" font-weight="bold" color="#333333" padding-bottom="15px">
            Customer Information:
          </mj-text>

          <mj-text font-size="14px" color="#555555" line-height="2.2">
            ${data.firstName ? `<span class="detail-label">First Name:</span> <span class="detail-value">${data.firstName}</span><br/>` : ""}
            ${data.lastName ? `<span class="detail-label">Last Name:</span> <span class="detail-value">${data.lastName}</span><br/>` : ""}
            ${data.email ? `<span class="detail-label">Email:</span> <span class="detail-value"><a href="mailto:${data.email}">${data.email}</a></span><br/>` : ""}
            ${data.phone ? `<span class="detail-label">Phone:</span> <span class="detail-value"><a href="tel:${data.phone}">${data.phone}</a></span><br/>` : ""}
          </mj-text>
        </mj-column>
      </mj-section>

      <!-- Service Details Section -->
      <mj-section background-color="#f9f9f9" padding="20px 30px">
        <mj-column>
          <mj-text font-size="16px" font-weight="bold" color="#333333" padding-bottom="15px">
            Service Details:
          </mj-text>

          <mj-text font-size="14px" color="#555555" line-height="2.2">
            ${data.serviceType ? `<span class="detail-label">Service Type:</span> <span class="detail-value">${data.serviceType}</span><br/>` : ""}
            ${data.initialDeliveryZip ? `<span class="detail-label">Delivery Zip Code:</span> <span class="detail-value">${data.initialDeliveryZip}</span><br/>` : ""}
            ${data.finalDeliveryZip ? `<span class="detail-label">Final Delivery Zip:</span> <span class="detail-value">${data.finalDeliveryZip}</span><br/>` : ""}
            ${data.deliveryDate ? `<span class="detail-label">Delivery Date:</span> <span class="detail-value">${formatDate(data.deliveryDate)}</span><br/>` : ""}
            ${data.storeItType ? `<span class="detail-label">Storage Type:</span> <span class="detail-value">${data.storeItType}</span><br/>` : ""}
          </mj-text>
        </mj-column>
      </mj-section>

      <!-- Promo Code Section -->
      ${data.promoCode ? `
      <mj-section background-color="#fff3cd" padding="20px 30px">
        <mj-column>
          <mj-text font-size="16px" font-weight="bold" color="#333333" padding-bottom="10px">
            🎉 Promo Code Used:
          </mj-text>

          <mj-text font-size="18px" font-weight="bold" color="#d32f2f">
            ${data.promoCode}
          </mj-text>
        </mj-column>
      </mj-section>
      ` : ""}

      <!-- Action Section -->
      <mj-section background-color="#ffffff" padding="20px 30px" border-radius="0 0 8px 8px">
        <mj-column>
          <mj-text font-size="14px" color="#666666" line-height="1.8" padding-top="10px">
            <em>Please follow up with this customer as soon as possible to provide a quote and discuss their needs.</em>
          </mj-text>

          <mj-button
            background-color="#d32f2f"
            color="#ffffff"
            href="mailto:${data.email}"
            font-family="Arial, sans-serif"
            padding="15px 30px"
            font-weight="bold"
          >
            Reply to Customer
          </mj-button>
        </mj-column>
      </mj-section>

      <!-- Footer Section -->
      <mj-section background-color="#333333" padding="20px" text-align="center">
        <mj-column>
          <mj-text
            align="center"
            color="#ffffff"
            font-size="12px"
            line-height="1.6"
          >
            Box Rental Now<br/>
            ${emailGlobal.phone_number}
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `,
};
