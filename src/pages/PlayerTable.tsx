import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'

import { IFootballPlayer } from '../types'
import { deletePlayer, updatePlayer } from '../api/football-api'

type IProps = {
  players: IFootballPlayer[]
}

export const PlayerTable = ({ players }: IProps) => {
  const navigate = useNavigate()

  const [editPlayerId, setEditPlayerId] = useState<null | number>(null)
  const [editName, setEditName] = useState('')
  const [editNumber, setEditNumber] = useState(0)
  const [editTeam, setEditTeam] = useState('')
  const [editAge, setEditAge] = useState(0)
  const [editPosition, setEditPosition] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterTeam, setFilterTeam] = useState('')

  const showPlayerDetails = async (id: number) => {
    navigate(`/${id}`)
  }

  const startEditing = (player: IFootballPlayer) => {
    setEditPlayerId(player.id)
    setEditName(player.name)
    setEditNumber(player.number)
    setEditTeam(player.team)
    setEditAge(player.age)
    setEditPosition(player.position)
  }

  const handleSave = async (id: number) => {
    try {
      await updatePlayer(id, {
        age: editAge,
        name: editName,
        number: editNumber,
        position: editPosition,
        team: editTeam
      })
      setEditPlayerId(null)
    } catch (error) {
      console.error('There was a problem updating the player:', error)
    }
  }

  const handleClose = () => {
    setEditPlayerId(null)
    setEditName('')
    setEditNumber(0)
    setEditTeam('')
    setEditAge(0)
    setEditPosition('')
  }

  const filteredPlayers = players.filter(
    (item) =>
      item.name.toLowerCase().includes(filterName.toLowerCase()) &&
      item.team.toLowerCase().includes(filterTeam.toLowerCase())
  )

  return (
    <div className="flex ml-20 flex-col gap-20 min-h-screen items-center mt-20">
      <div className="mb-4 flex gap-4">
        <input
          className="p-2 border rounded-md"
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="Filter by name"
          type="text"
          value={filterName}
        />
        <input
          className="p-2 border rounded-md"
          onChange={(e) => setFilterTeam(e.target.value)}
          placeholder="Filter by team"
          type="text"
          value={filterTeam}
        />
      </div>
      <div className="w-3/4 flex">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Id
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Team
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPlayers.map((player) => (
              <React.Fragment key={player.id}>
                <tr
                  className="hover:bg-gray-300 cursor-pointer"
                  onClick={() => showPlayerDetails(player.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {player.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {player.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {player.team}
                  </td>
                  <td className="text-center text-sm font-medium">
                    <button
                      className="px-5 py-2 bg-red-500 text-white rounded z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        deletePlayer(player.id)
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="px-5 py-2 bg-blue-500 text-white rounded z-10 ml-5"
                      onClick={(e) => {
                        e.stopPropagation()
                        startEditing(player)
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                {editPlayerId === player.id && (
                  <tr>
                    <td className="px-6 py-4" colSpan={4}>
                      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex gap-2 items-center font-bold px-5 py-2 bg-gray-300 rounded-md">
                            Name:
                            <input
                              className="block w-full mt-1 p-2 border rounded-md text-gray-700 font-normal bg-gray-200"
                              onChange={(e) => setEditName(e.target.value)}
                              value={editName}
                            />
                          </div>
                          <div className="flex gap-2 items-center font-bold px-5 py-2 bg-gray-300 rounded-md">
                            Team:
                            <input
                              className="block w-full mt-1 p-2 border rounded-md text-gray-700 font-normal bg-gray-200"
                              onChange={(e) => setEditTeam(e.target.value)}
                              value={editTeam}
                            />
                          </div>
                          <div className="flex gap-2 items-center font-bold px-5 py-2 bg-gray-300 rounded-md">
                            Number:
                            <input
                              className="block w-full mt-1 p-2 border rounded-md text-gray-700 font-normal bg-gray-200"
                              onChange={(e) =>
                                setEditNumber(Number(e.target.value))
                              }
                              value={editNumber}
                            />
                          </div>
                          <div className="flex gap-2 items-center font-bold px-5 py-2 bg-gray-300 rounded-md">
                            Age:
                            <input
                              className="block w-full mt-1 p-2 border rounded-md text-gray-700 font-normal bg-gray-200"
                              onChange={(e) =>
                                setEditAge(Number(e.target.value))
                              }
                              value={editAge}
                            />
                          </div>
                          <div className="flex gap-2 items-center font-bold px-5 py-2 bg-gray-300 rounded-md">
                            Position:
                            <input
                              className="block w-full mt-1 p-2 border rounded-md text-gray-700 font-normal bg-gray-200"
                              onChange={(e) => setEditPosition(e.target.value)}
                              value={editPosition}
                            />
                          </div>
                          <div className="flex justify-end gap-5 items-center">
                            <button
                              className="px-5 py-2 bg-green-500 text-white rounded mt-5 z-10"
                              onClick={() => handleSave(player.id)}
                            >
                              Save
                            </button>
                            <button
                              className="px-5 py-2 bg-gray-500 text-white rounded mt-5 z-10"
                              onClick={handleClose}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
