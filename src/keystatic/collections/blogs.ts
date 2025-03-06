import { fields } from "@keystatic/core";

export const blogs = {
  label: "Blogs",
  slugField: "title",
  path: "src/data/blogs/*",
  entryLayout: "content",
  format: {
    contentField: "content",
  },
  schema: {
    title: fields.slug({
      name: {
        label: "Blog Title",
      },
    }),
    blogImage: fields.image({
      label: "Blog Image",
      directory: "/public/images/",
      publicPath: "/images/",
    }),
    publicationDate: fields.text({ label: "Published On" }),
    draft: fields.checkbox({
      label: "Draft",
      defaultValue: false,
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
    content: fields.markdoc({
      label: "Page Content",
      extension: "md",
    }),
  },
} as const;
