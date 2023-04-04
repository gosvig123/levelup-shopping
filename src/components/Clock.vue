<template>
  <div class="stopwatch-container">
    <h1>Stopwatch</h1>
    <div class="timer">{{ time }}</div>
    <button class="start-btn" @click="startTimer">Start</button>
    <button class="stop-btn" @click="stopTimer">Stop</button>
    <button class="reset-btn" @click="resetTimer">Reset</button>
    <button class="finished-btn" @click="finishGame">Finish</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    checkedItemsCount: {
      type: Number,
      required: true
    },
    updateLeaderboard: {
      type: Function as any as () => (data: { time: string; itemsBought: number }) => void,
      required: true
    }
  },
  setup(props) {
    const time = ref('00:00:00')
    let interval: any = null

    function startTimer() {
      if (interval) return
      let [hours, minutes, seconds] = time.value.split(':').map(Number)

      interval = setInterval(() => {
        seconds++
        if (seconds >= 60) {
          seconds = 0
          minutes++
        }

        if (minutes >= 60) {
          minutes = 0
          hours++
        }

        time.value = `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      }, 1000)
    }
    function stopTimer() {
      clearInterval(interval)
      interval = null
    }

    function resetTimer() {
      stopTimer()
      time.value = '00:00:00'
    }

    function finishGame() {
      stopTimer()
      props.updateLeaderboard({ time: time.value, itemsBought: props.checkedItemsCount })

      resetTimer()
    }

    return { time, startTimer, stopTimer, resetTimer, finishGame }
  }
})
</script>

<style scoped>
.stopwatch-container {
  margin: 0 auto;
  font-size: 18px;
  min-width: auto;
  margin-right: 50px;
}

.timer {
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
}

.start-btn,
.stop-btn,
.reset-btn {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.start-btn:hover {
  background-color: #45a049;
}

.stop-btn {
  background-color: #f44336;
}

.stop-btn:hover {
  background-color: #e53935;
}

.reset-btn {
  background-color: #ff9800;
}

.finished-btn {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  background-image: linear-gradient(45deg, #4caf50 25%, transparent 25%),
    linear-gradient(-45deg, #4caf50 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #4caf50 75%),
    linear-gradient(-45deg, transparent 75%, #4caf50 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  background-color: black;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Add this line */
  border: none;
  cursor: pointer;
}

.finished-btn:hover {
  background-color: #45a049;
  background-image: none;
}

.reset-btn:hover {
  background-color: #f57c00;
}

button:hover {
  transition: background-color 0.2s ease;
}
</style>
