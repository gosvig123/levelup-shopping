export interface Player {
  id: number
  time: string
  itemsBought: number
  score: number
}

export interface Item {
  name: string
  id?: number
  checked: boolean
  count: number
}
