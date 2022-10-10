import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { Spacing } from "shared/styles/styles"

type SortOrders = "asc" | "desc" | null

type SortOptions = {
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

export const Sort: React.FC<Props> = ({ sortBy, sortOrder, onSetSortBy, onSetSortOrder, sortParams }) => {
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
        {sortOrder === SORT_STATES.asc ? (
          <span onClick={() => onSetSortOrder(SORT_STATES.desc)}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-up-z-a" />
          </span>
        ) : (
          <span onClick={() => onSetSortOrder(SORT_STATES.asc)}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-up-a-z" />
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
