import { useNavigate } from 'react-router-dom'

import { IFootballPlayer, IPosition } from '../types'
import { FormInput } from '../components/FormInput'
import { addPlayer } from '../api/football-api'

const initialPlayerState: IFootballPlayer = {
  age: 0,
  id: 0,
  name: '',
  number: 0,
  position: IPosition.Forward,
  team: ''
}

export const AddPlayer = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center mt-20">
      <FormInput
        buttonColor="blue"
        functionEvent={async (playerData) => {
          await addPlayer(playerData)
          navigate('/')
        }}
        textButton="Add Player"
        valueState={initialPlayerState}
      />
    </div>
  )
}
