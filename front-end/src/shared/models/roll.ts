export interface Roll {
  id: number
  name: string
  completed_at: Date
  student_roll_states: { student_id: number; roll_state: RolllStateType }[]
}

export interface RollInput {
  student_roll_states: StudentRoll[]
}

export interface RoleStateContextModel {
  studentRollStates: StudentRoll[]
  handleStudentRollStateChange?: (studentId: number, rollState: RolllStateType) => void
  onComplete?: (rolls: StudentRoll[]) => void
  onExit?: () => void
}

export interface RoleFilterContextModel {
  selectedRole: RolllStateType | "all"
  handleSelectedRoleChange?: (roleState: RolllStateType) => void
}

export type StudentRoll = { student_id: number; roll_state: RolllStateType }

export type RolllStateType = "unmark" | "present" | "absent" | "late"
