import { IFootballPlayer } from "../types";

type IProps = {
  players: IFootballPlayer[];
};

export const PlayerTable = (props: IProps) => {


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
        {props.players.map((player, index) => (
          <tr key={index} className="hover:bg-gray-300 cursor-pointer" onClick={() => 
          { alert(`Click' ${player.id}`) }}>
            <td className="text-right px-5">{player.id}</td>
            <td className="text-right px-5">{player.name}</td>
            <td className="text-right px-5">{player.team}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
