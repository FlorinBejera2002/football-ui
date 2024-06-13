const BASE_URL = 'http://localhost:3000'

import { IFootballPlayer } from '../types'

export const getPlayers = async () => {
  const response = await fetch(`${BASE_URL}/players`)
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error))

  return response
}
export const fetchPlayerDetails = async (id: number) => {
  const response = await fetch(`${BASE_URL}/players/${id}`)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

export const deletePlayer = async (id: number) => {
  await fetch(`${BASE_URL}/players/${id}`, { method: 'DELETE' })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.error('Failed to delete player:', error))
  location.reload()
}

export const updatePlayer = async (id: number, player: IFootballPlayer) => {
  await fetch(`${BASE_URL}/players/${id}`, {
    body: JSON.stringify(player),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT'
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.error('Failed to update player:', error))
  location.reload()
}

export const addPlayer = async (player: IFootballPlayer) => {
  console.log('Add player:' + player)
  await fetch(`${BASE_URL}/players`, {
    body: JSON.stringify(player),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    method: 'POST'
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.error('Failed to add new player:', error))
}
export const getDetailsByParams = async (team: string, position: string) => {
  const query = new URLSearchParams()

  if (team) query.append('team', team)
  if (position) query.append('position', position)

  const response = await fetch(`${BASE_URL}/players?${query.toString()}`)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}
