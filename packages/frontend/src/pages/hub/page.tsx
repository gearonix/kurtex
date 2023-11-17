import { NextPage }           from 'next'
import { allSettled }         from 'effector'
import { fork }               from 'effector'
import { serialize }          from 'effector'
import { hubPage }            from '@/pages/hub/model'
import { ConnectedRoomsList } from 'src/widgets/connected-rooms-list'
import { EffectorNext }       from '@effector/next'

export const HubPage: NextPage = async () => {
  // TODO: rewrite to fetch and enable this stuff

  // const scope = fork()
  // await allSettled(hubPage.open, { scope })

  return (
    // <EffectorNext values={serialize(scope)}>
    <ConnectedRoomsList />
    // </EffectorNext>
  )
}
