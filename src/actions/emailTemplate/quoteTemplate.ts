export const prerender = false;
import mjml2html from "mjml";
import * as postmark from "postmark";
const client = new postmark.ServerClient(import.meta.env.POSTMARK_TOKEN);
export const sendQuoteEmail = async ({
  fromEmail,
  email,
  emailCCs,
  emailSubject,
  formTypeName,
  fullName,
  companyPhone,
  phone,
  initialDeliveryZip,
  initialDeliveryDate,
  relocationZip,
  apiResponse,
}: any) => {
  client.sendEmail({
    From: fromEmail,
    To: email!,
    Cc: emailCCs,
    Subject: emailSubject,
    HtmlBody: mjml2html(`
        <mjml>
  <mj-head>
    <mj-font name="Arial" href="https://fonts.googleapis.com/css?family=Arial"></mj-font>
    <mj-style>/* Global Styles */
      mj-text {
      color: #F9DE4B; /* Dark red/maroon */
      }
      .header {
      font-size: 18px;
      font-weight: bold;
      }
      .section-title {
      font-size: 16px;
      font-weight: bold;
      }
      .content {
      font-size: 14px;
      line-height: 1.6;
      }
      .highlight {
      font-size: 16px;
      font-weight: bold;
      color: #F9DE4B; /* Teal for highlights */
      }
      .footer {
      font-size: 12px;
      }</mj-style>
  </mj-head>
  <mj-body background-color="#f9f9f9">
    <mj-raw>
      <!-- Header -->
    </mj-raw>
    <mj-section background-color="white" padding="20px 0">
      <mj-column>
        <mj-image src="https://miboxmarketing.netlify.app/.netlify/images?url=%2Fimages%2Flogo.jpg&w=380&h=70" alt="MI-BOX Logo" width="120px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Introduction -->
    </mj-raw>
    <mj-section background-color="white" padding="20px">
      <mj-column>
        <mj-text css-class="header" align="center">Your Local, Lower-Priced Alternative to PODS© & 1-800-PACK-RAT©</mj-text>
        <mj-text css-class="content" align="center">Our team is here to make your moving and storage experience seamless. If you have questions, call us at <strong>${companyPhone}</strong>.</mj-text>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Pricing Details -->
    </mj-raw>
    <mj-section background-color="white" padding="0px  20px">
      <mj-column>
        <mj-text css-class="section-title" color="#F9DE4B" align="center" font-size="18px">Pricing Information</mj-text>
        <mj-text css-class="content">
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Delivery Date:</strong> ${initialDeliveryDate}</p>
          <p><strong>Delivery Zip:</strong> ${initialDeliveryZip}</p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Service Details -->
    </mj-raw>
    <mj-section background-color="white" padding="20px">
      <mj-column>
        <mj-text css-class="section-title" color="#F9DE4B" align="center" font-size="18px">Service Details</mj-text>
        <mj-text css-class="content">
          <p><strong>Service Type:</strong> ${formTypeName}</p>
          ${
            apiResponse.container_type?.name &&
            `<p><strong>Container Type:</strong> ${apiResponse.container_type.name}</p>`
          }
          <p><strong>Container Fee:</strong> $${apiResponse.price}</p>
          ${
            apiResponse.discount &&
            `
          <p><strong>First Month Rental Cost with Discount:</strong> $${
            apiResponse.discount_type === "percentage"
              ? (
                  apiResponse.price -
                  apiResponse.price * (apiResponse.discount / 100)
                ).toFixed(2)
              : (apiResponse.price - apiResponse.discount).toFixed(2)
          }
          </p>
          `
          }
          ${
            apiResponse.initial_delivery &&
            `<p><strong>Initial Delivery Fee:</strong> $${apiResponse.initial_delivery}</p>`
          }
          ${
            apiResponse.relocation &&
            `<p><strong>Relocation Fee:</strong> $${apiResponse.relocation}</p>`
          }
          ${
            apiResponse.final_pickup &&
            `<p><strong>Final Pickup Fee:</strong> $${apiResponse.final_pickup}</p>`
          }
          <p class="highlight">
            <strong>Total Price:</strong> $${
              apiResponse.discount_type === "percentage"
                ? Math.floor(
                    apiResponse.price -
                      apiResponse.price * (apiResponse.discount / 100),
                  ) + apiResponse.initial_delivery
                : apiResponse.price -
                  apiResponse.discount +
                  apiResponse.initial_delivery
            }
          </p>
        </mj-text>
        <mj-text css-class="content" align="left" font-style="italic">Transportation charges are subject to change based on distance from our facility and/or final zip codes.</mj-text>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Footer -->
    </mj-raw>
    <mj-section background-color="#f9f9f9" padding="20px">
      <mj-column>
        <mj-text css-class="footer" align="center">MI-BOX is here to make your move or storage easy and hassle-free. <br />
          © 2025 MI-BOX. All rights reserved.</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
        `).html,
    MessageStream: "outbound",
  });
};
