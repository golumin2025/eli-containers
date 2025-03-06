import { fields } from "@keystatic/core";

export const footer = {
  label: "Footer",
  path: "src/data/footer/",
  schema: {
    address: fields.text({ label: "Location Address", multiline: true }),
    socials: fields.array(
      fields.object({
        name: fields.text({ label: "Name" }),
        link: fields.text({ label: "Link" }),
        icon: fields.image({
          label: "icon",
          directory: "/public/images/",
          publicPath: "/images/",
        }),
      }),
      {
        label: "Social Links List",
        itemLabel: (props) => props.fields.name.value,
      },
    ),
  },
};
