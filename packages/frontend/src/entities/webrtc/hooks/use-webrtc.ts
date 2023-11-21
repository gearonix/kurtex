import { useEffect }      from 'react'
import { usePermissions } from '@/entities/webrtc/hooks/use-permissions'
import { useGate }        from 'effector-react'
import { rtcGate }        from '@/entities/webrtc/model/entrypoint'
import { wss }            from '@/entities/webrtc/model/wss'

export const useWebRTC = () => {
  const requestWebRTCPermission = usePermissions()
  useGate(rtcGate)
  useGate(wss.Gate)

  useEffect(() => {
    requestWebRTCPermission()
  }, [])
}
