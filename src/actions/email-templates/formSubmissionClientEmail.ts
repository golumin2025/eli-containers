import { formatDate } from "@utils/dateformatter";

export const formSubmissionClientEmail = {
  html: (data, emailGlobal) => `
  <mjml>
    <mj-head>
      <mj-preview>Thank you for your submission</mj-preview>
      <mj-style inline="inline">
        a { color: #ffd51d; text-decoration: none; font-weight: 600; }
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
          <mj-text font-size="24px" font-weight="bold" color="#333333" align="center">
            Thank You for Your Submission!
          </mj-text>
          <mj-divider border-color="#ffd51d" border-width="2px" width="60%" />
        </mj-column>
      </mj-section>

      <!-- Message Section -->
      <mj-section background-color="#ffffff" padding="20px 30px">
        <mj-column>
          <mj-text font-size="16px" color="#555555" line-height="1.8">
            Hello ${data.firstName || ""}${data.firstName && data.lastName ? " " + data.lastName : ""},
          </mj-text>
          
          <mj-text font-size="16px" color="#555555" line-height="1.8" padding-top="10px">
            Thank you for contacting us! We've received your submission and a team member will be in touch with you shortly to discuss your needs.
          </mj-text>
        </mj-column>
      </mj-section>

      <!-- Submission Details Section -->
      <mj-section background-color="#f9f9f9" padding="20px 30px">
        <mj-column>
          <mj-text font-size="14px" font-weight="bold" color="#333333" padding-bottom="10px">
            Submission Details:
          </mj-text>
          
          <mj-text font-size="14px" color="#555555" line-height="2">
            ${data.firstName ? `<strong>First Name:</strong> ${data.firstName}<br/>` : ""}
            ${data.lastName ? `<strong>Last Name:</strong> ${data.lastName}<br/>` : ""}
            ${data.email ? `<strong>Email:</strong> ${data.email}<br/>` : ""}
            ${data.phone ? `<strong>Phone:</strong> ${data.phone}<br/>` : ""}
            ${data.serviceType ? `<strong>Service Type:</strong> ${data.serviceType}<br/>` : ""}
            ${data.initialDeliveryZip ? `<strong>Delivery Zip Code:</strong> ${data.initialDeliveryZip}<br/>` : ""}
            ${data.finalDeliveryZip ? `<strong>Final Delivery Zip:</strong> ${data.finalDeliveryZip}<br/>` : ""}
            ${data.deliveryDate ? `<strong>Delivery Date:</strong> ${formatDate(data.deliveryDate)}<br/>` : ""}
            ${data.storeItType ? `<strong>Storage Type:</strong> ${data.storeItType}<br/>` : ""}
            ${data.promoCode ? `<strong>Promo Code:</strong> ${data.promoCode}<br/>` : ""}
          </mj-text>
        </mj-column>
      </mj-section>

      <!-- CTA Section -->
      <mj-section background-color="#ffffff" padding="20px 30px" border-radius="0 0 8px 8px">
        <mj-column>
          <mj-text font-size="16px" color="#555555" line-height="1.8" padding-top="10px">
            If you have any immediate questions, feel free to call us:
          </mj-text>
          
          <mj-button 
            background-color="#ffd51d" 
            color="#000000" 
            href="tel:${emailGlobal.phone_number}" 
            font-family="Arial, sans-serif" 
            padding="15px 30px"
            font-weight="bold"
          >
            Call Us Now
          </mj-button>
        </mj-column>
      </mj-section>

      <!-- Footer Section -->
      <mj-section background-color="#ffd51d" padding="20px" text-align="center">
        <mj-column>
          <mj-text 
            align="center" 
            color="#ffffff" 
            font-size="12px" 
            line-height="1.6"
          >
            Box Rental Now<br/>
            ${emailGlobal.phone_number}<br/>
            <a href="https://www.boxrentalnow.com" style="color: #ffffff; text-decoration: none;">Visit Our Website</a>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `,
};

