import { fields } from "@keystatic/core";


export const topbar = {
    label: "TopBar",
    path: "src/data/singletons/topbar",
    schema: {
        heading: fields.text({ label: "Heading" })
    }
}