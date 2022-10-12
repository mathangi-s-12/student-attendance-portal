// Libs
import React, { useContext } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
// Styles
import { BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
// Components
import Sort from "shared/components/sort/sort.component"
import Search from "shared/components/search-bar/search-bar.component"
// Context
import DailyCareContext from "staff-app/contexts/daily-care-context"

export type ToolbarAction = "roll" | "sort"

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

export default Toolbar
