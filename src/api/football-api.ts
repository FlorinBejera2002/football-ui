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
  confirm(`Esti sigur ca vrei sa stergi jucatorul cu id-ul ${id}`)
  await fetch(`${BASE_URL}/players/${id}`, { method: 'DELETE' })
    .then((response) => response.json())
    .then((response) => console.log(response))
  window.location.reload()
}

export const updatePlayer = async (
  id: number,
  updatedData: {
    age: number
    name: string
    number: number
    position: string
    team: string
  }
): Promise<IFootballPlayer> => {
  try {
    const response = await fetch(`${BASE_URL}/players/${id}`, {
      body: JSON.stringify(updatedData),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    window.location.reload()

    return response.json()
  } catch (error) {
    console.error('Failed to update player:', error)
    throw error
  }
}

export const fetchNewPlayer = async (
  addName: string,
  addNumber: number,
  addTeam: string,
  addAge: number,
  addPosition: string
) => {
  const response = await fetch(`${BASE_URL}/players`, {
    body: JSON.stringify({
      age: addAge,
      name: addName,
      number: addNumber,
      position: addPosition,
      team: addTeam
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    method: 'POST'
  })

  window.location.reload()
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

export const fetchPlayerDetailsByParams = async (
  team: string,
  position: string
): Promise<IFootballPlayer[]> => {
  const query = new URLSearchParams()

  if (team) query.append('team', team)
  if (position) query.append('position', position)

  const response = await fetch(
    `http://localhost:3000/players?${query.toString()}`
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}
