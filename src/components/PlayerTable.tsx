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

  const showPlayerDetails = (id: number) => {
    setSelectedPlayerId(selectedPlayerId === id ? null : id);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="pl-24 py-3 text-left text-xs font-medium uppercase tracking-wider">Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Team</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map(player => (
              <>
                <tr
                  key={player.id}
                  className={`hover:bg-gray-300 cursor-pointer ${selectedPlayerId === player.id ? 'bg-gray-500' : ''}`}
                  onClick={() => showPlayerDetails(player.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{player.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{player.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{player.team}</td>
                </tr>
                {selectedPlayerId === player.id && playerDetails && (
                  <tr>
                    <td colSpan={3} className="px-6 py-4">
                      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                        <div className="grid grid-cols-2 gap-4">
                          <div><strong>ID:</strong> {playerDetails.id}</div>
                          <div><strong>Name:</strong> {playerDetails.name}</div>
                          <div><strong>Team:</strong> {playerDetails.team}</div>
                          <div><strong>Number:</strong> {playerDetails.number}</div>
                          <div><strong>Age:</strong> {playerDetails.age}</div>
                          <div><strong>Position:</strong> {playerDetails.position}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
