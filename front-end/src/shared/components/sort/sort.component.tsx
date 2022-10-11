import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowsAlt, faSortAlphaDown, faSortAlphaDownAlt } from "@fortawesome/free-solid-svg-icons"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

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

const Sort: React.FC<Props> = ({ sortBy, sortOrder, onSetSortBy, onSetSortOrder, sortParams }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onSetSortBy(event.target.value as string)
  }

  return (
    <S.Container>
      <div className="mr-5">
        <Select value={sortBy} onChange={handleChange}>
          {sortParams.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div>
        {sortOrder === null && (
          <span onClick={() => onSetSortOrder(SORT_STATES.asc)}>
            <FontAwesomeIcon icon={faArrowsAlt} color="#ffffff" />
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
      </div>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
}

export default Sort
