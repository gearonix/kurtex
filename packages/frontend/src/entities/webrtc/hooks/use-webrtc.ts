import { useEffect }      from 'react'
import { usePermissions } from '@/entities/webrtc/hooks/use-permissions'
import { useGate }        from 'effector-react'
import { rtcGate }        from '@/entities/webrtc/model/core'
import { socket }         from '@/entities/webrtc/model/wss'

export const LOCAL_VIDEO = 'CLIENT_LOCAL_VIDEO'

export const useWebRTC = () => {
  const requestWebRTCPermission = usePermissions()
  useGate(rtcGate)
  useGate(socket.Gate)

  useEffect(() => {
    requestWebRTCPermission()
  }, [])
}
