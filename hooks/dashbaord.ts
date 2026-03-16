'use client';

import { useState, useCallback, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// ==================== STUDENT HOOK ====================
export function useStudent(userId: string | undefined) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStudent = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await supabase.from('students').select('*').eq('id', id).single();
    setIsLoading(false);
    if (error) { setError(error.message); return null; }
    return data;
  }, []);

  const getStudentByLRN = useCallback(async (lrn: string) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await supabase.from('students').select('*').eq('lrn', lrn).single();
    setIsLoading(false);
    if (error) { setError(error.message); return null; }
    return data;
  }, []);

  const updateStudent = useCallback(async (id: string, updates: any) => {
    setIsLoading(true);
    setError(null);
    const { error } = await supabase.from('students').update(updates).eq('id', id);
    setIsLoading(false);
    if (error) { setError(error.message); return false; }
    return true;
  }, []);

  const getAllStudents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false });
    setIsLoading(false);
    if (error) { setError(error.message); return []; }
    return data || [];
  }, []);

  const searchStudents = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,lrn.ilike.%${query}%`);
    setIsLoading(false);
    if (error) { setError(error.message); return []; }
    return data || [];
  }, []);

  return {
    isLoading, error,
    getStudent, getStudentByLRN, updateStudent, getAllStudents, searchStudents,
    clearError: () => setError(null),
  };
}

// ==================== DASHBOARD DATA HOOKS ====================

// Hook for student profile data (combines multiple tables)
export function useStudentProfile(studentId: string | undefined) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) { setIsLoading(false); return; }
    
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        // Fetch student basic info
        const { data: student, error: studentError } = await supabase
          .from('students')
          .select('*')
          .eq('id', studentId)
          .single();

        if (studentError) throw studentError;

        // Fetch address
        const { data: address } = await supabase
          .from('student_address')
          .select('*')
          .eq('student_id', studentId)
          .single();

        // Fetch parents
        const { data: parents } = await supabase
          .from('parents')
          .select('*')
          .eq('student_id', studentId);

        // Fetch education background
        const { data: educationBackground } = await supabase
          .from('education_backgrounds')
          .select('*')
          .eq('student_id', studentId)
          .order('year_graduated', { ascending: false });

        // Get latest enrollment info with more details
        const { data: latestEnrollment } = await supabase
          .from('enrollments')
          .select('grade_level, strand, school_year, status, billing, enrollment_date, is_transferee')
          .eq('student_id', studentId)
          .order('enrollment_date', { ascending: false })
          .limit(1)
          .single();

        // Get user info for role
        const { data: userInfo } = await supabase
          .from('users')
          .select('email, contact_number, role(name)')
          .eq('id', student.user_id)
          .single();

        setData({
          ...student,
          address,
          parents: parents || [],
          educationBackground: educationBackground || [],
          grade_level: latestEnrollment?.grade_level,
          strand: latestEnrollment?.strand,
          enrollment_status: latestEnrollment?.status,
          billing_status: latestEnrollment?.billing,
          school_year: latestEnrollment?.school_year,
          is_transferee: latestEnrollment?.is_transferee,
          enrollment_date: latestEnrollment?.enrollment_date,
          user_info: userInfo
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [studentId]);

  return { data, isLoading, error, refetch: () => {} };
}

// Hook for student grades
export function useStudentGrades(studentId: string | undefined) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) { setIsLoading(false); return; }

    const fetchGrades = async () => {
      setIsLoading(true);
      try {
        const { data: grades, error } = await supabase
          .from('student_grades')
          .select(`
            *,
            section_subject:section_subjects(
              subject:subjects(name)
            )
          `)
          .eq('section_enrollment_id', studentId)
          .order('school_year', { ascending: false });

        if (error) throw error;

        setData(grades?.map(grade => ({
          ...grade,
          subject_name: grade.section_subject?.subject?.name || 'Unknown Subject'
        })) || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrades();
  }, [studentId]);

  return { data, isLoading, error, refetch: () => {} };
}

// Hook for student schedule
export function useStudentSchedule(studentId: string | undefined) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) { setIsLoading(false); return; }

    const fetchSchedule = async () => {
      setIsLoading(true);
      try {
        // Get current section enrollment
        const { data: enrollment } = await supabase
          .from('section_enrollments')
          .select('section_id')
          .eq('student_id', studentId)
          .order('enrolled_at', { ascending: false })
          .limit(1)
          .single();

        if (!enrollment) { setData([]); setIsLoading(false); return; }

        const { data: schedule, error } = await supabase
          .from('section_subjects')
          .select(`
            *,
            subject:subjects(name),
            teacher:teachers(first_name,last_name)
          `)
          .eq('section_id', enrollment.section_id)
          .order('start_time');

        if (error) throw error;

        setData(schedule?.map(item => ({
          ...item,
          subject_name: item.subject?.name || 'Unknown',
          teacher_name: item.teacher ? `${item.teacher.first_name} ${item.teacher.last_name}` : 'TBA'
        })) || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [studentId]);

  return { data, isLoading, error, refetch: () => {} };
}

// Hook for school info
export function useSchoolInfo() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchoolInfo = async () => {
      setIsLoading(true);
      try {
        const { data: strands } = await supabase.from('strands').select('*');

        setData({
          name: 'Agusan National High School',
          address: 'CDO, Misamis Oriental, Philippines',
          student_count: '5,000+',
          teacher_count: '200+',
          years_established: '60+',
          calendar: [
            { name: 'Enrollment Period', date: 'Jan 31 - Feb 27' },
            { name: 'Classes Start', date: 'August 4, 2026' },
            { name: 'Midterm Exams', date: 'October 2026' }
          ],
          policies: [
            'Attendance is mandatory for all classes',
            'Uniform must be worn at all times',
            'ID card must be visible',
            'No mobile phones during class hours'
          ],
          strands: strands || []
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchoolInfo();
  }, []);

  return { data, isLoading, error, refetch: () => {} };
}