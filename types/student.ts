// types/parent.ts

import { JSX } from "react/jsx-runtime"

export interface Parent {
  id?: number                    // int8
  student_id?: string            // uuid - references students.id
  type: 'mother' | 'father' | 'guardian' | string  // e.g., "mother", "father"
  first_name: string
  last_name: string
  phone?: string | null
  education_level?: string | null   // e.g., "college", "high_school", "elementary"
  living_status?: string | null     // e.g., "living_together", "separated", "deceased"
  employment_status?: string | null // e.g., "employed", "unemployed", "self_employed"
  job_category?: string | null      // e.g., "professional", "skilled_worker", etc.
  created_at?: string
  updated_at?: string
}

// types/student.ts
export interface Enrollment {
  grade_level: string
  school_year: string
  strand: string
}

export interface Student {
  id: string
  user_id?: string
  lrn?: string
  first_name: string
  last_name: string
  middle_name?: string | null
  extension_name?: string | null
  email?: string
  phone_number?: string
  alternative_phone?: string
  facebook_name?: string
  facebook_link?: string
  birth_date: string
  birth_place?: string
  gender: string
  civil_status?: string
  citizenship?: string
  religion?: string
  status?: string

  student_address?: StudentAddress[]  // Array
  parents?: Parent[]
  education_backgrounds?: EducationBackground[]
  enrollments?: Enrollment[]  // Array of Enrollment

  created_at?: string
  updated_at?: string
}

export interface StudentAddress {
  id?: number
  student_id?: string
  house_no?: string
  street?: string
  barangay?: string
  city?: string
  province?: string
}

export interface EducationBackground {
  id: number
  student_id?: string
  last_school_name: string
  school_type: string
  year_graduated: number | string
  school_address?: string
  created_at?: string
  updated_at?: string
}