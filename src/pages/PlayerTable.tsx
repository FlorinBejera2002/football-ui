import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'

import { IFootballPlayer, IPosition } from '../types'
import { FormInput } from '../components/FormInput'
import { deletePlayer, updatePlayer } from '../api/football-api'

import { HiOutlineExclamationCircle } from 'react-icons/hi'
import {
  Button,
  Checkbox,
  Modal,
  Select,
  Table,
  TextInput
} from 'flowbite-react'

type IProps = {
  players: IFootballPlayer[]
}

export const PlayerTable = ({ players }: IProps) => {
  const navigate = useNavigate()

  const [editPlayerId, setEditPlayerId] = useState<null | number>(null)
  const [filterName, setFilterName] = useState('')
  const [filterPosition, setFilterPosition] = useState('')
  const [deletePlayerId, setDeletePlayerId] = useState<null | number>(null)
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)

  const showPlayerDetails = async (id: number) => {
    navigate(`/${id}`)
  }

  const handleSave = async (id: number, updatedPlayer: IFootballPlayer) => {
    try {
      await updatePlayer(id, updatedPlayer)
      setEditPlayerId(null)
    } catch (error) {
      console.error('There was a problem updating the player:', error)
    }
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPlayers([])
    } else {
      setSelectedPlayers(players.map((player) => player.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectPlayer = (id: number) => {
    if (selectedPlayers.includes(id)) {
      setSelectedPlayers(selectedPlayers.filter((playerId) => playerId !== id))
    } else {
      setSelectedPlayers([...selectedPlayers, id])
    }
  }

  const handleDeleteSelected = () => {
    try {
      selectedPlayers.map(async (playerId) => await deletePlayer(playerId))
    } catch (error) {
      console.error('There was a problem deleting the selected players:', error)
    }
  }

  const filteredPlayers = players.filter(
    (item) =>
      item.name.toLowerCase().includes(filterName.toLowerCase()) &&
      (filterPosition === '' ||
        item.position.toLowerCase() === filterPosition.toLowerCase())
  )

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex gap-20 mb-10">
        <TextInput
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="Filter by name"
          type="name"
          value={filterName}
        />
        <div className="max-w-md">
          <Select
            id="positions"
            onChange={(e) => setFilterPosition(e.target.value)}
            required={true}
          >
            <option value="">All positions</option>
            {Object.values(IPosition).map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white shadow-lg rounded-lg">
          <Table.Head>
            <Table.HeadCell>
              <Checkbox checked={selectAll} onChange={handleSelectAll} />
            </Table.HeadCell>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Team</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>

            <Table.HeadCell>
              {selectedPlayers.length > 0 && (
                <Button color="failure" onClick={handleDeleteSelected}>
                  Delete
                </Button>
              )}
            </Table.HeadCell>

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
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 relative">
                  <Table.Cell
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectPlayer(player.id)
                    }}
                  >
                    <Checkbox
                      checked={selectedPlayers.includes(player.id)}
                      className="z-20 cursor-pointer"
                      onChange={(e) => {
                        e.stopPropagation()
                        handleSelectPlayer(player.id)
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {player.id}
                  </Table.Cell>
                  <Table.Cell onClick={() => showPlayerDetails(player.id)}>
                    {player.name}
                  </Table.Cell>
                  <Table.Cell onClick={() => showPlayerDetails(player.id)}>
                    {player.team}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditPlayerId(player.id)
                      }}
                    >
                      Edit
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeletePlayerId(player.id)
                      }}
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
                <Modal
                  onClose={() => setEditPlayerId(null)}
                  show={editPlayerId === player.id}
                  size="lg"
                >
                  <Modal.Header>Edit Player</Modal.Header>
                  <Modal.Body>
                    <FormInput
                      buttonColor="success"
                      functionEvent={(updatedPlayer) =>
                        handleSave(player.id, updatedPlayer)
                      }
                      textButton="Save"
                      valueState={player}
                    />
                  </Modal.Body>
                </Modal>
                <Modal
                  onClose={() => setDeletePlayerId(null)}
                  popup={true}
                  show={deletePlayerId === player.id}
                  size="lg"
                >
                  <Modal.Header></Modal.Header>
                  <Modal.Body>
                    <div className="">
                      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200 text-center" />
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
                        Are you sure you want to delete this player?
                      </h3>
                      <div className="grid gap-2 mb-12 ml-10">
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

                      <div className="flex justify-center gap-4">
                        <Button
                          color="failure"
                          onClick={() => {
                            deletePlayer(player.id)
                            setDeletePlayerId(null)
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => setDeletePlayerId(null)}
                        >
                          No, cancel
                        </Button>
                      </div>
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
