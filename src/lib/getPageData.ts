import { readItems, readSingleton } from "@directus/sdk";
import directus from "./directus";
import { fields } from "@keystatic/core";

const defaultFields = [
  "*",
  {
    blocks: [
      "id",
      "collection",
      {
        item: [
          "*",
          { image: ["*"] },
          { bg_image: ["*"] },
          { images: ["*", { image_id: ["*", { image: ["*"] }] }] },
          { category: ["*"] },
          { logos: ["*"] },
          { button: ["*"] },
          { sub_buttons: ["*", { button_id: ["*"] }] },
          { buttons: ["*", { button_id: ["*"] }] },
          { list: ["*", { accordion_id: ["*"] }] },
          { tabs: ["*", { tabs_id: ["*"] }] },
          {
            main_button: ["*"],
          },
          { images: ["*", { gallery_card_id: ["*"] }] },
          {
            cards: [
              "*",
              {
                testimonial_card_id: ["*"],
                why_us_card_id: ["*", { image: ["*"] }],
                container_card_id: ["*", { image: ["*"] }],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getPages = async () => {
  try {
    const queryObj = {
      fields: defaultFields,
    };

    //@ts-ignore
    const data: any = await directus.request(readItems("pages", queryObj));

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
};
export const getPost = async () => {
  try {
    const queryObj = {
      sort: ["-publication_date"],
      fields: ["*", { blog_image: ["*"], category: ["*"], author: ["*"] }],
      filter: {
        status: {
          _eq: "published",
        },
      },
    };

    //@ts-ignore
    const data: any = await directus.request(readItems("blogs", queryObj));

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getSinglePost = async (
  collection: string,
  slugOrPermalink: string,
) => {
  const cleanSlug = slugOrPermalink.replace(/^\//, "");

  try {
    const queryObj = {
      fields: ["*", { blog_image: ["*"] }],
      filter: {
        _or: [
          {
            link: {
              _eq: `/${cleanSlug}`,
            },
          },
          {
            link: {
              _eq: cleanSlug,
            },
          },
        ],
        status: {
          _eq: "published",
        },
      },
      limit: 1,
    };

    //@ts-ignore
    const data: any = await directus.request(readItems(collection, queryObj));

    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
};

export const getGlobal = async () => {
  try {
    //@ts-ignore
    const data: any = await directus.request(
      readItems("global", {
        fields: ["*", { logo: ["*"] }, { ice_logo: ["*"] }],
      }),
    );

    return data;
  } catch (error) {
    console.error("Error fetching global data:", error);
    return error;
  }
};

export const getSinglePage = async (
  collection: string,
  slugOrPermalink: string,
) => {
  const cleanSlug = slugOrPermalink.replace(/^\//, "");

  try {
    const queryObj = {
      fields: defaultFields,
      filter: {
        _or: [
          {
            slug: {
              _eq: `/${cleanSlug}`,
            },
          },
          {
            slug: {
              _eq: cleanSlug,
            },
          },
        ],
      },
      limit: 1,
    };

    //@ts-ignore
    const data: any = await directus.request(readItems(collection, queryObj));

    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
};

export const getNavbar = async () => {
  try {
    const data: any = await directus.request(
      readSingleton("header", {
        fields: [
          "*",
          {menu_items:["*",{nav_item_id:["*"]}]},
          {
            menu: [
              "*",
              {
                nav_item_id: ["*"],
              },
            ],
          },
        ],
      }),
    );

    return data || null;
  } catch (error) {
    console.error("Error fetching navbar:", error);
    return null;
  }
};

export const getFooter = async () => {
  try {
    const data: any = await directus.request(
      readSingleton("footer", {
        fields: [
          "*",
          {
            footer_items: ["*", { footer_item_id: ["*"] }],
          },
        ],
      }),
    );

    return data || null;
  } catch (error) {
    console.error("Error fetching footer:", error);
    return null;
  }
};

export const getTopBar = async () => {
  try {
    const data: any = await directus.request(
      readSingleton("top_bar", {
        fields: ["*"],
      }),
    );

    return data || null;
  } catch (error) {
    console.error("Error fetching topbar:", error);
    return null;
  }
};
export const getRedirects = async () => {
  try {
    const data: any = await directus.request(
      readItems("seo_redirection", {
        fields: ["*"],
      }),
    );

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching redirects:", error);
    return [];
  }
};
