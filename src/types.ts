export enum IPosition {
  Defender = 'Defender',
  Forward = 'Forward',
  Goalkeeper = 'Goalkeeper',
  Midfielder = 'Midfielder'
}

export type IFootballPlayer = {
  age: number
  id: number
  name: string
  number: number
  position: IPosition
  team: string
}
