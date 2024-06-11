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
    <div className="container w-full flex flex-col justify-center items-center mt-10">
      <h1 className="text-5xl font-bold mb-3">{player.name}</h1>
      <div className="bg-gray-50 p-20 rounded-lg shadow-inner">
        <div className="grid gap-4 text-2xl">
          <div className="text-gray-600">
            <strong>Id:</strong> {player.id}
          </div>
          <div className="text-gray-600">
            <strong>Name:</strong> {player.name}
          </div>
          <div className="text-gray-600">
            <strong>Team:</strong> {player.team}
          </div>
          <div className="text-gray-600">
            <strong>Number:</strong> {player.number}
          </div>
          <div className="text-gray-600">
            <strong>Age:</strong> {player.age}
          </div>
          <div className="text-gray-600">
            <strong>Position:</strong> {player.position}
          </div>
        </div>
      </div>
    </div>
  )
}
