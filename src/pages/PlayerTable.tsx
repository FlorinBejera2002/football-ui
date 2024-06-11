import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import React from 'react'

import { IFootballPlayer } from '../types'
import { deletePlayer, updatePlayer } from '../api/football-api'

import { Button, Label, Modal, Select, Table, TextInput } from 'flowbite-react'

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
  const [filterPosition, setFilterPosition] = useState('All position')
  const emailInputRef = useRef<HTMLInputElement>(null)

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

  const filteredPlayers = players.filter((item) => {
    const nameFiltred = item.name
      .toLowerCase()
      .includes(filterName.toLowerCase())
    const positionFilterd =
      filterPosition === 'All position' || item.position === filterPosition

    return nameFiltred && positionFilterd
  })

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex gap-20 mb-10">
        <TextInput
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="Filter by name"
          type="name"
          value={filterName}
        />
        <Select
          onChange={(e) => setFilterPosition(e.target.value)}
          value={filterPosition}
        >
          <option>All position</option>
          <option>Forward</option>
          <option>Midfielder</option>
          <option>Defender</option>
          <option>Goalkeeper</option>
        </Select>
      </div>
      <div className="overflow-x-auto w-[60em]">
        <Table className="min-w-full bg-white shadow-lg rounded-lg">
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Team</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredPlayers.map((player) => (
              <React.Fragment key={player.id}>
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                  onClick={() => showPlayerDetails(player.id)}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {player.id}
                  </Table.Cell>
                  <Table.Cell>{player.name}</Table.Cell>
                  <Table.Cell>{player.team}</Table.Cell>
                  <Table.Cell>
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        startEditing(player)
                      }}
                    >
                      Edit
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={(e) => {
                        e.stopPropagation()
                        deletePlayer(player.id)
                      }}
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
                <Modal
                  initialFocus={emailInputRef}
                  onClose={handleClose}
                  show={editPlayerId === player.id}
                  size="lg"
                >
                  <Modal.Header>Edit Player</Modal.Header>
                  <Modal.Body>
                    <div className="space-y-6">
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput
                          onChange={(e) => setEditName(e.target.value)}
                          value={editName}
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label value="Team" />
                        </div>
                        <TextInput
                          onChange={(e) => setEditTeam(e.target.value)}
                          value={editTeam}
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label value="Number" />
                        </div>
                        <TextInput
                          onChange={(e) =>
                            setEditNumber(Number(e.target.value))
                          }
                          value={editNumber}
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label value="Age" />
                        </div>
                        <TextInput
                          onChange={(e) => setEditAge(Number(e.target.value))}
                          value={editAge}
                        />
                      </div>
                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Position" />
                        </div>
                        <Select
                          onChange={(e) => setEditPosition(e.target.value)}
                          value={editPosition}
                        >
                          <option>{player.position}</option>
                          <option>Forward</option>
                          <option>Midfielder</option>
                          <option>Defender</option>
                          <option>Goalkeeper</option>
                        </Select>
                      </div>
                      <Button
                        color="success"
                        onClick={() => handleSave(player.id)}
                      >
                        Save
                      </Button>
                    </div>
                  </Modal.Body>
                </Modal>
              </React.Fragment>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
