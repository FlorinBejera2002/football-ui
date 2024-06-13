import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { IFootballPlayer } from '../types'
import { fetchPlayerDetails } from '../api/football-api'

import { Card, Spinner } from 'flowbite-react'

export const PlayerDetail = () => {
  const { playerId } = useParams<{ playerId: string }>()
  const [player, setPlayer] = useState<IFootballPlayer | null>(null)

  useEffect(() => {
    const getPlayerDetails = async () => {
      try {
        const details = await fetchPlayerDetails(Number(playerId))

        setPlayer(details)
      } catch (error) {
        console.error('There was a problem fetching player details:', error)
      }
    }

    getPlayerDetails()
  }, [playerId])

  if (!player) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    )
  }

  return (
    <div className="container w-full flex flex-col justify-center items-center mt-10">
      <Card>
        <h1 className="text-5xl font-bold mb-3">{player.name}</h1>
        <div className="grid gap-4 text-2xl">
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
      </Card>
    </div>
  )
}
