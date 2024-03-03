'use client'

import { useGate } from 'effector-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { navigationModel } from '@/shared/model/navigation'

export const NavigationProvider = () => {
  const router = useRouter()
  const params = useParams()
  const query = useSearchParams()

  useGate(navigationModel.RouterGate, { params, query, router })

  return null
}
