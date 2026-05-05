const BASE_URL = "https://www.boxrentalnow.com";
const PROVIDER = { "@id": `${BASE_URL}/#business` };
const AREA_SERVED = [
  { "@type": "AdministrativeArea", name: "Manatee County, Florida" },
  { "@type": "AdministrativeArea", name: "Sarasota County, Florida" },
];

export const movingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Portable Moving Container Service",
  name: "Portable Moving Services",
  provider: PROVIDER,
  areaServed: AREA_SERVED,
  description:
    "Door-to-door portable moving container service throughout the Gulf Coast. We deliver, you load at your pace, and we move the container to your new destination.",
  url: `${BASE_URL}/moving-services`,
};

export const storageServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Portable Self Storage",
  name: "Portable Storage Container Rental",
  provider: PROVIDER,
  areaServed: AREA_SERVED,
  description:
    "On-site or off-site portable storage container rentals in 8ft, 16ft, and 20ft sizes. Weather-tight, ground-level loading, secure rollup doors.",
  url: `${BASE_URL}/storage-services`,
};

export const coldStorageServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Refrigerated Container Rental",
  name: "Cold Storage Container Rental",
  provider: PROVIDER,
  areaServed: AREA_SERVED,
  description:
    "Refrigerated cold storage container rentals for events, restaurants, and contractors throughout the Gulf Coast.",
  url: `${BASE_URL}/cold-storage-containers`,
};

export const serviceSchemaMap: Record<string, object> = {
  "moving-services": movingServiceSchema,
  "storage-services": storageServiceSchema,
  "cold-storage-containers": coldStorageServiceSchema,
};
