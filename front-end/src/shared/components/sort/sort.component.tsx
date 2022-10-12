import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowsAltV, faSortAlphaDown, faSortAlphaDownAlt } from "@fortawesome/free-solid-svg-icons"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { createStyles, withStyles } from "@material-ui/core/styles"

export type SortOrders = "asc" | "desc" | null

export type SortOptions = {
  value: string | number
  label: string
}

type SortOrderObject = {
  [key: string]: SortOrders
}

interface Props {
  sortParams: SortOptions[]
  sortBy: string
  sortOrder: SortOrders
  onSetSortBy: (param: string) => void
  onSetSortOrder: (order: SortOrders) => void
}

export const SORT_STATES: SortOrderObject = {
  asc: "asc",
  desc: "desc",
}

const CustomSelect = withStyles(() =>
  createStyles({
    root: {
      color: "#ffffff",
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
      fontSize: "14px",
      fontWeight: 600,
    },
    select: {
      padding: "0 24px 0 0",
    },
    icon: {
      color: "#ffffff",
    },
  })
)(Select)

const Sort: React.FC<Props> = ({ sortBy, sortOrder, onSetSortBy, onSetSortOrder, sortParams }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onSetSortBy(event.target.value as string)
  }

  return (
    <S.Container className="p-5">
      <S.Select className="mr-10 pl-5">
        <CustomSelect value={sortBy} onChange={handleChange}>
          {sortParams.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </CustomSelect>
      </S.Select>
      <S.SortState className="cptr pr-5 flex actr jctr">
        {sortOrder === null && (
          <span onClick={() => onSetSortOrder(SORT_STATES.asc)}>
            <FontAwesomeIcon icon={faArrowsAltV} color="#ffffff" />
          </span>
        )}
        {sortOrder === SORT_STATES.asc && (
          <span onClick={() => onSetSortOrder(SORT_STATES.desc)}>
            <FontAwesomeIcon icon={faSortAlphaDown} color="#ffffff" />
          </span>
        )}
        {sortOrder === SORT_STATES.desc && (
          <span onClick={() => onSetSortOrder(null)}>
            <FontAwesomeIcon icon={faSortAlphaDownAlt} color="#ffffff" />
          </span>
        )}
      </S.SortState>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    border: 1px solid #ffffff;
    border-radius: 3px;
    display: flex;
    align-items: center;
    .MuiInput-underline::before {
      border-bottom: 0 !important;
    }
    .MuiInput-underline::after {
      border-bottom: 0 !important;
    }
  `,
  Select: styled.div`
    border-right: 1px solid #ffffff;
    min-width: 100px; // might need to be adjusted for greater string lengths
  `,
  SortState: styled.div`
    min-width: 13px;
  `,
}

export default Sort
