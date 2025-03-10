import { fields } from "@keystatic/core";

export const mainHero = {
  label: "Main Hero",
  schema: fields.object({
    Sliderimages: fields.array(
      fields.object({
        image: fields.image({
          label: "Slider",
          directory: "/public/images/home",
          publicPath: "/images/home",
        }),
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true }),
      }),
      {
        label: "Slider Images",
        itemLabel: (props) => props.fields.title.value,
      },
    ),
  }),
};

export const howPodsWork = {
  label: "How Rocket Shell Portable Storage Works",
  schema: fields.object({
    heading: fields.text({ label: "Heading" }),
    tabs: fields.array(
      fields.object({
        title: fields.text({ label: "Tab Title" }),
        steps: fields.array(
          fields.object({
            title: fields.text({ label: "Step Title" }),
            description: fields.text({
              label: "Step Description",
              multiline: true,
            }),
          }),
          {
            label: "Steps",
            itemLabel: (props) => props.fields.title.value,
          },
        ),
      }),
      {
        label: "Tabs",
        itemLabel: (props) => props.fields.title.value,
      },
    ),
  }),
};

export const findYouFit = {
  label: "Find Your Fit",
  schema: fields.object({
    heading: fields.text({ label: "Heading" }),
    tabs: fields.array(
      fields.object({
        title: fields.text({ label: "Tab Title" }),
        images: fields.array(
          fields.image({
            label: "Image URL",
            directory: "/src/assets/images/",
            publicPath: "/src/assets/images/",
          }),
          { label: "Images" },
        ),
        description: fields.text({ label: "Description", multiline: true }),
        dimensions: fields.text({ label: "Dimensions" }),
        storageSize: fields.text({ label: "Storage Size" }),
        fits: fields.text({ label: "Fits" }),
      }),
      {
        label: "Tabs",
        itemLabel: (props) => props.fields.title.value,
      },
    ),
  }),
};

export const featuredImage = {
  label: "Featured Image",
  schema: fields.object({
    image: fields.image({
      label: "Image",
      directory: "/src/assets/images/",
      publicPath: "/src/assets/images/",
    }),
    title: fields.text({ label: "Title" }),
    description: fields.text({ label: "Description", multiline: true }),
  }),
};

export const reviewsSlider = {
  label: "Reviews Slider",
  schema: fields.object({
    title: fields.text({ label: "title" }),
    logos: fields.array(
      fields.object({
        image: fields.image({
          label: "Logo",
          directory: "/src/assets/images/",
          publicPath: "/src/assets/images/",
        }),
      }),
      {
        label: "Logos",
      },
    ),
  }),
};

export const faqs = {
  label: "FAQs",
  schema: fields.object({
    title: fields.text({ label: "Title" }),
    faqs: fields.array(
      fields.object({
        question: fields.text({ label: "Question" }),
        answer: fields.markdoc.inline({ label: "Answer" }),
      }),
      {
        label: "FAQs",
        itemLabel: (props) => props.fields.question.value,
      },
    ),
  }),
};

export const masonaryGallery = {
  label: "Masonary Gallery",
  schema: fields.object({
    title: fields.text({ label: "Title" }),
    images: fields.array(
      fields.image({
        label: "Image",
        directory: "/src/assets/images/",
        publicPath: "/src/assets/images/",
      }),
      {
        label: "Images",
      },
    ),
  }),
};

export const podsHelpingBintoGrid = {
  label: "Rocket Shell Portable Storage Helping Binto Grid",
  schema: fields.object({
    heading: fields.text({ label: "Heading" }),
    cards: fields.array(
      fields.object({
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true }),
        image: fields.image({
          label: "Image",
          directory: "/src/assets/images",
        }),
        icon: fields.image({ label: "Icon", directory: "/src/assets/icons" }),
        size: fields.select({
          label: "Size",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Wide", value: "wide" },
            { label: "Tall", value: "tall" },
          ],
          defaultValue: "normal",
        }),
      }),
    ),
  }),
};
