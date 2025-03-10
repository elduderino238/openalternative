import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"

export const filterSearchParams = {
  q: parseAsString.withDefault(""),
  sort: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(47),
  alternative: parseAsArrayOf(parseAsString).withDefault([]),
  category: parseAsArrayOf(parseAsString).withDefault([]),
  stack: parseAsArrayOf(parseAsString).withDefault([]),
  license: parseAsArrayOf(parseAsString).withDefault([]),
}

export const filterSearchParamsCache = createSearchParamsCache(filterSearchParams)
export type FilterSearchParams = Awaited<ReturnType<typeof filterSearchParamsCache.parse>>
