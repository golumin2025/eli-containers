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

export const adminEmailTemplate = {
  html: (data, emailSettings, general) =>
    layout({
      preview: "New Cold Storage Quote Request",
      sections: [
        section(
          image(emailSettings.logo.imageUrl, emailSettings.logo.altTag),
          { padding: "20px" },
        ),

        section(
          heading("New Cold Storage Quote Request", { fontSize: "20px" }) +
            divider(),
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
          ]) + button("Reply to Customer", `mailto:${data.email}`),
          { borderRadius: "0 0 8px 8px" },
        ),

        section(
          text(
            [
              escapeHtml(general.businessName),
              escapeHtml(general.contactInformation.phoneDisplay),
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
    }),
};
