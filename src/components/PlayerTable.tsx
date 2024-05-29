import { useState, useEffect } from 'react';
import { IFootballPlayer } from "../types";

type IProps = {
  players: IFootballPlayer[];
};

const fetchPlayerDetails = async (id: number) => {
  const response = await fetch(`http://localhost:3000/players/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const PlayerTable = ({ players }: IProps) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [playerDetails, setPlayerDetails] = useState<IFootballPlayer | null>(null);

  useEffect(() => {
    if (selectedPlayerId !== null) {
      const getPlayerDetails = async () => {
        try {
          const details = await fetchPlayerDetails(selectedPlayerId);
          setPlayerDetails(details);
        } catch (error) {
          console.error('There was a problem fetching player details:', error);
        }
      };

      getPlayerDetails();
    }
  }, [selectedPlayerId]);

  const handleRowClick = (id: number) => {
    setSelectedPlayerId(selectedPlayerId === id ? null : id); 
  };

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="text-right px-5">Id</th>
          <th className="text-right px-5">Name</th>
          <th className="text-right px-5">Team</th>
        </tr>
      </thead>

      <tbody>
        {players.map(player => (
          <>
            <tr
              key={player.id}
              className='hover:bg-gray-300 cursor-pointer'
              onClick={() => handleRowClick(player.id)}
            >
              <td className="text-right px-5">{player.id}</td>
              <td className="text-right px-5">{player.name}</td>
              <td className="text-right px-5">{player.team}</td>
            </tr>
            {selectedPlayerId === player.id && playerDetails && (
              <tr>
                <td>
                  <div>ID: {player.id}</div>
                  <div>Name: {player.name}</div>
                  <div>Team: {player.team}</div>
                  <div>Number: {player.number}</div>
                  <div>Age: {player.age}</div>
                  <div>Position: {player.position}</div>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};
