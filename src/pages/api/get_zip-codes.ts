import type { APIRoute } from "astro";
import zipCodes from "../../../data/zip_codes";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(zipCodes), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
