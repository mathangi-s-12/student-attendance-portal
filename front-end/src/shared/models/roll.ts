export interface Roll {
  id: number
  name: string
  completed_at: Date
  student_roll_states: StudentRoll[]
}

export interface RollInput {
  student_roll_states: StudentRoll[]
}

export interface RoleStateContextModel {
  studentRollStates: StudentRoll[]
  handleStudentRollStateChange?: (studentId: number, rollState: RolllStateType) => void
}

export interface RoleFilterContextModel {
  selectedRole: RolllStateType | "all"
  handleSelectedRoleChange?: (roleState: RolllStateType) => void
}

export type StudentRoll = { student_id: number; student_name: string; roll_state: RolllStateType }

export type RolllStateType = "unmark" | "present" | "absent" | "late"
