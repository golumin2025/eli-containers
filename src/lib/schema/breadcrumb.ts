const BASE_URL = "https://www.boxrentalnow.com";

export const pageLabels: Record<string, string> = {
  "moving-services": "Moving Services",
  "storage-services": "Storage Services",
  "cold-storage-containers": "Cold Storage Containers",
  "service-areas": "Service Areas",
  "about-us": "About Us",
  "contact-us": "Contact Us",
};

export function buildBreadcrumbSchema(slug: string) {
  const label = pageLabels[slug];
  if (!label) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: label, item: `${BASE_URL}/${slug}` },
    ],
  };
}
