import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();

export function useSchoolInfo() {
  return useQuery({
    queryKey: ['school-info'],
    queryFn: async () => {
      // This could be from a settings table or static config
      // For now, returning structured data that could be fetched
      const { data: strands } = await supabase
        .from('strands')
        .select('*');

      return {
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
      };
    }
  });
}