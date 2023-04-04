<template>
  <div class="leaderboard-container">
    <h1>Leaderboard</h1>
    <ul class="leaderboard-list">
      <li class="header-row">
        <span class="rank">Rank</span>
        <span class="player-time">Time</span>
        <span class="player-items">Items Bought</span>
      </li>
      <li v-for="(player, index) in sortedPlayers" :key="player.id">
        <span class="rank">{{ index + 1 }}</span>
        <span class="player-time">{{ player.time }}</span>
        <span class="player-items">{{ player.itemsBought }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export interface Player {
  id: number
  time: string
  itemsBought: number
  score: number
}

export default defineComponent({
  props: {
    players: {
      type: Array as () => Player[],
      required: true
    }
  },
  setup(props) {
    const sortedPlayers = computed(() => {
      return [...props.players].sort((a, b) => b.score - a.score)
    })

    return {
      sortedPlayers
    }
  }
})
</script>

<style scoped>
.leaderboard-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.leaderboard-list {
  list-style-type: none;
  padding: 0;
}

.leaderboard-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.leaderboard-list li:last-child {
  border-bottom: none;
}

.rank,
.player-time,
.player-items,
.player-score {
  flex: 1;
  text-align: center;
}
</style>
