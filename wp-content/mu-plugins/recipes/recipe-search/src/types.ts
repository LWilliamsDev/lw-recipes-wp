import { parseAsString, parseAsNativeArrayOf, parseAsInteger, type inferParserType } from 'nuqs';

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

export interface InitialRecipeData {
  result: string;
  pagination: string;
  taxonomies: {
    course: TaxonomyItem[];
    diet: TaxonomyItem[];
    allergen: TaxonomyItem[];
  };
}

declare global {
  interface Window {
    INITIAL_RECIPE_DATA?: InitialRecipeData;
  }
}

export interface TaxonomyItem {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export type TaxonomyItems = TaxonomyItem[];


export const refinersSchema = {
  search: parseAsString,
  course: parseAsNativeArrayOf(parseAsInteger),
  diet: parseAsNativeArrayOf(parseAsInteger),
  allergen: parseAsNativeArrayOf(parseAsInteger),
  pg: parseAsInteger,
};

export type RefinerValues = inferParserType<typeof refinersSchema>;
export type RefinerKeys = Extract<keyof RefinerValues, string>;