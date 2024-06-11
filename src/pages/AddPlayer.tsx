import { useState } from 'react'

import { fetchNewPlayer } from '../api/football-api'

import { Button, Label, Select, TextInput } from 'flowbite-react'

export const AddPlayer = () => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState(0)
  const [team, setTeam] = useState('')
  const [age, setAge] = useState(0)
  const [position, setPosition] = useState('')

  return (
    <div className="flex justify-center items-center">
      <div className="space-y-6 w-96">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            onChange={(e) => setTeam(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
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
            <Label value="Number" />
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
          onClick={() => fetchNewPlayer(name, number, team, age, position)}
        >
          Add new player
        </Button>
      </div>
    </div>
  )
}
