<template>
  <div class="mt-4 border-t border-gray-700 pt-4">
    <h4 class="font-semibold mb-2">Avaliações:</h4>

    <ReviewForm :movieId="movieId" @added="loadReviews" />

    <div v-for="review in reviews" :key="review.id" class="p-2 border-b border-gray-700">
      <p class="text-yellow-400">⭐ {{ review.rating }}/10</p>
      <p>{{ review.comment }}</p>
      <button class="text-red-400 text-sm" @click="deleteReview(review.id)">Excluir</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import ReviewForm from './ReviewForm.vue'

const props = defineProps({ movieId: String })
const reviews = ref([])

async function loadReviews() {
  const { data } = await supabase.from('reviews').select('*').eq('movie_id', props.movieId)
  reviews.value = data || []
}

async function deleteReview(id) {
  await supabase.from('reviews').delete().eq('id', id)
  loadReviews()
}

onMounted(loadReviews)
</script>
