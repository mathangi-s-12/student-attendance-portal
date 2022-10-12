// Libs
import React from "react"
import styled from "styled-components"
// Styles
import { Spacing } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
// Components
import { StudentRoll } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"

interface Props {
  studentRoll: StudentRoll
}

const StudentStrip: React.FC<Props> = ({ studentRoll }) => {
  return (
    <S.Container>
      <div className="flex actr pl-20">{studentRoll.student_id}.</div>
      <div className="flex actr">{studentRoll.student_name}</div>
      <div className="flex actr jctr">
        <RollStateIcon type={studentRoll.roll_state} />
      </div>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    box-sizing: border-box;
    margin-top: ${Spacing.u3};
    display: grid;
    grid-template-columns: 10% 80% 8%;
    gap: 1%;
    align-items: center;
    height: 30px;
    background-color: #fff;
    width: 100%;
  `,
}

export default StudentStrip
