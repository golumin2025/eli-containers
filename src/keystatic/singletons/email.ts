import { fields } from "@keystatic/core";

export const email = {
  label: "Emails",
  path: "src/data/singletons/email",
  schema: {
    logo: fields.object(
      {
        imageUrl: fields.text({
          label: "Image URL",
        }),
        altTag: fields.text({ label: "Alt Text" }),
      },
      {
        label: "Email Logo",
        description:
          "This is the logo that will show at the top of your emails.",
      },
    ),
    fromEmail: fields.text({
      label: "Email Address",
      description:
        "This is the email address from which emails are sent. Please do not change this without first confirming with the development team.",
    }),
    fromEmailName: fields.text({
      label: "Email Name",
      description:
        "This is that will show in emails sent from the website in the 'From' field.",
    }),
    adminEmailRecipients: fields.array(
      fields.object({
        name: fields.text({ label: "Name" }),
        email: fields.text({ label: "Email" }),
      }),
      {
        label: "Admin Email Recipients",
        itemLabel: (props) => props.fields.name.value,
      },
    ),
    clientEmailRecipientsBcc: fields.array(
      fields.object({
        name: fields.text({ label: "Name" }),
        email: fields.text({ label: "Email" }),
      }),
      {
        label: "Client Email BCC Recipients",
        itemLabel: (props) => props.fields.name.value,
      },
    ),
    outOfTerritoryRecipients: fields.array(
      fields.object({
        name: fields.text({ label: "Name" }),
        email: fields.text({ label: "Email" }),
      }),
      {
        label: "Out of Territory Recipients",
        itemLabel: (props) => props.fields.name.value,
      },
    ),
  },
};
