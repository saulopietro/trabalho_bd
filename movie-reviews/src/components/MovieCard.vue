<template>
  <div class="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition">
    <div class="p-4">
      <h3 class="font-bold text-xl mb-2">{{ movie.title }}</h3>
      <p class="text-gray-400 text-sm mb-4">{{ movie.description }}</p>

      <div class="flex justify-between items-center">
        <button class="bg-yellow-400 text-black px-3 py-1 rounded-lg hover:bg-yellow-300 transition" @click="showReviews = !showReviews">
          Ver Avaliações
        </button>
        <div class="flex gap-2">
          <button class="text-blue-400" @click="$emit('edit', movie)">✏️</button>
          <button class="text-red-400" @click="deleteMovie">🗑️</button>
        </div>
      </div>

      <ReviewList v-if="showReviews" :movieId="movie.id" />
    </div>
  </div>
</template>

<script setup>
import { supabase } from '../lib/supabase'
import ReviewList from './ReviewList.vue'
import { ref } from 'vue'

const props = defineProps({ movie: Object })
const emits = defineEmits(['update'])

const showReviews = ref(false)

async function deleteMovie() {
  if (confirm('Tem certeza que deseja deletar este filme?')) {
    const { error } = await supabase.from('movies').delete().eq('id', props.movie.id)
    if (!error) emits('update')
  }
}
</script>
