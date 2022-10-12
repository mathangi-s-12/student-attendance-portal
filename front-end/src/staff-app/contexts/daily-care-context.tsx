import React from "react"
import { Person } from "shared/models/person"
import { SortContextModel } from "shared/models/sort"
import { SearchContextModel } from "shared/models/search"

type DailyCareContextType = {
  data?: Person[]
  sort?: SortContextModel
  search?: SearchContextModel
  // todo: add for filter later
  // todo: add for count later
}

const DailyCareContext = React.createContext<DailyCareContextType | null>(null)

export const DailyCareContextProvider = DailyCareContext.Provider

export default DailyCareContext
