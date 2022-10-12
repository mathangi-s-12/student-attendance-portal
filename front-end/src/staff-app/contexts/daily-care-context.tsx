import React from "react"
import { Person } from "shared/models/person"
import { SortContextModel } from "shared/models/sort"
import { SearchContextModel } from "shared/models/search"
import { RoleStateContextModel, RoleFilterContextModel } from "shared/models/roll"

export interface DailyCareContextType {
  data?: Person[]
  sort?: SortContextModel
  search?: SearchContextModel
  rollStates?: RoleStateContextModel
  rollFilter?: RoleFilterContextModel
}

const DailyCareContext = React.createContext<DailyCareContextType | null>(null)

export const DailyCareContextProvider = DailyCareContext.Provider

export default DailyCareContext
