import type {RefinerValues} from './Recipes'

export function buildArray(currentFilters: number[], slug: string, value: number, add: boolean = true) {
	if (!currentFilters || !slug || !value) { 
		 console.warn("Missing currently applied filters, current slug, or value");
		return;
	}

	const baseArray = Array.isArray(currentFilters) ? [...currentFilters] : [];


	if (add) {
		return baseArray.includes(value) ? baseArray : [...baseArray, value]
	}
	else {
		return baseArray.filter((v) => v !== value);
	}

	return null;
}

export function hasVisibleFilters(refiners: RefinerValues) {
  return Object.entries(refiners).some(([key, value]) => {
    if (key === 'pg' || value === null) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    return false;
  });
};