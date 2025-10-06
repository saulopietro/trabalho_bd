<template>
  <form @submit.prevent="addReview" class="mb-4">
    <input v-model.number="rating" type="number" min="0" max="10" placeholder="Nota (0-10)" class="w-full p-2 mb-2 bg-gray-900 border border-gray-700 rounded" />
    <textarea v-model="comment" placeholder="Comentário" class="w-full p-2 mb-2 bg-gray-900 border border-gray-700 rounded"></textarea>
    <button type="submit" class="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300">Enviar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const props = defineProps({ movieId: String })
const emits = defineEmits(['added'])

const rating = ref(0)
const comment = ref('')

async function addReview() {
  await supabase.from('reviews').insert([
    {
      movie_id: props.movieId,
      rating: rating.value,
      comment: comment.value,
    },
  ])
  rating.value = 0
  comment.value = ''
  emits('added')
}
</script>
