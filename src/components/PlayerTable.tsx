import { useState, useEffect } from 'react';
import { IFootballPlayer } from "../types";
import GetPlayerByQerry from './GetPlayerByQerry';
import AddPlayer from './AddPlayer';

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

const fetchPlayerDelete = async (id: number) => {
  confirm(`Esti sigur ca vrei sa stergi jucatorul cu id-ul ${id}`)
  await fetch(`http://localhost:3000/players/${id}`, { method: 'DELETE' },)
    .then(response => response.json())
    .then(response => console.log(response))
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
    <div className="flex justify-center items-center flex-col gap-20 min-h-screen ">
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Id</th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Team</th>
              <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map(player => (
              <>
                <tr
                  key={player.id}
                  className={`hover:bg-gray-300 cursor-pointer `}
                  onClick={() => showPlayerDetails(player.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{player.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{player.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{player.team}</td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <button className='px-4 py-2 bg-red-500 text-white rounded' onClick={() => fetchPlayerDelete(player.id)}>Delete</button>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded ml-2'>Edit</button>
                  </td>

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

      <GetPlayerByQerry />
      <AddPlayer />

    </div>
  );
};