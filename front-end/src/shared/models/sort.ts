import { SortOrders, SortOptions } from "shared/components/sort/sort.component"

export type SortContextModel = {
  sortOptions: SortOptions[]
  sortOrder: SortOrders
  sortBy: string
  handleSortOrderChange: (order: SortOrders) => void
  handleSortByChange: (sortBy: string) => void
}
