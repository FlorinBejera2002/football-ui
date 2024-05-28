
const BASE_URL = 'http://localhost:3000'

export const getPlayers = async () => {

  const response = await fetch(`${BASE_URL}/players`)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))

  return response
}