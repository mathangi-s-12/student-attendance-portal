// Libs
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { debounce } from "debounce"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// Styles
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
// Custom Hooks
import { useApi } from "shared/hooks/use-api"
// Types and interfaces
import { Activity } from "shared/models/activity"
import { RolllStateType, StudentRoll } from "shared/models/roll"
// Components
import toast from "shared/components/toast/toast"
import { SORT_STATES, SortOrders } from "shared/components/sort/sort.component"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import Toolbar from "./activity-toolbar"
import ActivityListTile from "staff-app/components/activity-list-title/activity-list-tile.component"
// Context
import { ActivitiesContextType, ActivitiesProvider } from "staff-app/contexts/activity-page-context"

type ActivitiesSortParams = "completed_at" | RolllStateType

type ActivitiesSortParamsObject = {
  [key: string]: { value: ActivitiesSortParams; label: string }
}

const ACTIVITIES_SORT_PARAMS: ActivitiesSortParamsObject = {
  completedAt: { value: "completed_at", label: "Completed at" },
  late: { value: "late", label: "Late count" },
  present: { value: "present", label: "Present count" },
  absent: { value: "absent", label: "Absent count" },
  unmark: { value: "unmark", label: "Unmark count" },
}

let isOnboard: boolean = true

export const ActivityPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<ActivitiesSortParams>(ACTIVITIES_SORT_PARAMS.completedAt.value)
  const [sortOrder, setSortOrder] = useState<SortOrders>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const [getActivities, data, loadState] = useApi<{ activity: Activity[] }>({ url: "get-activities" })

  useEffect(() => {
    if (isOnboard) {
      toast("info", "Click on roll state icons to view students in each roll state")
      isOnboard = false
    }
  }, [])

  useEffect(() => {
    void getActivities()
  }, [getActivities])

  const handleSortOrderChange = (order: SortOrders) => {
    setSortOrder(order)
  }

  const handleSortByChange = (sortBy: string) => {
    setSortBy(sortBy as ActivitiesSortParams)
  }

  const handleSearchTermChange = debounce((searchTerm: string) => {
    setSearchTerm(searchTerm)
  }, 300)

  const activitiesContextValue: ActivitiesContextType = {
    data: data?.activity || [],
    sort: {
      sortOptions: Object.values(ACTIVITIES_SORT_PARAMS),
      sortOrder,
      sortBy,
      handleSortOrderChange,
      handleSortByChange,
    },
    search: {
      searchTerm,
      handleSearchTermChange,
    },
  }

  const getCount = (activity: Activity, type: RolllStateType) => {
    return activity.entity.student_roll_states.filter((rollState: StudentRoll) => rollState.roll_state === type).length
  }

  const getSortedData = (rolls: Activity[]) => {
    if (sortOrder === null) return [...rolls]
    return [...rolls].sort((a: Activity, b: Activity) => {
      switch (sortBy) {
        case "unmark":
        case "present":
        case "absent":
        case "late":
          const countA = getCount(a, sortBy)
          const countB = getCount(b, sortBy)
          return sortOrder === SORT_STATES.asc ? countA - countB : countB - countA
        case "completed_at":
          const dateA: Date = new Date(a.entity.completed_at)
          const dateB: Date = new Date(b.entity.completed_at)
          return sortOrder === SORT_STATES.asc ? dateA - dateB : dateB - dateA
        default:
          return 0
      }
    })
  }

  const getSearchedData = (rolls: Activity[]) => {
    return [...rolls].filter((roll: Activity) => {
      const rollName: string = roll.entity.name
      const searchTerms: string[] = searchTerm
        .trim()
        .replace(/\s\s+/g, " ")
        .split(" ")
        .map((word: string) => word.toLowerCase())
      const isSearchTermInName = searchTerms.reduce((acc: boolean, term: string) => acc || rollName.toLowerCase().includes(term), false)
      return isSearchTermInName
    })
  }

  const getSortedAndFilteredData = (activities?: Activity[]) => {
    if (!activities) return []
    const filteredSearchData = [...getSearchedData(activities)]
    const sortedData = [...getSortedData(filteredSearchData)]

    return [...sortedData]
  }

  const sortedAndFilteredActivities = getSortedAndFilteredData(data?.activity)

  return (
    <>
      <ActivitiesProvider value={activitiesContextValue}>
        <S.PageContainer>
          <Toolbar />

          {loadState === "loading" && (
            <CenteredContainer>
              <FontAwesomeIcon icon="spinner" size="2x" spin />
            </CenteredContainer>
          )}

          {loadState === "loaded" && data?.activity && (
            <>
              {sortedAndFilteredActivities?.length ? (
                sortedAndFilteredActivities.map((s) => <ActivityListTile key={s.entity.id} activity={s} />)
              ) : (
                <S.NoData className="flex actr jctr">{data.activity.length ? "Clear/change filters" : "NA"}</S.NoData>
              )}
            </>
          )}

          {loadState === "error" && (
            <CenteredContainer>
              <div>Failed to load</div>
            </CenteredContainer>
          )}
        </S.PageContainer>
      </ActivitiesProvider>
    </>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 10px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  NoData: styled.div`
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    font-size: 16px;
    font-weight: ${FontWeight.strong};
    margin-top: 20px;
    min-height: 50vh;
  `,
}
