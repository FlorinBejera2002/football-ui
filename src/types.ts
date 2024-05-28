export enum IPosition {
  Goalkeeper = "Goalkeeper",
  Defender = "Defender",
  Midfielder = "Midfielder",
  Forward = "Forward"
}

export type IFootballPlayer = {
  id: number,
  name: string,
  number: number,
  team: string,
  age: number,
  position: IPosition,
}