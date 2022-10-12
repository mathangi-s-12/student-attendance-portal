// Libs
import React, { useContext } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
// Styles
import { BorderRadius, Spacing } from "shared/styles/styles"
// Components
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
// Contexts
import DailyCareContext from "staff-app/contexts/daily-care-context"
// Types and interfaces
import { StudentRoll, RolllStateType } from "shared/models/roll"

export type ActiveRollAction = "complete" | "exit"
interface Props {
  isActive: boolean
  onItemClick: (action: ActiveRollAction, value?: string) => void
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const { isActive, onItemClick } = props
  const { data, rollStates, rollFilter } = useContext(DailyCareContext)

  const getCount = (roleState: RolllStateType) => {
    return rollStates.studentRollStates.filter((state: StudentRoll) => state.roll_state === roleState).length
  }

  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <S.Rolls>
          <RollStateList
            stateList={[
              { type: "all", count: data?.length || 0 },
              { type: "present", count: getCount("present") },
              { type: "late", count: getCount("late") },
              { type: "absent", count: getCount("absent") },
              { type: "unmark", count: getCount("unmark") },
            ]}
            onItemClick={rollFilter.handleSelectedRoleChange}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={() => onItemClick("complete")}>
              Complete
            </Button>
          </div>
        </S.Rolls>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
  Rolls: styled.div`
    min-width: 30%;
  `,
}
