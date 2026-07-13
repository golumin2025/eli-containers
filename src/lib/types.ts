export type LinkField =
  | { kind: "url"; value: string }
  | { kind: "page"; value: string }
  | { kind: "entry"; value: string; collection: string };

export interface SeoMeta {
  seo_title?: string;
  seo_description?: string;
  og_image?: string | number;
  no_index?: boolean;
  no_follow?: boolean;
}

export interface Block {
  type: string;
  version: number;
  data: Record<string, any>;
  resolved?: Record<string, unknown>;
}

export interface Page {
  id: string | number;
  slug: string;
  title: string;
  status: "published" | "draft";
  locale: string;
  tags: string[];
  meta?: SeoMeta | null;
  seo?: SeoMeta | null;
  blocks: Block[];
  published_at: string | null;
  created_at?: string;
  updated_at: string;
}

export interface Entry {
  id: string | number;
  slug: string;
  title: string;
  status: "published" | "draft";
  locale: string;
  tags: string[];
  frontmatter: Record<string, any>;
  seo?: SeoMeta | null;
  body_markdown: string;
  collection_slug?: string;
  published_at: string | null;
  created_at?: string;
  updated_at: string;
}

export interface AssetSrcsetEntry {
  width: number;
  descriptor: string;
  url: string;
}

export interface Asset {
  id: number;
  name: string | null;
  folder: string;
  filename: string;
  content_type: string;
  byte_size: number;
  url: string;
  alt?: string | null;
  focal_x?: number;
  focal_y?: number;
  srcset?: AssetSrcsetEntry[];
}

export interface BlockTypeField {
  name: string;
  type: string;
  of_collection?: string;
}

export interface BlockType {
  slug: string;
  fields: BlockTypeField[];
}

export interface Global {
  id: string | number;
  slug: string;
  name: string;
  data: Record<string, any>;
}

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select" | "tel" | "radio" | "checkbox" | "hidden" | "date";
  required?: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
}

export interface Form {
  id: string | number;
  slug: string;
  title: string;
  status: "published" | "draft";
  fields: FormField[];
  submit_label: string;
}
