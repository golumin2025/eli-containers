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

export const formSubmissionClientEmail = {
  html: (data, emailGlobal) => {
    const fullName = [data.firstName, data.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    return layout({
      preview: "Thank you for your submission",
      sections: [
        section(image(emailGlobal.image_url_for_email, "Logo"), {
          padding: "20px",
        }),

        section(
          heading("Thank You for Your Submission!") + divider(),
          { borderRadius: "8px 8px 0 0" },
        ),

        section(
          text(`Hello ${escapeHtml(fullName)},`) +
            text(
              "Thank you for contacting us! We've received your submission and a team member will be in touch with you shortly to discuss your needs.",
              { paddingTop: "10px" },
            ),
        ),

        section(
          text("Submission Details:", {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#333333",
            paddingBottom: "10px",
          }) +
            detailList([
              ["First Name", escapeHtml(data.firstName)],
              ["Last Name", escapeHtml(data.lastName)],
              ["Email", escapeHtml(data.email)],
              ["Phone", escapeHtml(data.phone)],
              ["Service Type", escapeHtml(data.serviceType)],
              ["Delivery Zip Code", escapeHtml(data.initialDeliveryZip)],
              ["Final Delivery Zip", escapeHtml(data.finalDeliveryZip)],
              [
                "Delivery Date",
                data.deliveryDate ? escapeHtml(formatDate(data.deliveryDate)) : "",
              ],
              ["Storage Type", escapeHtml(data.storeItType)],
              ["Promo Code", escapeHtml(data.promoCode)],
            ]),
          { backgroundColor: "#f9f9f9" },
        ),

        section(
          text("If you have any immediate questions, feel free to call us:", {
            paddingTop: "10px",
          }) + button("Call Us Now", `tel:${emailGlobal.phone_number}`),
          { borderRadius: "0 0 8px 8px" },
        ),

        section(
          text(
            [
              "Box Rental Now",
              escapeHtml(emailGlobal.phone_number),
              link("Visit Our Website", "https://www.boxrentalnow.com", "#ffffff"),
            ].join("<br/>"),
            {
              fontSize: "12px",
              color: "#ffffff",
              lineHeight: "1.6",
              align: "center",
            },
          ),
          { backgroundColor: "#ffd51d", padding: "20px" },
        ),
      ].join(""),
    });
  },
};
