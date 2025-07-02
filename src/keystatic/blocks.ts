import { fields } from "@keystatic/core";

export const mainHero = {
  label: "Main Hero",
  schema: fields.object({
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
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
      }
    ),
    quoteFormTitle: fields.text({ label: "Quote Form Title" }),
  }),
};

export const howPodsWork = {
  label: "How MI-BOX Moving & Mobile Storage Works",
  schema: fields.object({
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
    heading: fields.text({ label: "Heading" }),
    featuredMedia: fields.conditional(
      // First, define a `select` field with all the available "conditions"
      fields.select({
        label: "Featured media",
        description: "Optional image/video options.",
        options: [
          { label: "Image", value: "image" },
          { label: "Video", value: "video" },
        ],
        defaultValue: "image",
      }),
      // Then, provide a schema for each condition
      {
        image: fields.object({
          asset: fields.image({
            label: "Image",
            directory: "public/images/events",
            publicPath: "/images/events/",
            validation: { isRequired: true },
          }),
          alt: fields.text({ label: "Alt", description: "Image alt text." }),
        }),
        // "video" condition
        video: fields.object({
          url: fields.text({
            label: "A YouTube Video ID.",
            validation: { length: { min: 1 } },
          }),
        }),
      }
    ),
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
          }
        ),
      }),
      {
        label: "Tabs",
        itemLabel: (props) => props.fields.title.value,
      }
    ),
  }),
};

export const findYouFit = {
  label: "Find Your Fit",
  schema: fields.object({
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
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
      }
    ),
  }),
};

export const featuredImage = {
  label: "Featured Image",
  schema: fields.object({
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
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
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
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
      }
    ),
  }),
};

export const faqs = {
  label: "FAQs",
  schema: fields.object({
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
    title: fields.text({ label: "Title" }),
    faqs: fields.array(
      fields.object({
        question: fields.text({ label: "Question" }),
        answer: fields.markdoc.inline({ label: "Answer" }),
      }),
      {
        label: "FAQs",
        itemLabel: (props) => props.fields.question.value,
      }
    ),
  }),
};

export const masonaryGallery = {
  label: "Masonary Gallery",
  schema: fields.object({
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
    title: fields.text({ label: "Title" }),
    images: fields.array(
      fields.image({
        label: "Image",
        directory: "/src/assets/images/",
        publicPath: "/src/assets/images/",
      }),
      {
        label: "Images",
      }
    ),
  }),
};

export const podsHelpingBintoGrid = {
  label: "MI-BOX Moving & Mobile Storage Helping Binto Grid",
  schema: fields.object({
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
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
      })
    ),
  }),
};

export const singleHero = {
  label: "Single Hero",
  schema: fields.object({
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
    bgImage: fields.image({
      label: "BackGround Image",
      directory: "/src/assets/images",
      publicPath: "/src/assets/images",
    }),
    title: fields.text({ label: "Title" }),
    description: fields.text({ label: "Description", multiline: true }),
    showQuoteForm: fields.checkbox({
      label: "Show Quote Form",
      defaultValue: true,
    }),
    showColdFrom: fields.checkbox({
      label: "Show Cold Form",
      defaultValue: false,
    }),
  }),
};

export const storageOptions = {
  label: "Storage Options",
  schema: fields.object({
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
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
      }
    ),
  }),
};

export const protectionConvenience = {
  label: "Protection & Convenience Features",
  schema: fields.object({
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
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
      }
    ),
  }),
};

export const twoCol = {
  label: "Two Column",
  schema: fields.object({
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
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
    anchorLink: fields.text({
      label: "Anchor Link",
      description:
        "Add an ID that can be used to navigate to this section (without #). Other blocks can link to this section using #your-id",
    }),
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
      }
    ),
  }),
};

export const richText = {
  label: "Rich Text",
  schema: fields.object({
    isCentered: fields.checkbox({
      label: "Centered text",
      defaultValue: false,
    }),
    content: fields.markdoc.inline({
      label: "Content",
      options: {
        image: {
          directory: "/public/images/",
          publicPath: "/images/",
        },
      },
    }),
  }),
};

export const CustomNav = {
  label: "Custom Navigation",
  schema: fields.object({
    logo: fields.image({
      label: "Logo",
      directory: "/public/images", // directory relative to project root
      publicPath: "/images", // public path used in browser
    }),
    anchorLink: fields.text({
      label: "Anchor Link",
    }),
    items: fields.array(
      fields.object({
        title: fields.text({ label: "Title" }),
        link: fields.text({ label: "Link" }),
      }),
      {
        label: "Navigation Items",
        itemLabel: (item) => item.fields.title.value,
      }
    ),
  }),
};
