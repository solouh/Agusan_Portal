import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();

export function useStudentProfile(studentId: string) {
  return useQuery({
    queryKey: ['student-profile', studentId],
    queryFn: async () => {
      // Fetch student basic info
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select(`
          *,
          enrollments:school_year,grade_level,strand
        `)
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

      // Get latest enrollment info
      const { data: latestEnrollment } = await supabase
        .from('enrollments')
        .select('grade_level, strand, school_year')
        .eq('student_id', studentId)
        .order('enrollment_date', { ascending: false })
        .limit(1)
        .single();

      return {
        ...student,
        address,
        parents: parents || [],
        grade_level: latestEnrollment?.grade_level,
        strand: latestEnrollment?.strand
      };
    },
    enabled: !!studentId
  });
}