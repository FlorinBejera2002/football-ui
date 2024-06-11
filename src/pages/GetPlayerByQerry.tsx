import { MouseEvent, useState } from 'react'

import { IFootballPlayer } from '../types'
import { getDetailsByParams } from '../api/football-api'

export const GetPlayerByQuery = () => {
  const [teamName, setTeamName] = useState('')
  const [positionPlayer, setPositionPlayer] = useState('')
  const [playerDetailsByParams, setPlayerDetailsByParams] = useState<
    IFootballPlayer[]
  >([])

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const details = await getDetailsByParams(teamName, positionPlayer)

      setPlayerDetailsByParams(details)
    } catch (error) {
      console.error('There was a problem fetching player details:', error)
    }
  }

  return (
    <div>
      <div className="flex gap-5 ml-20 mt-10">
        <input
          className="border-2 border-black p-3 rounded-md"
          name="team"
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team"
          type="name"
          value={teamName}
        />

        <input
          className="border-2 border-black p-3 rounded-md"
          name="position"
          onChange={(e) => setPositionPlayer(e.target.value)}
          placeholder="Position"
          type="text"
          value={positionPlayer}
        />

        <button
          className="bg-blue-500 px-5 py-2 rounded-md text-white"
          onClick={handleSubmit}
        >
          Get player by query
        </button>
      </div>

      {playerDetailsByParams.length > 0 && (
        <div className="ml-8 grid grid-cols-3 w-2/3">
          {playerDetailsByParams.map((player) => (
            <div className="px-6 py-4" key={player.id}>
              <div className="p-6 rounded-md shadow-inner bg-gray-300">
                <div className="grid gap-4">
                  {Object.entries(player).map(([key, value]) => (
                    <div className="text-black" key={key}>
                      <strong>{key}:</strong> {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
