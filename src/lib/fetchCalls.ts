// fetchCalls.ts
interface Item {
  id: number
  name: string
  checked: boolean
  count: number
}

export const addItem = (newItem: any): Promise<Item> => {
  return fetch('http://localhost:3000/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item: newItem, checked: false, count: 1 })
  }).then((res) => res.json())
}

export async function getItems(): Promise<Item[]> {
  const response = await fetch('http://localhost:3000/items')
  const data = await response.json()
  return data
}

export async function updateItem(item: Item): Promise<Item> {
  const response = await fetch(`http://localhost:3000/items`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      checked: item.checked,
      id: item.id,
      item: item.name,
      count: item.count
    })
  })
  const data = await response.json()
  return data
}

export async function deleteItems(): Promise<any> {
  const response = await fetch(`http://localhost:3000/items`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}
