const BASE_URL = "https://www.boxrentalnow.com";

export const movingCompanySchema = {
  "@context": "https://schema.org",
  "@type": ["MovingCompany", "SelfStorage"],
  "@id": `${BASE_URL}/#business`,
  name: "Box Rental Now",
  alternateName: "MI-BOX of the Gulf Coast",
  legalName: "MI-BOX of the Gulf Coast LLC",
  url: `${BASE_URL}/`,
  logo: "https://cms.boxrentalnow.com/assets/a56bb137-6391-4cb4-8533-8182c84fe58a",
  image: "https://cms.boxrentalnow.com/assets/9f09b51a-80c9-4e01-9fa9-b282904c4322",
  description:
    "Box Rental Now offers portable moving and storage container rentals throughout Manatee and Sarasota Counties, Florida. Locally owned, weather-tight containers in 8ft, 16ft, and 20ft sizes delivered to your door.",
  telephone: "+1-941-777-7269",
  priceRange: "$$",
  currenciesAccepted: "USD",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6510 3rd Ave W Suite 204",
    addressLocality: "Bradenton",
    addressRegion: "FL",
    postalCode: "34209",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 27.4985114,
    longitude: -82.6276828,
  },
  hasMap:
    "https://www.google.com/maps/place/MI-BOX+Moving+%26+Mobile+Storage+(of+the+Gulf+Coast)/@27.4985114,-82.6276828,17z/",
  areaServed: [
    { "@type": "City", name: "Sarasota", containedInPlace: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Bradenton", containedInPlace: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Palmetto", containedInPlace: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Parrish", containedInPlace: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Venice", containedInPlace: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "North Port", containedInPlace: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "Tampa", containedInPlace: { "@type": "State", name: "Florida" } },
    { "@type": "City", name: "St. Petersburg", containedInPlace: { "@type": "State", name: "Florida" } },
    { "@type": "AdministrativeArea", name: "Manatee County, Florida" },
    { "@type": "AdministrativeArea", name: "Sarasota County, Florida" },
  ],
  sameAs: [
    "https://www.facebook.com/miboxgulfcoast/",
    "https://www.linkedin.com/company/mi-box-moving-and-mobile-storage-gulf-coast",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Portable Storage Container Rentals",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Portable Moving Container Rental" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Portable Storage Container Rental" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cold Storage Container Rental" } },
    ],
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Box Rental Now",
  url: `${BASE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: "https://cms.boxrentalnow.com/assets/a56bb137-6391-4cb4-8533-8182c84fe58a",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-941-777-7269",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.facebook.com/miboxgulfcoast/",
    "https://www.linkedin.com/company/mi-box-moving-and-mobile-storage-gulf-coast",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: `${BASE_URL}/`,
  name: "Box Rental Now",
  publisher: { "@id": `${BASE_URL}/#organization` },
};
