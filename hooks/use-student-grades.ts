import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();

export function useStudentGrades(studentId: string) {
  return useQuery({
    queryKey: ['student-grades', studentId],
    queryFn: async () => {
      const { data, error } = await supabase
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

      return data?.map(grade => ({
        ...grade,
        subject_name: grade.section_subject?.subject?.name || 'Unknown Subject'
      })) || [];
    },
    enabled: !!studentId
  });
}

// use-student-schedule.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useStudentSchedule(studentId: string) {
  return useQuery({
    queryKey: ['student-schedule', studentId],
    queryFn: async () => {
      // Get current section enrollment
      const { data: enrollment } = await supabase
        .from('section_enrollments')
        .select('section_id')
        .eq('student_id', studentId)
        .order('enrolled_at', { ascending: false })
        .limit(1)
        .single();

      if (!enrollment) return [];

      const { data, error } = await supabase
        .from('section_subjects')
        .select(`
          *,
          subject:subjects(name),
          teacher:teachers(first_name,last_name)
        `)
        .eq('section_id', enrollment.section_id)
        .order('start_time');

      if (error) throw error;

      return data?.map(item => ({
        ...item,
        subject_name: item.subject?.name || 'Unknown',
        teacher_name: item.teacher ? `${item.teacher.first_name} ${item.teacher.last_name}` : 'TBA'
      })) || [];
    },
    enabled: !!studentId
  });
}