// Libs
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { debounce } from "debounce"
// Styles
import { Spacing, FontWeight, BorderRadius } from "shared/styles/styles"
// Components
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { SORT_STATES, SortOrders } from "shared/components/sort/sort.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import Toolbar, { ToolbarAction } from "./home-board-toolbar"
// Custom Hooks
import { useApi } from "shared/hooks/use-api"
// Types and interfaces
import { Person, PersonHelper } from "shared/models/person"
import { StudentRoll, RolllStateType } from "shared/models/roll"
// Context
import { DailyCareContextProvider, DailyCareContextType } from "staff-app/contexts/daily-care-context"

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
  const [studentRollStates, setStudentRollStates] = useState<StudentRoll[]>([])

  const [sortBy, setSortBy] = useState<StudentSortParams>(STUDENT_SORT_PARAMS.firstName.value)
  const [sortOrder, setSortOrder] = useState<SortOrders>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedRole, setSelectedRole] = useState<RolllStateType | "all">("all")

  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [saveStudents, savedData, saveLoadState, saveError] = useApi<{}>({ url: "save-roll" })

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    initRollStates()
  }, [data])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
  }

  const initRollStates = () => {
    const studentRollStatesFromData: StudentRoll[] = data?.students
      ? data?.students.map((student: Person) => ({
          student_id: student.id,
          student_name: PersonHelper.getFullName(student),
          roll_state: "unmark" as RolllStateType,
        }))
      : []
    setStudentRollStates(studentRollStatesFromData)
  }

  const handleCompleteRoll = (roles: StudentRoll[]) => {
    saveStudents({
      student_roll_states: [...roles],
    })
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
      initRollStates()
    }
    if (action === "complete") {
      setIsRollMode(false)
      handleCompleteRoll([...studentRollStates])
      initRollStates()
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

  const handleSelectedRoleChange = (roleState: RolllStateType) => {
    setSelectedRole(roleState)
  }

  const handleStudentRollStateChange = (studentId: number, rollState: RolllStateType) => {
    const studentChangedIndex = studentRollStates.findIndex((studentRoll: StudentRoll) => studentRoll.student_id === studentId)
    const studentRollCopy = [...studentRollStates]
    if (studentChangedIndex > -1) {
      studentRollCopy[studentChangedIndex].roll_state = rollState
    }
    setStudentRollStates(studentRollCopy)
  }

  const dailyCareContextValue: DailyCareContextType = {
    data: data?.students || [],
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
    rollStates: {
      studentRollStates,
      handleStudentRollStateChange,
    },
    rollFilter: {
      selectedRole,
      handleSelectedRoleChange,
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

  const getRoleFilteredData = (students: Person[]) => {
    if (selectedRole === "all") return [...students]
    const studentIdsWithSelectedRole: number[] = studentRollStates
      .filter((student: StudentRoll) => student.roll_state === selectedRole)
      .map((student: StudentRoll) => student.student_id)
    return [...students].filter((student: Person) => studentIdsWithSelectedRole.includes(student.id))
  }

  const getSortedAndFilteredData = (students?: Person[]) => {
    if (!students) return []
    const filteredRoleData = [...getRoleFilteredData(students)]
    const filteredSearchData = [...getSearchedData(filteredRoleData)]
    const sortedData = [...getSortedData(filteredSearchData)]

    return [...sortedData]
  }

  const sortedAndFilteredStudents = getSortedAndFilteredData(data?.students)

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
              {sortedAndFilteredStudents?.length ? (
                sortedAndFilteredStudents.map((s) => <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />)
              ) : (
                <S.NoData className="flex actr jctr">Clear/change filters</S.NoData>
              )}
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

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
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
