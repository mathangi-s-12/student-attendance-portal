import React from "react"
import { Activity } from "shared/models/activity"
import { SortContextModel } from "shared/models/sort"
import { SearchContextModel } from "shared/models/search"

export interface ActivitiesContextType {
  data?: Activity[]
  sort?: SortContextModel
  search?: SearchContextModel
}

const ActivitiesContext = React.createContext<ActivitiesContextType | null>(null)

export const ActivitiesProvider = ActivitiesContext.Provider

export default ActivitiesContext
