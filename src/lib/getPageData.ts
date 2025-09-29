import { readItems, readSingleton } from "@directus/sdk";
import directus from "./directus";
const defaultFields = [
  "*",
  {
    blocks: [
      "id",
      "collection",
      {
        item: [
          "*",
          { images: ["*", { image_id: ["*"] }] },
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
                why_us_card_id: ["*"],
                container_card_id: ["*"],
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
    //@ts-ignore
    const data: any = await directus.request(readItems("blogs"));

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
};

export const getSinglePost = async (
  collection: string,
  slugOrPermalink: string
) => {
  try {
    const queryObj = {
      filter: {
        link: {
          _eq: `/${slugOrPermalink.replace(/^\//, "")}`,
        },
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
    const data: any = await directus.request(readItems("global"));

    return data;
  } catch (error) {
    console.error("Error fetching global data:", error);
    return error;
  }
};

export const getSinglePage = async (
  collection: string,
  slugOrPermalink: string
) => {
  try {
    const queryObj = {
      fields: defaultFields,
      filter: {
        slug: {
          _eq: `/${slugOrPermalink.replace(/^\//, "")}`,
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

export const getNavbar = async () => {
  try {
    const data: any = await directus.request(
      readSingleton("header", {
        fields: [
          "*",
          {
            menu: [
              "*",
              {
                nav_item_id: ["*"],
              },
            ],
          },
        ],
      })
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
      })
    );

    return data || null;
  } catch (error) {
    console.error("Error fetching footer:", error);
    return null;
  }
};
