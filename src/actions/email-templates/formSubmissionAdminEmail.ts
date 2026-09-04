import { formatDate } from "@utils/dateformatter";
import {
  button,
  detailList,
  divider,
  escapeHtml,
  heading,
  image,
  layout,
  link,
  section,
  text,
} from "./layout";

const ADMIN_RED = "#d32f2f";

export const formSubmissionAdminEmail = {
  html: (data, emailGlobal) =>
    layout({
      preview: "New Form Submission - Action Required",
      sections: [
        section(image(emailGlobal.image_url_for_email, "Logo"), {
          padding: "20px",
        }),

        section(
          heading("New Form Submission", { color: ADMIN_RED }) +
            divider(ADMIN_RED),
          { borderRadius: "8px 8px 0 0" },
        ),

        section(
          text("Customer Information:", {
            fontWeight: "bold",
            color: "#333333",
            paddingBottom: "15px",
          }) +
            detailList([
              ["First Name", escapeHtml(data.firstName)],
              ["Last Name", escapeHtml(data.lastName)],
              [
                "Email",
                data.email
                  ? link(escapeHtml(data.email), `mailto:${data.email}`)
                  : "",
              ],
              [
                "Phone",
                data.phone ? link(escapeHtml(data.phone), `tel:${data.phone}`) : "",
              ],
            ]),
        ),

        section(
          text("Service Details:", {
            fontWeight: "bold",
            color: "#333333",
            paddingBottom: "15px",
          }) +
            detailList([
              ["Service Type", escapeHtml(data.serviceType)],
              ["Delivery Zip Code", escapeHtml(data.initialDeliveryZip)],
              ["Final Delivery Zip", escapeHtml(data.finalDeliveryZip)],
              [
                "Delivery Date",
                data.deliveryDate ? escapeHtml(formatDate(data.deliveryDate)) : "",
              ],
              ["Storage Type", escapeHtml(data.storeItType)],
            ]),
          { backgroundColor: "#f9f9f9" },
        ),

        data.promoCode
          ? section(
              text("🎉 Promo Code Used:", {
                fontWeight: "bold",
                color: "#333333",
                paddingBottom: "10px",
              }) +
                text(escapeHtml(data.promoCode), {
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: ADMIN_RED,
                }),
              { backgroundColor: "#fff3cd" },
            )
          : "",

        section(
          text(
            "<em>Please follow up with this customer as soon as possible to provide a quote and discuss their needs.</em>",
            { fontSize: "14px", color: "#666666", paddingTop: "10px" },
          ) +
            button("Reply to Customer", `mailto:${data.email}`, {
              backgroundColor: ADMIN_RED,
              color: "#ffffff",
            }),
          { borderRadius: "0 0 8px 8px" },
        ),

        section(
          text(
            ["Box Rental Now", escapeHtml(emailGlobal.phone_number)].join("<br/>"),
            {
              fontSize: "12px",
              color: "#ffffff",
              lineHeight: "1.6",
              align: "center",
            },
          ),
          { backgroundColor: "#333333", padding: "20px" },
        ),
      ].join(""),
    }),
};
