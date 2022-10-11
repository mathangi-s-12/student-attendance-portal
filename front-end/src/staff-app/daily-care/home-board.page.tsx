import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import Sort, { SORT_STATES, SortOrders } from "shared/components/sort/sort.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import DailyCareContext, { DailyCareContextProvider } from "staff-app/contexts/daily-care-context"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"

type StudentSortParams = "first_name" | "last_name"

type StudentSortParamsObject = {
  [key: string]: { value: StudentSortParams; label: string }
}

const STUDENT_SORT_PARAMS: StudentSortParamsObject = {
  firstName: { value: "first_name", label: "First Name" },
  lastName: { value: "last_name", label: "Last Name" },
}

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [sortBy, setSortBy] = useState<StudentSortParams>(STUDENT_SORT_PARAMS.firstName.value)
  const [sortOrder, setSortOrder] = useState<SortOrders>(null)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }

  const handleSortOrderChange = (order: SortOrders) => {
    setSortOrder(order)
  }

  const handleSortByChange = (sortBy: string) => {
    setSortBy(sortBy as StudentSortParams)
  }

  const dailyCareContextValue = {
    sort: {
      sortOptions: Object.values(STUDENT_SORT_PARAMS),
      sortOrder,
      sortBy,
      handleSortOrderChange,
      handleSortByChange,
    },
  }

  const getSortedData = (students: Person[]) => {
    if (!data) return []
    if (sortOrder === null) return [...data.students]
    return [...students].sort((a: Person, b: Person) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === SORT_STATES.asc ? -1 : 1
      if (a[sortBy] > b[sortBy]) return sortOrder === SORT_STATES.asc ? 1 : -1
      return 0
    })
  }

  return (
    <>
      <DailyCareContextProvider value={dailyCareContextValue}>
        <S.PageContainer>
          <Toolbar onItemClick={onToolbarAction} />

          {loadState === "loading" && (
            <CenteredContainer>
              <FontAwesomeIcon icon="spinner" size="2x" spin />
            </CenteredContainer>
          )}

          {loadState === "loaded" && data?.students && (
            <>
              {getSortedData(data.students).map((s) => (
                <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
              ))}
            </>
          )}

          {loadState === "error" && (
            <CenteredContainer>
              <div>Failed to load</div>
            </CenteredContainer>
          )}
        </S.PageContainer>
        <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
      </DailyCareContextProvider>
    </>
  )
}

type ToolbarAction = "roll" | "sort"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick } = props
  const { sort } = useContext(DailyCareContext)

  return (
    <S.ToolbarContainer>
      <div onClick={() => onItemClick("sort")}>
        <Sort
          sortParams={sort?.sortOptions}
          sortBy={sort?.sortBy}
          sortOrder={sort?.sortOrder}
          onSetSortBy={sort?.handleSortByChange}
          onSetSortOrder={sort?.handleSortOrderChange}
        />
      </div>
      <div>Search</div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
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
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
