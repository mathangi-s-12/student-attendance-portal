// Libs
import React, { useContext } from "react"
import styled from "styled-components"
// Styles
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
// Components
import Sort, { SORT_STATES, SortOrders } from "shared/components/sort/sort.component"
import Search from "shared/components/search-bar/search-bar.component"
// Context
import ActivitiesContext from "staff-app/contexts/activity-page-context"

const Toolbar: React.FC = (props) => {
  const { sort, search } = useContext(ActivitiesContext)

  return (
    <S.ToolbarContainer>
      <div className="flex-grow mr-30">
        <Search searchTerm={search.searchTerm} onSearchTermChange={search.handleSearchTermChange} />
      </div>
      <Sort sortParams={sort?.sortOptions} sortBy={sort?.sortBy} sortOrder={sort?.sortOrder} onSetSortBy={sort?.handleSortByChange} onSetSortOrder={sort?.handleSortOrderChange} />
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
}

export default Toolbar
