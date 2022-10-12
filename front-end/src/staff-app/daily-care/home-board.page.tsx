// Libs
import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { debounce } from "debounce"
// Styles
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
// Components
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import Sort, { SORT_STATES, SortOrders } from "shared/components/sort/sort.component"
import Search from "shared/components/search-bar/search-bar.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
// Custom Hooks
import { useApi } from "shared/hooks/use-api"
// Types and interfaces
import { Person, PersonHelper } from "shared/models/person"
// Context
import DailyCareContext, { DailyCareContextProvider } from "staff-app/contexts/daily-care-context"

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
  const [searchTerm, setSearchTerm] = useState<string>("")
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

  const handleSearchTermChange = debounce((searchTerm: string) => {
    setSearchTerm(searchTerm)
  }, 300)

  const dailyCareContextValue = {
    sort: {
      sortOptions: Object.values(STUDENT_SORT_PARAMS),
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

  const getSortedData = (students: Person[]) => {
    if (sortOrder === null) return [...students]
    return [...students].sort((a: Person, b: Person) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === SORT_STATES.asc ? -1 : 1
      if (a[sortBy] > b[sortBy]) return sortOrder === SORT_STATES.asc ? 1 : -1
      return 0
    })
  }

  const getSearchedData = (students: Person[]) => {
    return [...students].filter((student: Person) => {
      const studentName: string = PersonHelper.getFullName(student)
      const searchTerms: string[] = searchTerm
        .trim()
        .replace(/\s\s+/g, " ")
        .split(" ")
        .map((word: string) => word.toLowerCase())
      const isSearchTermInName = searchTerms.reduce((acc: boolean, term: string) => acc || studentName.toLowerCase().includes(term), false)
      return isSearchTermInName
    })
  }

  const getSortedAndFilteredData = (students: Person[]) => {
    if (!data) return []
    const filteredData = [...getSearchedData(students)]
    const sortedData = [...getSortedData(filteredData)]

    return [...sortedData]
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
              {getSortedAndFilteredData(data.students).map((s) => (
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
  const { sort, search } = useContext(DailyCareContext)

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
      <div className="flex-grow mr-30 ml-30">
        <Search searchTerm={search.searchTerm} onSearchTermChange={search.handleSearchTermChange} />
      </div>
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
    padding: 10px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      border: 1px solid #ffffff;
      border-radius: 3px;
      padding: 6px;
      font-weight: ${FontWeight.strong};
    }
  `,
}
