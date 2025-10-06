<template>
  <form @submit.prevent="saveMovie" class="bg-gray-800 p-6 rounded-xl max-w-lg mx-auto">
    <h2 class="text-2xl font-bold mb-4">{{ editing ? 'Editar Filme' : 'Novo Filme' }}</h2>

    <input v-model="movie.title" placeholder="Título" class="w-full p-2 mb-3 rounded bg-gray-900 border border-gray-700" required />
    <textarea v-model="movie.description" placeholder="Descrição" class="w-full p-2 mb-3 rounded bg-gray-900 border border-gray-700"></textarea>
    <input v-model="movie.director" placeholder="Diretor" class="w-full p-2 mb-3 rounded bg-gray-900 border border-gray-700" />

    <button type="submit" class="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300">
      {{ editing ? 'Salvar Alterações' : 'Adicionar Filme' }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { supabase } from '../lib/supabase'

const props = defineProps({ currentMovie: Object })
const emits = defineEmits(['saved'])
const movie = ref({ title: '', description: '', director: '' })
const editing = ref(false)

watch(() => props.currentMovie, (val) => {
  if (val) {
    movie.value = { ...val }
    editing.value = true
  }
})

async function saveMovie() {
  if (editing.value) {
    await supabase.from('movies').update(movie.value).eq('id', movie.value.id)
  } else {
    await supabase.from('movies').insert([movie.value])
  }
  emits('saved')
  movie.value = { title: '', description: '', director: '' }
  editing.value = false
}
</script>
