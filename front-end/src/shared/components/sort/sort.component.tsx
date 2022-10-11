import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { Spacing } from "shared/styles/styles"

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
            <MenuItem value={value}>{label}</MenuItem>
          ))}
        </Select>
      </div>
      <div>
        {sortOrder === null && (
          <span onClick={() => onSetSortOrder(SORT_STATES.asc)} color="#ffffff">
            <FontAwesomeIcon icon="sort-up-down" />
          </span>
        )}
        {sortOrder === SORT_STATES.asc && (
          <span onClick={() => onSetSortOrder(SORT_STATES.desc)} color="#ffffff">
            <FontAwesomeIcon icon="arrow-up-a-z" />
          </span>
        )}
        {sortOrder === SORT_STATES.desc && (
          <span onClick={() => onSetSortOrder(null)} color="#ffffff">
            <FontAwesomeIcon icon="arrow-up-z-a" />
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
