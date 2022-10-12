// Libs
import React from "react"
import styled from "styled-components"
// Styles
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
// Types and interfaces
import { Activity } from "shared/models/activity"
// Components
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { StudentRoll, RolllStateType } from "shared/models/roll"

interface Props {
  activity: Activity
}

const ActivityListTile: React.FC<Props> = ({ activity }) => {
  const activityDate = new Date(activity.entity.completed_at)
  const activityDateString = activityDate.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })

  const getCount = (roleState: RolllStateType) => {
    return activity.entity.student_roll_states.filter((state: StudentRoll) => state.roll_state === roleState).length
  }

  return (
    <S.Container>
      <S.Content className="flex actr">
        <div>{activity.entity.name}</div>
      </S.Content>
      <RollStateList
        stateList={[
          { type: "all", count: activity.entity.student_roll_states?.length || 0 },
          { type: "present", count: getCount("present") },
          { type: "late", count: getCount("late") },
          { type: "absent", count: getCount("absent") },
          { type: "unmark", count: getCount("unmark") },
        ]}
      />
      <S.Date className="flex actr">{activityDateString}</S.Date>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    margin-top: ${Spacing.u3};
    padding-left: ${Spacing.u2};
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
  Content: styled.div`
    flex-grow: 1;
    padding: ${Spacing.u2};
    color: ${Colors.dark.base};
    font-weight: ${FontWeight.strong};
  `,
  Date: styled.div`
    color: ${Colors.neutral.base};
    background-color: ${Colors.blue.base};
    border-radius: 0 ${BorderRadius.default} ${BorderRadius.default} 0;
    font-weight: ${FontWeight.strong};
    margin-left: 10px;
    padding: ${Spacing.u2} ${Spacing.u4};
  `,
}

export default ActivityListTile
