import { useState, MouseEvent } from 'react';
import { IFootballPlayer } from "../types";

const fetchPlayerDetailsByParams = async (team: string, position: string): Promise<IFootballPlayer[]> => {
    const query = new URLSearchParams();
    if (team) query.append("team", team);
    if (position) query.append("position", position);

    const response = await fetch(`http://localhost:3000/players?${query.toString()}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export default function GetPlayerByQuery() {
    const [teamName, setTeamName] = useState('');
    const [positionPlayer, setPositionPlayer] = useState('');
    const [playerDetailsByParams, setPlayerDetailsByParams] = useState<IFootballPlayer[]>([]);

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const details = await fetchPlayerDetailsByParams(teamName, positionPlayer);
            setPlayerDetailsByParams(details);
        } catch (error) {
            console.error('There was a problem fetching player details:', error);
        }
    };

    return (
        <div>
            <div className='flex gap-5'>
                <input
                    placeholder='Team'
                    type="name"
                    name='team'
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className='border-2 border-black p-3 rounded-md' />

                <input
                    placeholder='Position'
                    type="text"
                    name='position'
                    value={positionPlayer}
                    onChange={(e) => setPositionPlayer(e.target.value)}
                    className='border-2 border-black p-3 rounded-md' />

                <button
                    className='bg-blue-400 p-3 rounded-md'
                    onClick={handleSubmit}
                >
                    Get player by query
                </button>
            </div>

            {playerDetailsByParams.length > 0 && (
                <div className='grid grid-cols-3'>
                    {playerDetailsByParams.map(player => (
                        <div key={player.id} className='col-span-3 px-6 py-4'>
                            <div className='p-6 rounded-lg shadow-inner'>
                                <div className='grid gap-4'>
                                    <div className='text-black'><strong>ID:</strong> {player.id}</div>
                                    <div><strong>Name:</strong> {player.name}</div>
                                    <div><strong>Team:</strong> {player.team}</div>
                                    <div><strong>Number:</strong> {player.number}</div>
                                    <div><strong>Age:</strong> {player.age}</div>
                                    <div><strong>Position:</strong> {player.position}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
