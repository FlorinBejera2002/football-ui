import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { IFootballPlayer } from './types'
import { PlayerTable } from './pages/PlayerTable'
import { PlayerDetail } from './pages/PlayerDetails'
import { Layout } from './pages/Layout'
import { GetPlayerByQuery } from './pages/GetPlayerByQerry'
import { AddPlayer } from './pages/AddPlayer'
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
    <div className="container ">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<PlayerTable players={players} />} index={true} />
            <Route element={<AddPlayer />} path="newplayer" />
            <Route element={<GetPlayerByQuery />} path="querryparams" />
            <Route element={<PlayerDetail />} path="/:playerId" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
