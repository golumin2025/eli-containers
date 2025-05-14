import { fields } from "@keystatic/core";

export const general = {
  label: "General Settings",
  path: "src/data/singletons/general",
  schema: {
    businessName: fields.text({ label: "Business Name" }),
    currentPromoCode: fields.text({ label: "Current Promo Code" }),
    logo: fields.object(
      {
        logo: fields.image({
          label: "Logo",
          directory: "/src/assets/images/general",
          publicPath: "/src/assets/images/general/",
        }),
        favicon: fields.image({
          label: "Favicon",
          directory: "public/images/favicon",
          publicPath: "/images/favicon/",
        }),
        footerLogo: fields.image({
          label: "Footer Logo",
          directory: "/src/assets/images/general",
          publicPath: "/src/assets/images/general/",
        }),
        iceLogo: fields.image({
          label: "Ice Cold Storage Logo",
          directory: "/src/assets/images/general",
          publicPath: "/src/assets/images/general/",
        }),
        iceFavicon: fields.image({
          label: "Ice Cold Storage Favicon",
          directory: "public/images/favicon",
          publicPath: "/images/favicon/",
        }),
        iceFooterLogo: fields.image({
          label: "Ice Cold Storage Footer Logo",
          directory: "/src/assets/images/general",
          publicPath: "/src/assets/images/general/",
        }),
      },
      {
        label: "Site Images",
      },
    ),
    contactInformation: fields.object(
      {
        email: fields.text({
          label: "Email Address",
        }),
        phone: fields.text({
          label: "Phone Number",
          description: "This will be used in elements like tel:",
        }),
        phoneDisplay: fields.text({
          label: "Phone Number Display",
          description: "Phone number as it appears in the user interface",
        }),
      },
      {
        label: "General Information",
      },
    ),
    businessHours: fields.text({ label: "Business Hours" }),
    analyticsScripts: fields.array(
      fields.object({
        name: fields.text({ label: "Name" }),
        scriptContent: fields.text({ label: "Script", multiline: true }),
        location: fields.select({
          label: "Location",
          options: [
            { label: "Head", value: "head" },
            { label: "Body", value: "body" },
          ],
          defaultValue: "head",
        }),
      }),
      {
        label: "Analytics Scripts",
        itemLabel: (props) => props.fields.name.value,
      },
    ),
  },
};
