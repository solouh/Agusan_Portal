

import bcrypt from 'bcryptjs';
import { createClient } from './supabase/client';

export async function validateLRN(lrn: string, password: string) {
  const supabase = createClient();
  
  // Find student by LRN
  const { data: student, error } = await supabase
    .from('students')
    .select(`
      *,
      users (
        id,
        email,
        role_id
      )
    `)
    .eq('lrn', lrn)
    .single();

  if (error || !student) {
    return { success: false, message: 'Invalid LRN or password' };
  }

  // For demo: password is stored in a separate auth table or we use a hash
  // In production, you'd have a proper password field or use Supabase Auth
  // Here we'll check against a simple hash or use Supabase Auth users
  
  const { data: authData, error: authError } = await supabase
    .from('student_auth')
    .select('password_hash')
    .eq('student_id', student.id)
    .single();

  if (authError || !authData) {
    return { success: false, message: 'Account not fully set up' };
  }

  const validPassword = await bcrypt.compare(password, authData.password_hash);
  
  if (!validPassword) {
    return { success: false, message: 'Invalid LRN or password' };
  }

  return {
    success: true,
    student: {
      id: student.id,
      lrn: student.lrn,
      first_name: student.first_name,
      last_name: student.last_name,
      middle_name: student.middle_name,
      email: student.email,
    },
    user: student.users,
  };
}