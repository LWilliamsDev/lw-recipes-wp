import { parseAsString, parseAsArrayOf, parseAsInteger, type inferParserType } from 'nuqs';

export interface Term {
  term_id: number;
  term_name: string;
  taxonomy: string;
}

export interface ImageSizeDetail {
  file: string;
  width: number;
  height: number;
  "mime-type": string;
  filesize: number;
  url: string;
}

export interface Recipe {
  id: number,
  title: {
    rendered: string;
  };
  link: string;
  image?: {
    width: number;
    height: number;
    file: string;
    sizes?: {                         // optional sizes property
      [sizeName: string]: ImageSizeDetail;  // any keys with size details
    };
    alt: string;
  },
  description: string;
  course: Term[];
  diet: Term[];
  allergen: Term[];
}

export interface Results {
  result: {
    data: Recipe[];
  },
  total_pages: number;
}

export interface TaxonomyTargetHints {
  allow: string[];
}

export interface TaxonomyLink {
  href: string;
  targetHints?: TaxonomyTargetHints;
}

export interface TaxonomyLinks {
  self: TaxonomyLink[];
  collection: TaxonomyLink[];
  about: TaxonomyLink[];
  'wp:post_type': TaxonomyLink[];
  curies: { name: string; href: string; templated: boolean }[];
}

export interface TaxonomyItem {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
  _links: TaxonomyLinks;
}

export type TaxonomyItems = TaxonomyItem[];

export const refinersSchema = {
  search: parseAsString,
  course: parseAsArrayOf(parseAsInteger, '+'),
  diet: parseAsArrayOf(parseAsInteger, '+'),
  allergen: parseAsArrayOf(parseAsInteger, '+'),
  pg: parseAsInteger,
};

export type RefinerValues = inferParserType<typeof refinersSchema>;
export type RefinerKeys = Extract<keyof RefinerValues, string>;