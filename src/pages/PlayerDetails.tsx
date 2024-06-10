import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { IFootballPlayer } from '../types'
import { fetchPlayerDetails } from '../api/football-api'

export const PlayerDetail = () => {
  const { playerId } = useParams<{ playerId: string }>()
  const [player, setPlayer] = useState<IFootballPlayer | null>(null)

  useEffect(() => {
    const getPlayerDetails = async () => {
      if (playerId) {
        try {
          const details = await fetchPlayerDetails(Number(playerId))

          setPlayer(details)
        } catch (error) {
          console.error('There was a problem fetching player details:', error)
        }
      }
    }

    getPlayerDetails()
  }, [playerId])

  if (!player) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-5">{player.name}</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Id:</strong> {player.id}
          </div>
          <div>
            <strong>Name:</strong> {player.name}
          </div>
          <div>
            <strong>Team:</strong> {player.team}
          </div>
          <div>
            <strong>Number:</strong> {player.number}
          </div>
          <div>
            <strong>Age:</strong> {player.age}
          </div>
          <div>
            <strong>Position:</strong> {player.position}
          </div>
        </div>
      </div>
    </div>
  )
}
