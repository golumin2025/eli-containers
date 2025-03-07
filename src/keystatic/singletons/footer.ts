import { fields } from "@keystatic/core";

export const footer = {
  label: "Footer",
  path: "src/data/singletons/footer",
  schema: {
    navitems: fields.array(
      fields.object({
        title: fields.text({ label: "Section Title" }),
        links: fields.array(
          fields.object({
            name: fields.text({ label: "Link Name" }),
            url: fields.text({ label: "URL" }),
          }),
          {
            label: "Links",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      }),
      {
        label: "Footer Navitems",
        itemLabel: (props) => props.fields.title.value,

      }
    ),
    socialLinks: fields.array(
      fields.object({
        icon: fields.image({
          label: "Icon",
          directory: "/src/assets/images/social/",
          publicPath: "/src/assets/images/social/",
        }),
        url: fields.text({ label: "URL" }),
      }),
      { label: "Social Links" }
    ),
    legal: fields.array(
      fields.object({
        title: fields.text({ label: "Title" }),
        link: fields.text({ label: "Link" }),
      }),
      {
        label: "Legal",
        itemLabel: (props) => props.fields.title.value,
      }
    )
  },
};
