'use client';


import { createClient } from '@/lib/supabase/client';
const supabase = createClient()
import { useState, useCallback } from 'react';

export interface Enrollment {
  id: number;
  student_id: string;
  school_year: string;
  grade_level: string;
  strand: string;
  status: string;
  billing: string;
  enrollment_date: string;
  is_transferee: boolean;
}

export function useEnrollments() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get enrollments by student
  const getStudentEnrollments = useCallback(async (studentId: string): Promise<Enrollment[]> => {
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('student_id', studentId)
      .order('enrollment_date', { ascending: false });

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return [];
    }

    return data || [];
  }, []);

  // Get current enrollment
  const getCurrentEnrollment = useCallback(async (studentId: string): Promise<Enrollment | null> => {
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('student_id', studentId)
      .eq('school_year', '2025-2026') // Current year
      .single();

    setIsLoading(false);

    if (error) return null;
    return data;
  }, []);

  // Create enrollment
  const createEnrollment = useCallback(async (enrollment: Partial<Enrollment>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const { error } = await supabase
      .from('enrollments')
      .insert(enrollment);

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return false;
    }

    return true;
  }, []);

  // Update enrollment status
  const updateEnrollmentStatus = useCallback(async (
    id: number, 
    status: string, 
    billing?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const updates: any = { status };
    if (billing) updates.billing = billing;

    const { error } = await supabase
      .from('enrollments')
      .update(updates)
      .eq('id', id);

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return false;
    }

    return true;
  }, []);

  // Get all pending enrollments (for registrar)
  const getPendingEnrollments = useCallback(async (): Promise<any[]> => {
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        students (*)
      `)
      .eq('status', 'pending')
      .order('enrollment_date', { ascending: false });

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return [];
    }

    return data || [];
  }, []);

  return {
    isLoading,
    error,
    getStudentEnrollments,
    getCurrentEnrollment,
    createEnrollment,
    updateEnrollmentStatus,
    getPendingEnrollments,
    clearError: () => setError(null),
  };
}