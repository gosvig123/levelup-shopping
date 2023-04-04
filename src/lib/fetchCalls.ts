import type { Item } from 'types'
export async function addItem(itemData: Item): Promise<Item> {
  const response = await fetch('http://localhost:3000/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemData)
  })

  const data = await response.json()
  return data
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
      name: item.name,
      count: item.count
    })
  })
  const data = await response.json()
  return data
}

export async function deleteItems(): Promise<void> {
  const response = await fetch(`http://localhost:3000/items`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}
