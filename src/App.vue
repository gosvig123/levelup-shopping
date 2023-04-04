<script setup lang="ts">
import List from './components/List.vue'
import Clock from './components/Clock.vue'
import Leaderboard from './components/Leaderboard.vue'
import { ref } from 'vue'
import type { Player } from 'types'

const players = ref<Player[]>([
  {
    id: 1,
    score: 0,
    time: '00:00:00',
    itemsBought: 0
  }
])
const checkedItemsCount = ref(0)

const updateLeaderboard = (data: any) => {
  const { time } = data
  const newPlayer = {
    id: players.value.length + 1,
    score: 0,
    time: time,
    itemsBought: checkedItemsCount.value
  }
  return players.value.push(newPlayer)
}

const updateCheckedItemsCount = (count: number) => {
  checkedItemsCount.value = count
}
</script>

<template>
  <div class="primaryDiv">
    <List @update-checked-items="updateCheckedItemsCount" />
    <Clock
      :players="players.map(({ time, itemsBought, id }) => ({ time, itemsBought, id }))"
      @update-leaderboard="updateLeaderboard"
      :checked-items-count="checkedItemsCount"
      :update-leaderboard="updateLeaderboard"
    />
  </div>
  <Leaderboard :players="players" />
</template>

<style>
.primaryDiv {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  gap: 100px;
  overflow: hidden;
  border-right: 1px solid black;
  min-width: 100%;
}
</style>
