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
          <th className="text-right px-5">Number</th>
          <th className="text-right px-5">Team</th>
          <th className="text-right px-5">Age</th>
          <th className="text-right px-5">Position</th>
        </tr>
      </thead>

      <tbody>
        {props.players.map((player, index) => (
          <tr key={index}>
            <td className="text-right px-5">{player.id}</td>
            <td className="text-right px-5">{player.name}</td>
            <td className="text-right px-5">{player.number}</td>
            <td className="text-right px-5">{player.team}</td>
            <td className="text-right px-5">{player.age}</td>
            <td className="text-right px-5">{player.position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
