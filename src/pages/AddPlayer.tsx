import { useState } from 'react'

import { addPlayer } from '../api/football-api'

import { Button, Label, Select, TextInput } from 'flowbite-react'

export const AddPlayer = () => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState(0)
  const [team, setTeam] = useState('')
  const [age, setAge] = useState(0)
  const [position, setPosition] = useState('')

  return (
    <div className="flex justify-center items-center  mt-20">
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
          <Select
            onChange={(e) => setPosition(e.target.value)}
            value={position}
          >
            <option>Forward</option>
            <option>Midfielder</option>
            <option>Defender</option>
            <option>Goalkeeper</option>
          </Select>
        </div>
        <Button
          color="blue"
          onClick={() => addPlayer(name, number, team, age, position)}
        >
          Add new player
        </Button>
      </div>
    </div>
  )
}
