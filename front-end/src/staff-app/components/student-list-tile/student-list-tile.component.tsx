// Libs
import React, { useContext } from "react"
import styled from "styled-components"
// Styles
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
// Assets
import { Images } from "assets/images"
// Types and interfaces
import { Person, PersonHelper } from "shared/models/person"
import { StudentRoll, RolllStateType } from "shared/models/roll"
// Components
import { RollStateSwitcher } from "staff-app/components/roll-state/roll-state-switcher.component"
// Contexts
import DailyCareContext from "staff-app/contexts/daily-care-context"
interface Props {
  isRollMode?: boolean
  student: Person
}

export const StudentListTile: React.FC<Props> = ({ isRollMode, student }) => {
  const { rollStates } = useContext(DailyCareContext)

  const initialState: RolllStateType = rollStates.studentRollStates.find((studentRoll: StudentRoll) => student.id === studentRoll.student_id)?.roll_state

  const onRollStateChange = (state: RolllStateType) => {
    rollStates.handleStudentRollStateChange(student.id, state)
  }

  return (
    <S.Container>
      <S.Avatar url={Images.avatar}></S.Avatar>
      <S.Content className="flex actr">
        <div>{PersonHelper.getFullName(student)}</div>
      </S.Content>
      {isRollMode && (
        <S.Roll>
          <RollStateSwitcher initialState={initialState} onStateChange={onRollStateChange} />
        </S.Roll>
      )}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    margin-top: ${Spacing.u3};
    padding-right: ${Spacing.u2};
    display: flex;
    height: 60px;
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
    }
  `,
  Avatar: styled.div<{ url: string }>`
    width: 60px;
    background-image: url(${({ url }) => url});
    border-top-left-radius: ${BorderRadius.default};
    border-bottom-left-radius: ${BorderRadius.default};
    background-size: cover;
    background-position: 50%;
    align-self: stretch;
  `,
  Content: styled.div`
    flex-grow: 1;
    padding: ${Spacing.u2};
    color: ${Colors.dark.base};
    font-weight: ${FontWeight.strong};
  `,
  Roll: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u4};
  `,
}
