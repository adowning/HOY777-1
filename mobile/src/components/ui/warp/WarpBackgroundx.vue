<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div :class="cn('relative rounded border md:p-20', props.class)"
          class="flex w-[100vw] h-[100vh] items-center justify-center ">
          <div :style="{
            '--perspective': `${props.perspective}px`,
            '--grid-color': props.gridColor,
            '--beam-size': `${props.beamSize}%`
          }"
            class="pointer-events-none absolute left-0 top-0 size-full overflow-hidden [clip-path:inset(0)] [container-type:size] [perspective:var(--perspective)] [transform-style:preserve-3d]">
            <!-- TOP -->
            <div
              class="absolute [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:50%_0%] [transform-style:preserve-3d] [transform:rotateX(-90deg)] [width:100cqi]">
              <Beam v-for="(beam, index) in topBeams" :key="`top-${index}`" :width="`${props.beamSize}%`"
                :x="`${beam.x * props.beamSize}%`" :delay="beam.delay" :duration="beamDuration" />
            </div>
            <!-- BOTTOM -->
            <div
              class="absolute top-full [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:50%_0%] [transform-style:preserve-3d] [transform:rotateX(-90deg)] [width:100cqi]">
              <Beam v-for="(beam, index) in bottomBeams" :key="`bottom-${index}`" :width="`${props.beamSize}%`"
                :x="`${beam.x * props.beamSize}%`" :delay="beam.delay" :duration="beamDuration" />
            </div>
            <!-- LEFT -->
            <div
              class="absolute left-0 top-0 [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:0%_0%] [transform-style:preserve-3d] [transform:rotate(90deg)_rotateX(-90deg)] [width:100cqh]">
              <Beam v-for="(beam, index) in leftBeams" :key="`left-${index}`" :width="`${props.beamSize}%`"
                :x="`${beam.x * props.beamSize}%`" :delay="beam.delay" :duration="beamDuration" />
            </div>
            <!-- RIGHT -->
            <div
              class="absolute right-0 top-0 [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:100%_0%] [transform-style:preserve-3d] [transform:rotate(-90deg)_rotateX(-90deg)] [width:100cqh]">
              <Beam v-for="(beam, index) in rightBeams" :key="`right-${index}`" :width="`${props.beamSize}%`"
                :x="`${beam.x * props.beamSize}%`" :delay="beam.delay" :duration="beamDuration" />
            </div>
          </div>

          <div class="relative">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 100vw;
  /* margin: auto; */
  padding: 0px 0px;
  /* background-color: #fff; */
  /* border-radius: 2px; */
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33); */
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

/* .modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} */
</style>

<script lang="ts" setup>
import { cn } from '@/lib/utils'
import Beam from './Beam.vue'
import { computed } from 'vue'

interface Props {
  show: boolean
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridColor?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  perspective: 100,
  beamsPerSide: 3,
  beamSize: 5,
  beamDelayMax: 1,
  beamDelayMin: 0,
  beamDuration: 3,
  gridColor: 'hsl(var(--border))'
})

const beamDuration = computed(() => props.beamDuration)
const beamDelayMax = computed(() => props.beamDelayMax)
const beamDelayMin = computed(() => props.beamDelayMin)

function generateBeams() {
  const beams = []
  const cellsPerSide = Math.floor(100 / props.beamSize)
  const step = cellsPerSide / props.beamsPerSide

  for (let i = 0; i < props.beamsPerSide; i++) {
    const x = Math.floor(i * step)
    const delay = Math.random() * (beamDelayMax.value - beamDelayMin.value) + beamDelayMin.value
    beams.push({ x, delay })
  }
  return beams
}

// generateBeams
const topBeams = generateBeams()
const bottomBeams = generateBeams()
const leftBeams = generateBeams()
const rightBeams = generateBeams()
</script>
