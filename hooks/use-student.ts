'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
const supabase = createClient()
import { Student } from '@/types';

export function useStudent(userId: string | undefined) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch single student by ID
  const getStudent = useCallback(async (id: string): Promise<Student | null> => {
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return null;
    }

    return data;
  }, []);

  // Fetch student by LRN
  const getStudentByLRN = useCallback(async (lrn: string): Promise<Student | null> => {
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('lrn', lrn)
      .single();

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return null;
    }

    return data;
  }, []);

  // Update student
  const updateStudent = useCallback(async (id: string, updates: Partial<Student>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const { error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id);

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return false;
    }

    return true;
  }, []);

  // Fetch all students (for admin)
  const getAllStudents = useCallback(async (): Promise<Student[]> => {
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return [];
    }

    return data || [];
  }, []);

  // Search students
  const searchStudents = useCallback(async (query: string): Promise<Student[]> => {
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,lrn.ilike.%${query}%`);

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
    getStudent,
    getStudentByLRN,
    updateStudent,
    getAllStudents,
    searchStudents,
    clearError: () => setError(null),
  };
}