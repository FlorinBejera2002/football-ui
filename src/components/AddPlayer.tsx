import { useState } from 'react'

import { fetchNewPlayer } from '../api/football-api'

export const AddPlayer = () => {
  const [addName, setAddName] = useState('')
  const [addNumber, setAddNumber] = useState('')
  const [addTeam, setAddTeam] = useState('')
  const [addAge, setAddAge] = useState('')
  const [addPosition, setAddPosition] = useState('')

  return (
    <div>
      <div className="w-[40em] flex justify-center items-center flex-col gap-5 mt-20">
        <input
          className="border-2 border-gray-700 p-3 rounded-md w-[25em] "
          onChange={(e) => setAddName(e.target.value)}
          placeholder="Name"
          type="text"
          value={addName}
        />

        <input
          className="border-2 border-gray-700 p-3 rounded-md w-[25em] "
          onChange={(e) => setAddNumber(e.target.value)}
          placeholder="Number"
          type="number"
          value={addNumber}
        />

        <input
          className="border-2 border-gray-700 p-3 rounded-md w-[25em] "
          onChange={(e) => setAddTeam(e.target.value)}
          placeholder="Team"
          type="text"
          value={addTeam}
        />

        <input
          className="border-2 border-gray-700 p-3 rounded-md w-[25em] "
          onChange={(e) => setAddAge(e.target.value)}
          placeholder="Age"
          type="number"
          value={addAge}
        />

        <input
          className="border-2 border-gray-700 p-3 rounded-md w-[25em] "
          onChange={(e) => setAddPosition(e.target.value)}
          placeholder="Position"
          type="text"
          value={addPosition}
        />

        <button
          className="bg-blue-500 p-3 rounded-md"
          onClick={() =>
            fetchNewPlayer(addName, addNumber, addTeam, addAge, addPosition)
          }
        >
          Add new player
        </button>
      </div>
    </div>
  )
}
