import { createDirectus, rest } from "@directus/sdk";

const URL = import.meta.env.PUBLIC_DIRECTUS_URL;

const directus = createDirectus(URL).with(rest());

export default directus;
