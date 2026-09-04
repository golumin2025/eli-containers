import { capitalizeFirstLetter } from "@utils/Capitilized";
import { formatDate } from "@utils/dateformatter";
import {
  detailList,
  divider,
  escapeHtml,
  heading,
  image,
  layout,
  section,
  text,
} from "./layout";

export const excludedZipCodeAdminEmailTemplate = {
  html: (data, emailSettings, general) =>
    layout({
      preview: "Out of Service Area Submission",
      sections: [
        section(
          image(emailSettings.logo.imageUrl, emailSettings.logo.altTag),
          { padding: "20px" },
        ),

        section(
          heading("Out of Service Area Submission", { fontSize: "20px" }) +
            divider(),
          { borderRadius: "8px 8px 0 0" },
        ),

        section(
          detailList([
            [
              "Service Type",
              data.serviceType
                ? escapeHtml(capitalizeFirstLetter(data.serviceType))
                : "",
            ],
            ["First Name", escapeHtml(data.firstName) || "N/A"],
            ["Last Name", escapeHtml(data.lastName) || "N/A"],
            [
              "Initial Delivery Zip Code",
              escapeHtml(data.initialDeliveryZip) || "N/A",
            ],
            ["Final Delivery Zip Code", escapeHtml(data.finalDeliveryZip)],
            ["Delivery Date", escapeHtml(formatDate(data.deliveryDate))],
            ["Email", escapeHtml(data.email)],
            ["Phone", escapeHtml(data.phone)],
          ]),
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
