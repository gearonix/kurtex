'use client'

import { useParams }       from 'next/navigation'
import { useRouter }       from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useGate }         from 'effector-react'
import { navigationModel } from '@/shared/model/navigation'

export const NavigationProvider = () => {
  const router = useRouter()
  const params = useParams()
  const query = useSearchParams()

  useGate(navigationModel.RouterGate, { params, query, router })

  return null
}
