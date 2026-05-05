const STORAGE_PAGE = "https://www.boxrentalnow.com/storage-services";
const SELLER = { "@id": "https://www.boxrentalnow.com/#business" };

export const container8ftSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "8ft Portable Storage Container Rental",
  image: "https://cms.boxrentalnow.com/assets/7aee68b6-7b3e-470e-96df-b3694ad07652",
  description:
    "8ft x 8ft x 8ft portable storage and moving container. Ideal for storing the contents of a studio apartment, including boxes, kitchen appliances, a small mattress set, chairs, or a motorcycle. Delivered to your door in Sarasota, Bradenton, and the Gulf Coast.",
  brand: { "@type": "Brand", name: "Box Rental Now" },
  category: "Portable Storage Container",
  width: { "@type": "QuantitativeValue", value: "8", unitCode: "FOT" },
  depth: { "@type": "QuantitativeValue", value: "8", unitCode: "FOT" },
  height: { "@type": "QuantitativeValue", value: "8", unitCode: "FOT" },
  offers: {
    "@type": "Offer",
    url: STORAGE_PAGE,
    availability: "https://schema.org/InStock",
    seller: SELLER,
  },
};

export const container16ftSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "16ft Portable Storage Container Rental",
  image: "https://cms.boxrentalnow.com/assets/3e1d6949-84f1-4ac4-a2c3-2749071a6238",
  description:
    "16ft x 8ft x 8ft portable storage and moving container. Commonly holds 3-4 rooms. Perfect for entertainment centers, king-size mattresses, larger appliances, dining room furniture, and boxes.",
  brand: { "@type": "Brand", name: "Box Rental Now" },
  category: "Portable Storage Container",
  width: { "@type": "QuantitativeValue", value: "16", unitCode: "FOT" },
  depth: { "@type": "QuantitativeValue", value: "8", unitCode: "FOT" },
  height: { "@type": "QuantitativeValue", value: "8", unitCode: "FOT" },
  offers: {
    "@type": "Offer",
    url: STORAGE_PAGE,
    availability: "https://schema.org/InStock",
    seller: SELLER,
  },
};

export const container20ftSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "20ft Portable Storage Container Rental",
  image: "https://cms.boxrentalnow.com/assets/c88b5d21-4f7b-4b05-91d0-8d10887cc334",
  description:
    "20ft x 8ft x 8ft portable storage and moving container. Commonly holds 4-5 rooms. Ideal for whole-home moves, large remodeling and restoration projects, and commercial storage needs.",
  brand: { "@type": "Brand", name: "Box Rental Now" },
  category: "Portable Storage Container",
  width: { "@type": "QuantitativeValue", value: "20", unitCode: "FOT" },
  depth: { "@type": "QuantitativeValue", value: "8", unitCode: "FOT" },
  height: { "@type": "QuantitativeValue", value: "8", unitCode: "FOT" },
  offers: {
    "@type": "Offer",
    url: STORAGE_PAGE,
    availability: "https://schema.org/InStock",
    seller: SELLER,
  },
};

export const containerProductSchemas = [
  container8ftSchema,
  container16ftSchema,
  container20ftSchema,
];
