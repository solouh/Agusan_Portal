export interface Student {
  id: string;
  lrn: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  email?: string;
  user_id?: string;
  gender?: string;
  birth_date?: string;
  status?: string;
  created_at?: string;
}

export interface StudentCredentials {
  id: number;
  student_id: string;
  password_hash: string;
}

export interface AuthState {
  student: Student | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  lrn: string;
  password: string;
}