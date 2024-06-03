import { useState } from 'react';

const fetchNewPlayer = async (addName: string, addNumber: string, addTeam: string, addAge: string, addPosition: string) => {

    const response = await fetch("http://localhost:3000/players", {
        method: "POST",
        body: JSON.stringify({
            name: addName,
            number: addNumber,
            team: addTeam,
            age: addAge,
            position: addPosition
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export default function AddPlayer() {
    const [addName, setAddName] = useState("");
    const [addNumber, setAddNumber] = useState("");
    const [addTeam, setAddTeam] = useState("");
    const [addAge, setAddAge] = useState("");
    const [addPosition, setAddPosition] = useState("");

    return (
        <div>
            <form className='grid grid-cols-3 gap-5 mb-44' onSubmit={() => fetchNewPlayer(addName, addNumber, addAge, addTeam, addPosition)}>
                <input
                    placeholder='Name'
                    type="text"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    className='border-2 border-black p-3 rounded-md' />

                <input
                    placeholder='Number'
                    type="number"
                    value={addNumber}
                    onChange={(e) => setAddNumber(e.target.value)}
                    className='border-2 border-black p-3 rounded-md' />

                <input
                    placeholder='Team'
                    type="text"
                    value={addTeam}
                    onChange={(e) => setAddTeam(e.target.value)}
                    className='border-2 border-black p-3 rounded-md' />

                <input
                    placeholder='Age'
                    type="number"
                    value={addAge}
                    onChange={(e) => setAddAge(e.target.value)}
                    className='border-2 border-black p-3 rounded-md' />

                <input
                    placeholder='Position'
                    type="text"
                    value={addPosition}
                    onChange={(e) => setAddPosition(e.target.value)}
                    className='border-2 border-black p-3 rounded-md' />

                <button
                    className='bg-blue-400 p-3 rounded-md'
                    type='submit'
                >
                    Add new player
                </button>
            </form>
        </div>
    );
}
