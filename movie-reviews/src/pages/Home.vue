<template>
  <section class="p-6 md:p-12">
    <h2 class="text-3xl font-bold mb-6 text-center">🎬 Filmes</h2>

    <div v-if="loading" class="text-center text-gray-400">Carregando...</div>

    <div v-else class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @update="fetchMovies"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import MovieCard from '../components/MovieCard.vue'

const movies = ref([])
const loading = ref(true)

async function fetchMovies() {
  loading.value = true
  const { data, error } = await supabase.from('movies').select('*').order('created_at', { ascending: false })
  if (!error) movies.value = data
  loading.value = false
}

onMounted(fetchMovies)
</script>
