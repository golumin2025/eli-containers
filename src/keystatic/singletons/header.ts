import { fields } from "@keystatic/core";

export const header = {
  label: "Header",
  path: "src/data/singletons/header",
  schema: {
    subHeader: fields.text({ label: "Sub Header" }),
    menuItems: fields.array(
      fields.object({
        name: fields.text({ label: "Name" }),
        link: fields.text({ label: "Link" }),
        subMenu: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            link: fields.text({ label: "Link" }),
          }),
          {
            label: "Sub Menu",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      }),
      {
        label: "Menu Items",
        itemLabel: (props) => props.fields.name.value,
      }
    ),
    button: fields.object({
      enable: fields.checkbox({ label: "Enable" }),
      label: fields.text({ label: "Label" }),
      link: fields.text({ label: "Link" }),
    }),

  },
};
