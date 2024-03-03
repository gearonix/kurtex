import { EffectorNext } from '@effector/next'
import { allSettled, fork, serialize } from 'effector'
import { NextPage } from 'next'
import { ConnectedRoomsList } from 'src/widgets/connected-rooms-list'
import { hubPage } from '@/pages/hub/model'

export const HubPage: NextPage = async () => {
  const scope = fork()

  await allSettled(hubPage.open, { scope })

  const values = serialize(scope)

  return (
    <EffectorNext values={values}>
      <ConnectedRoomsList />
    </EffectorNext>
  )
}
