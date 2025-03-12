import { g as getEntry } from './_astro_content_B-NwJbBQ.mjs';
import { o as objectType, s as stringType } from './index_DKT5_kWb.mjs';
import 'postmark';
import mjml2html from 'mjml';
import { d as defineAction } from './server_CgPAURxL.mjs';

const capitalizeFirstLetter = (str) => {
  const words = str.replace(/-/g, " ").split(" ");
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

function formatDate(date) {
  if (date == null) {
    return "";
  }
  const dateObj = new Date(date.toString());
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const formattedDate = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;
  return formattedDate;
}

const adminEmailTemplate = {
  html: (data, emailSettings, general) => `
  <mjml>
    <mj-head>
      <mj-preview>New Quote Request</mj-preview>
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
            New Quote Request Received
          </mj-text>
          <mj-divider border-color="#ffd51d" border-width="2px" width="60%" align="center" />
        </mj-column>
      </mj-section>

      <!-- Submission Details -->
      <mj-section background-color="#ffffff" padding="20px 30px" border-radius="0 0 8px 8px">
        <mj-column>
          <mj-text font-size="16px" color="#555555" line-height="1.8">
            ${data.serviceType ? `<strong>Service Type:</strong> ${capitalizeFirstLetter(data.serviceType)}<br/>` : ""}
            <strong>First Name:</strong> ${data.firstName || "N/A"}<br/>
            <strong>Last Name:</strong> ${data.lastName || "N/A"}<br/>
            <strong>Initial Delivery Zip Code:</strong> ${data.initialDeliveryZip || "N/A"}<br/>
            ${data.finalDeliveryZip ? `<strong>Final Delivery Zip Code:</strong> ${data.finalDeliveryZip}<br/>` : ""}
            <strong>Delivery Date:</strong> ${formatDate(data.deliveryDate)}<br/>
            <strong>Email:</strong> ${data.email}<br/>
            <strong>Phone:</strong> ${data.phone}<br/>
          

          </mj-text>
        </mj-column>
      </mj-section>

      <!-- Footer -->
      <mj-section background-color="#ffd51d" padding="20px" text-align="center">
        <mj-column>
          <mj-text align="center" color="#ffffff" font-size="12px" line-height="1.6">
            ${general.businessName}<br/>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `
};

const clientEmailTemplate = {
  html: (data, emailSettings, general) => `
  <mjml>
    <mj-body background-color="#f4f4f4" font-family="Arial, sans-serif">
      <!-- Logo Section -->
      <mj-section background-color="#ffffff" padding="20px" text-align="center">
        <mj-column>
          <mj-image 
            width="150px" 
            src="${emailSettings.logo.imageUrl}" 
            alt="${emailSettings.logo.altTag}" 
          />
        </mj-column>
      </mj-section>

      <!-- Header Section -->
      <mj-section background-color="#ffffff" padding="20px 30px" border-radius="8px 8px 0 0" text-align="center">
        <mj-column>
          <mj-text font-size="20px" font-weight="bold" color="#333333" align="center">
            Thank You for Your Quote Request
          </mj-text>
          <mj-divider border-color="#ffd51d" border-width="2px" width="60%" />
        </mj-column>
      </mj-section>

      <!-- Submission Details Section -->
      <mj-section background-color="#ffffff" padding="20px 30px" border-radius="0 0 8px 8px">
        <mj-column>
          <mj-text font-size="16px" color="#555555" line-height="1.8">
            ${data.serviceType ? `<strong>Service Type:</strong> ${capitalizeFirstLetter(data.serviceType)}<br/>` : ""}
            <strong>First Name:</strong> ${data.firstName || "N/A"}<br/>
            <strong>Last Name:</strong> ${data.lastName || "N/A"}<br/>
            <strong>Initial Delivery Zip Code:</strong> ${data.initialDeliveryZip || "N/A"}<br/>
            ${data.finalDeliveryZip ? `<strong>Final Delivery Zip Code:</strong> ${data.finalDeliveryZip}<br/>` : ""}
            <strong>Delivery Date:</strong> ${formatDate(data.deliveryDate)}<br/>
            <strong>Email:</strong> ${data.email}<br/>
            <strong>Phone:</strong> ${data.phone}<br/>

          </mj-text>
          <mj-text 
            font-size="18px" 
            font-weight="bold" 
            color="#ffd51d" 
            line-height="1.8" 
            align="center" 
            padding-top="15px"
          >
            Quote Submitted - A Team Member Will Contact You - <br/> Thank You!
          </mj-text>
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
            ${general.businessName}<br/>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `
};

const server = {
  quoteForm: defineAction({
    input: objectType({
      serviceType: stringType(),
      firstName: stringType().min(1, { message: "Please enter your first name" }),
      lastName: stringType().min(1, { message: "Please enter your last name" }),
      initialDeliveryZip: stringType().min(5, {
        message: "Please enter a valid zip code"
      }),
      finalDeliveryZip: stringType().optional(),
      deliveryDate: stringType().min(1, { message: "Please enter a date" }),
      email: stringType().email({ message: "Please enter a valid email address" }),
      phone: stringType().min(1, { message: "Phone number is required" }),
      selectedContainerType: stringType(),
      storeItType: stringType().optional(),
      cfTurnstileResponse: stringType().min(1, { message: "Turnstile verification required" })
    }),
    handler: async (input) => {
      const formData = new FormData();
      formData.append("secret", "1x0000000000000000000000000000000AA");
      formData.append("response", input.cfTurnstileResponse);
      const result = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: formData
        }
      );
      const turnstileCheck = await result.json();
      if (!turnstileCheck.success) {
        return {
          success: false,
          error: {
            message: "Turnstile verification failed. Please try again."
          }
        };
      }
      const emailSettings = await getEntry("singletons", "email");
      const general = await getEntry("singletons", "general");
      const { html: clientEmailBody } = mjml2html(
        clientEmailTemplate.html(input, emailSettings.data, general.data)
      );
      const { html: adminEmailBody } = mjml2html(
        adminEmailTemplate.html(input, emailSettings.data, general.data)
      );
      return {
        success: true,
        data: {
          serviceType: input.serviceType,
          initialDeliveryZip: input.initialDeliveryZip,
          finalDeliveryZip: input.finalDeliveryZip
        }
      };
    }
  })
};

const actions = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  server
}, Symbol.toStringTag, { value: 'Module' }));

export { actions as a, server as s };
