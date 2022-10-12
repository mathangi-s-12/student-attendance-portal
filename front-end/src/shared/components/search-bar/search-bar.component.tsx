import React, { useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import InputBase from "@material-ui/core/InputBase"
import { createStyles, withStyles } from "@material-ui/core/styles"

interface Props {
  searchTerm: string
  onSearchTermChange: (searchTerm: string) => void
  disable?: boolean
}

const CustomInputBase = withStyles(() =>
  createStyles({
    root: {
      color: "#ffffff",
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
      fontSize: "14px",
      fontWeight: 600,
      width: "100%",
    },
  })
)(InputBase)

const Search: React.FC<Props> = ({ searchTerm, onSearchTermChange, disable }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onSearchTermChange(event.target.value as string)
  }

  const clearSearch = () => {
    onSearchTermChange("")
  }

  return (
    <S.Container>
      <span className="pr-5 pl-10">
        <FontAwesomeIcon icon={faSearch} color="#ffffff" />
      </span>
      <S.Input className="mr-20 ml-20">
        <CustomInputBase value={searchTerm} onChange={handleChange} placeholder="Search..." disabled={disable} />
      </S.Input>
      {searchTerm.trim() && (
        <S.Clear onClick={clearSearch} className="pr-10 pl-10 cptr">
          <FontAwesomeIcon icon={faTimes} color="#ffffff" />
        </S.Clear>
      )}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    border: 1px solid #ffffff;
    border-radius: 3px;
    display: flex;
    align-items: center;
  `,
  Input: styled.div`
    width: 100%;
    input::placeholder {
      opacity: 0.8;
    }
    input:-ms-input-placeholder {
      opacity: 0.8;
    }
    input::-ms-input-placeholder {
      opacity: 0.8;
    }
  `,
  Clear: styled.span`
    border-left: 1px solid #ffffff;
  `,
}

export default Search
