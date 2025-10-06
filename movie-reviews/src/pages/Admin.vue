<template>
  <section class="p-6">
    <MovieForm :currentMovie="selectedMovie" @saved="loadMovies" />
    <h2 class="text-3xl font-bold my-6">Filmes Cadastrados</h2>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" @edit="editMovie" @update="loadMovies" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import MovieForm from '../components/MovieForm.vue'
import MovieCard from '../components/MovieCard.vue'

const movies = ref([])
const selectedMovie = ref(null)

async function loadMovies() {
  const { data } = await supabase.from('movies').select('*').order('created_at', { ascending: false })
  movies.value = data || []
}

function editMovie(movie) {
  selectedMovie.value = movie
}

onMounted(loadMovies)
</script>
