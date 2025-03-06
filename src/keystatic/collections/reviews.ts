import { fields } from "@keystatic/core";

export const reviews = {
  label: "Reviews",
  slugField: "name",
  path: "src/data/reviews/*" as const,
  schema: {
    name: fields.slug({
      name: {
        label: "Name",
      },
    }),
    content: fields.text({
      label: "Review",
      multiline: true,
    }),
  },
} as const;
