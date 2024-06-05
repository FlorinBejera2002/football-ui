import { useEffect, useState } from 'react'

import { IFootballPlayer } from './types'
import { PlayerTable } from './components/PlayerTable'
import { getPlayers } from './api/football-api'

export const App = () => {
  const [players, setPlayers] = useState<IFootballPlayer[]>([])

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!players.length) {
        // Acest cod se execută o dată când se încarcă componenta
        const response = await getPlayers()

        setPlayers(response)
      }
    }

    fetchPlayers()
  }, [players.length])

  return (
    <div className="container p-11">
      <div className="font-bold text-3xl mb-11">football-ui</div>

      <PlayerTable players={players} />
    </div>
  )
}
