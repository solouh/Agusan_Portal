// hooks/use-current-student.ts
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useStudent } from './use-student'

export function useCurrentStudent() {
  const supabase = createClient()
  const [userId, setUserId] = useState<string>()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user?.id)
    }
    getUser()
  }, [supabase])

  return useStudent(userId)
}