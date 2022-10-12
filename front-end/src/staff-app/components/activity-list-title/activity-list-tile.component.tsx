// Libs
import React, { useState } from "react"
import styled from "styled-components"
import Collapse from "@material-ui/core/Collapse"
// Styles
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
// Types and interfaces
import { Activity } from "shared/models/activity"
// Components
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { StudentRoll, RolllStateType } from "shared/models/roll"
import StudentStrip from "./student-strip.component"

interface Props {
  activity: Activity
}

const ActivityListTile: React.FC<Props> = ({ activity }) => {
  const [selectedRoll, setSelectedRole] = useState("all")
  const [listOpen, setListOpen] = useState(false)

  const activityDate = new Date(activity.entity.completed_at)
  const activityDateString = activityDate.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })

  const getCount = (roleState: RolllStateType) => {
    return activity.entity.student_roll_states.filter((state: StudentRoll) => state.roll_state === roleState).length
  }

  const toggleListOpenState = () => {
    setListOpen(!listOpen)
  }

  const handleRollClick = (type: RolllStateType | "all") => {
    if (type !== selectedRoll) {
      setSelectedRole(type)
      if (!listOpen) toggleListOpenState()
    }
    if (type === selectedRoll) {
      toggleListOpenState()
    }
  }

  const getRoleFilteredData = (data: StudentRoll[]) => {
    if (selectedRoll === "all") return [...data]
    return [...data].filter((state: StudentRoll) => state.roll_state === selectedRoll)
  }

  return (
    <S.Container>
      <S.Data className="flex actr" open={listOpen}>
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
          onItemClick={handleRollClick}
        />
        <S.Date className="flex actr" open={listOpen}>
          {activityDateString}
        </S.Date>
      </S.Data>
      <Collapse in={listOpen} unmountOnExit>
        {getRoleFilteredData(activity.entity.student_roll_states)?.length ? (
          <S.Student>
            {getRoleFilteredData(activity.entity.student_roll_states).map((roll: StudentRoll) => (
              <StudentStrip key={`${roll.student_id}_${roll.student_name}`} studentRoll={roll} />
            ))}
          </S.Student>
        ) : (
          <S.NoData className="pl-20 flex actr">NA</S.NoData>
        )}
      </Collapse>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    font-weight: ${FontWeight.strong};
    margin-top: ${Spacing.u3};
    display: flex;
    flex-direction: column;
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
    }
  `,
  Data: styled.div<{ open: boolean }>`
    border-radius: ${({ open }) => (open ? `${BorderRadius.default} ${BorderRadius.default} 0 0` : BorderRadius.default)};
    border-bottom: ${({ open }) => (open ? `1px solid ${Colors.blue.base}` : "none")};
    height: 60px;
    padding-left: ${Spacing.u2};
  `,
  Content: styled.div`
    flex-grow: 1;
    padding: ${Spacing.u2};
    color: ${Colors.dark.base};
    font-weight: ${FontWeight.strong};
  `,
  Date: styled.div<{ open: boolean }>`
    box-sizing: border-box;
    color: ${Colors.neutral.base};
    background-color: ${Colors.blue.base};
    border-radius: 0 ${BorderRadius.default} ${({ open }) => (open ? 0 : BorderRadius.default)} 0;
    font-weight: ${FontWeight.strong};
    height: 100%;
    margin-left: 10px;
    padding: ${Spacing.u2} ${Spacing.u4};
  `,
  Student: styled.div`
    border-radius: 0 0 ${BorderRadius.default} ${BorderRadius.default};
    padding-bottom: 15px;
  `,
  NoData: styled.div`
    height: 50px;
  `,
}

export default ActivityListTile
