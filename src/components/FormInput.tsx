import { useState } from 'react'

import { IFootballPlayer, IPosition } from '../types'

import { Button, Label, Select, TextInput } from 'flowbite-react'

type IProps = {
  buttonColor?: string
  functionEvent: (playerData: IFootballPlayer) => void
  playerId?: number
  textButton: string
  valueState: IFootballPlayer
}

export const FormInput = ({
  buttonColor,
  functionEvent,
  playerId,
  textButton,
  valueState
}: IProps) => {
  const [name, setName] = useState(valueState.name)
  const [number, setNumber] = useState(valueState.number)
  const [team, setTeam] = useState(valueState.team)
  const [age, setAge] = useState(valueState.age)
  const [position, setPosition] = useState<IPosition>(valueState.position)

  const handleSubmit = () => {
    console.log('Ajunge si aici')
    functionEvent({ age, id: playerId, name, number, position, team })
  }

  return (
    <div className="space-y-6 w-96">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput onChange={(e) => setName(e.target.value)} value={name} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="team" value="Team" />
        </div>
        <TextInput onChange={(e) => setTeam(e.target.value)} value={team} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Number" />
        </div>
        <TextInput
          onChange={(e) => setNumber(Number(e.target.value))}
          value={number}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="Age" />
        </div>
        <TextInput
          onChange={(e) => setAge(Number(e.target.value))}
          value={age}
        />
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label value="Position" />
        </div>
        <Select onChange={(e) => setPosition(e.target.value)} value={position}>
          {Object.entries(IPosition).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>
      <Button color={buttonColor} onClick={handleSubmit}>
        {textButton}
      </Button>
    </div>
  )
}
