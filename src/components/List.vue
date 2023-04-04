<template>
  <div class="grocery-list-container">
    <h1>Grocery List</h1>
    <input
      class="grocery-input"
      type="text"
      v-model="newItem"
      @keyup.enter="addItem"
      placeholder="Enter a grocery item"
    />
    <button class="add-item-btn" @click="addItem">Add Item</button>
    <ul class="grocery-list">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        @click="selectItem(index)"
        :class="{ 'selected-item': selectedItem === index }"
      >
        <input type="checkbox" class="checkbox" @change="toggleCheck(index)" />
        <span class="itemName">
          {{ item.name }}
        </span>

        <input class="itemCount" type="number" v-model="item.count" />

        <span class="plusOrMinus">
          <button @click="increment()">+</button>

          <button @click="decrement()">-</button>
        </span>
      </li>
    </ul>

    <h2>Unique Checked Items</h2>
    <button class="delete-all-btn" @click="deleteItems">Delete All Items</button>

    <ul class="grocery-list unique-checked-items">
      <li v-for="(item, index) in uniqueCheckedItems" :key="index">
        <input type="checkbox" v-model="item!.checked" @change="uncheckItem(index)" />

        {{ item!.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { updateItem, deleteItems, addItem } from '../lib/fetchCalls'
interface Item {
  id: number
  name: string
  checked: boolean
  count: number
}
export default defineComponent({
  data() {
    return {
      newItem: '',
      items: [] as Item[],
      checkedItems: [] as Item[],
      selectedItem: 0
    }
  },
  created() {
    fetch('http://localhost:3000/items')
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item: any) => {
          const newItem = {
            id: item.id,
            name: item.item,
            checked: item.checked,
            count: item.count
          }
          if (item.checked) {
            this.checkedItems.push(newItem)
          } else {
            this.items.push(newItem)
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  computed: {
    uniqueCheckedItems() {
      return Array.from(new Set(this.checkedItems.map((item) => item.name))).map((name) =>
        this.checkedItems.find((item) => item.name === name)
      )
    }
  },
  methods: {
    async addItem() {
      if (this.newItem) {
        try {
          const data = await addItem(this.newItem)
          this.items.push({
            id: data.id,
            name: this.newItem,
            checked: false,
            count: 1
          })
          this.newItem = ''
        } catch (err) {
          console.log(err)
        }
      }
    },
    selectItem(index: number) {
      this.selectedItem = index
    },

    async increment() {
      this.items[this.selectedItem].count++

      try {
        const data = await updateItem(this.items[this.selectedItem])
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },

    async decrement() {
      this.items[this.selectedItem].count--

      try {
        const data = await updateItem(this.items[this.selectedItem])
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },

    deleteItems() {
      this.items = []
      this.checkedItems = []
      deleteItems()
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    async toggleCheck(index: number) {
      const checkedItem = this.items[index]
      checkedItem.checked = !checkedItem.checked
      this.checkedItems.push(checkedItem)

      this.items.splice(index, 1)

      this.selectItem(0)

      this.checkedItems = this.checkedItems.filter(
        (item, i, arr) => arr.findIndex((t) => t.name === item.name) === i
      )
      this.$emit('update-checked-items', this.checkedItems.length)

      try {
        const data = await updateItem(checkedItem)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },

    async uncheckItem(index: number) {
      const uncheckedItem = this.uniqueCheckedItems[index]

      if (uncheckedItem) {
        uncheckedItem.checked = false
        this.checkedItems.splice(index, 1)
        this.items.push(uncheckedItem)

        this.items = this.items.filter(
          (item, i, arr) => arr.findIndex((t) => t.name === item.name) === i
        )

        try {
          const data = await updateItem(uncheckedItem)

          console.log(data)
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
})
</script>

<style scoped>
.grocery-list-container {
  margin: 0 auto;
  font-size: 18px;
  min-width: auto;
}

.grocery-input,
.add-item-btn {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
}

.add-item-btn {
  background-color: #4caf50;
  color: white;

  border: none;
  cursor: pointer;
}

.add-item-btn:hover {
  background-color: #45a049;

  transition: background-color 0.2s ease;
}

.grocery-list {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}
.unique-checked-items {
  padding: 0;
  margin-bottom: 30px;
}

input[type='checkbox'] {
  margin-right: 10px;
  flex-shrink: 0;

  cursor: pointer;
  height: 20px;
  width: 20px;
}

.grocery-list li,
.unique-checked-items li {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  gap: 20px;
  display: flex;
  align-items: center;
}

.grocery-list li:hover,
.selected-item {
  background-color: #45a049;
  color: white;
}
.delete-all-btn {
  background-color: #f44336;
  color: white;
  width: 100%;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.delete-all-btn:hover {
  background-color: #e53935;
  transition: background-color 0.2s ease;
}

h1 {
  text-align: center;
  color: #4caf50;
  margin-bottom: 20px;
}

.itemCount,
.plusOrMinus {
  height: 25px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.plusOrMinus:hover {
  cursor: pointer;
}

.unique-checked-items li .item-name {
  flex-grow: 1;
  word-wrap: break-word;
  padding: 10px;
  margin-right: 22px;
  position: relative;
}

.itemCount {
  width: 50px;
  margin-left: auto;
}
</style>
