import { fields } from "@keystatic/core";
import {
  featuredImage,
  howPodsWork,
  mainHero,
  findYouFit,
  reviewsSlider,
  faqs,
  masonaryGallery,
  podsHelpingBintoGrid,
} from "@keystatic/blocks";

export const pages = {
  label: "Pages",
  slugField: "title",
  path: "src/data/pages/*" as const,
  schema: {
    title: fields.slug({
      name: {
        label: "Page Title",
      },
    }),
    seoData: fields.object({
      seoTitle: fields.text({ label: "SEO Title" }),
      seoDescription: fields.text({
        label: "SEO Description",
        multiline: true,
      }),
      ogImage: fields.image({
        label: "Open Graph Image",
        directory: "/public/images/seo/",
        publicPath: "/images/seo/",
      }),
    }),
    blocks: fields.blocks(
      {
        mainHero,
        howPodsWork,
        featuredImage,
        reviewsSlider,
        findYouFit,
        faqs,
        masonaryGallery,
        podsHelpingBintoGrid
      },
      { label: "Blocks" },
    ),
  },
} as const;
