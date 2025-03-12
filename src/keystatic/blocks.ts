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
    quoteFormTitle: fields.text({ label: "Quote Form Title" }),
  }),
};

export const howPodsWork = {
  label: "How MI-BOX Moving & Mobile Storage Works",
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
    cards: fields.array(
      fields.object({
        title: fields.text({ label: "Tab Title" }),
        image: fields.image({
          label: "Image URL",
          directory: "/src/assets/images/",
          publicPath: "/src/assets/images/",
        }),

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
  label: "MI-BOX Moving & Mobile Storage Helping Binto Grid",
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

export const singleHero = {
  label: "Single Hero",
  schema: fields.object({
    bgImage: fields.image({
      label: "BackGround Image",
      directory: "/src/assets/images",
      publicPath: "/src/assets/images",
    }),
    title: fields.text({ label: "Title" }),
    description: fields.text({ label: "Description", multiline: true }),
  }),
};

export const storageOptions = {
  label: "Storage Options",
  schema: fields.object({
    title: fields.text({ label: "Title" }),
    cards: fields.array(
      fields.object({
        image: fields.image({
          label: "Image",
          directory: "/src/assets/images",
          publicPath: "/src/assets/images",
        }),
        size: fields.text({ label: "Size" }),
        dimension: fields.text({ label: "Dimension" }),
        description: fields.array(fields.text({ label: "Description" }), {
          label: "Description Items",
        }),
        link: fields.text({ label: "CTA Link" }),
      }),
      {
        label: "Storage Containers",
        itemLabel: (item) => item.fields.size.value,
      },
    ),
  }),
};

export const protectionConvenience = {
  label: "Protection & Convenience Features",
  schema: fields.object({
    title: fields.text({ label: "Title" }),
    cards: fields.array(
      fields.object({
        icon: fields.image({
          label: "Icon",
          directory: "/src/assets/icons",
          publicPath: "/src/assets/icons",
        }),
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true }),
      }),
      {
        label: "Storage Containers",
        itemLabel: (item) => item.fields.title.value,
      },
    ),
  }),
};

export const twoCol = {
  label: "Two Column",
  schema: fields.object({
    heading: fields.text({ label: "Heading" }),
    description: fields.markdoc.inline({ label: "Description" }),
    media: fields.conditional(
      fields.checkbox({
        label: "Use Video Instead of Image",
        defaultValue: false,
      }),
      {
        true: fields.object({
          videoUrl: fields.text({ label: "Video URL" }),
          videoTitle: fields.text({ label: "Video Title" }),
        }),
        false: fields.object({
          image: fields.image({
            label: "Image",
            directory: "/src/assets/images",
            publicPath: "/src/assets/images",
          }),
        }),
      }
    ),
    imagePlacement: fields.select({
      label: "Image Placement",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      defaultValue: "left",
    }),
    colors: fields.select({
      label: "Color Scheme",
      options: [
        { label: "#0069e5", value: "#0069e5" },
        { label: "#0069e5 with 5 opacity", value: "#0069e5/5" },
      ],
      defaultValue: "#0069e5/5",
    }),
    button: fields.object({
      label: fields.text({ label: "Button Label" }),
      link: fields.text({ label: "Button Link" }),
    }),
  }),
};


export const cards = {
  label: "Cards With Title",
  schema: fields.object({
    title: fields.text({ label: "Title" }),
    cards: fields.array(
      fields.object({
        image: fields.image({
          label: "Image",
          directory: "/src/assets/images",
          publicPath: "/src/assets/images",
        }),
        title: fields.text({ label: "Title" }),
        description: fields.markdoc.inline({ label: "Description" }),
      }),
      {
        label: "Storage Containers",
        itemLabel: (item) => item.fields.title.value,
      },
    ),
  }),
};
