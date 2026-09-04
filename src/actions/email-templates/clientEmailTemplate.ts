import { formatDate } from "@utils/dateformatter";
import {
  button,
  detailList,
  divider,
  escapeHtml,
  heading,
  image,
  layout,
  section,
  text,
} from "./layout";

export const clientEmailTemplate = {
  html: (data, emailSettings, general) =>
    layout({
      preview: "Thank You for Your Cold Storage Quote Request",
      sections: [
        section(
          image(emailSettings.logo.imageUrl, emailSettings.logo.altTag),
          { padding: "20px" },
        ),

        section(
          heading("Thank You for Your Cold Storage Quote Request", {
            fontSize: "20px",
          }) + divider(),
          { borderRadius: "8px 8px 0 0" },
        ),

        section(
          detailList([
            ["First Name", escapeHtml(data.firstName) || "N/A"],
            ["Last Name", escapeHtml(data.lastName) || "N/A"],
            [
              "Delivery Zip Code",
              escapeHtml(data.initialDeliveryZip) || "N/A",
            ],
            ["Delivery Date", escapeHtml(formatDate(data.deliveryDate))],
            ["Email", escapeHtml(data.email)],
            ["Phone", escapeHtml(data.phone)],
          ]) +
            text(
              "We've received your request for cold storage services and a team member will contact you shortly to discuss your needs and provide a quote.",
              { paddingTop: "20px" },
            ) +
            text(
              `Thank You for Choosing ${escapeHtml(general.businessName)}!`,
              {
                fontSize: "18px",
                fontWeight: "bold",
                color: "#ffd51d",
                align: "center",
                paddingTop: "15px",
              },
            ) +
            button("Call Us Now", `tel:${general.phone}`),
          { borderRadius: "0 0 8px 8px" },
        ),

        section(
          text(escapeHtml(general.businessName), {
            fontSize: "12px",
            color: "#ffffff",
            lineHeight: "1.6",
            align: "center",
          }),
          { backgroundColor: "#ffd51d", padding: "20px" },
        ),
      ].join(""),
    }),
};
