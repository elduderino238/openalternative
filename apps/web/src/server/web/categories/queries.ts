import { db } from "@openalternative/db"
import { type Prisma, ToolStatus } from "@openalternative/db/client"
import { unstable_cacheTag as cacheTag } from "next/cache"
import { categoryManyPayload, categoryOnePayload } from "~/server/web/categories/payloads"

export const findCategories = async ({ where, orderBy, ...args }: Prisma.CategoryFindManyArgs) => {
  "use cache"

  cacheTag("categories")

  return db.category.findMany({
    ...args,
    orderBy: orderBy ?? { name: "asc" },
    where: { tools: { some: { status: ToolStatus.Published } }, ...where },
    select: categoryManyPayload,
  })
}

export const findCategorySlugs = async ({
  where,
  orderBy,
  ...args
}: Prisma.CategoryFindManyArgs) => {
  "use cache"

  cacheTag("categories")

  return db.category.findMany({
    ...args,
    orderBy: orderBy ?? { name: "asc" },
    where: { tools: { some: { status: ToolStatus.Published } }, ...where },
    select: { slug: true, updatedAt: true },
  })
}

export const findCategory = async ({ where, ...args }: Prisma.CategoryFindFirstArgs = {}) => {
  "use cache"

  cacheTag("category", `category-${where?.slug}`)

  return db.category.findFirst({
    ...args,
    where,
    select: categoryOnePayload,
  })
}
