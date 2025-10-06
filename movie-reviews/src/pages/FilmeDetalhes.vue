    <template>
  <section class="p-8 text-white">
    <h1 class="text-3xl font-bold mb-2">{{ movie?.title }}</h1>
    <p class="text-gray-400 mb-4">{{ movie?.description }}</p>
    <p class="mb-6">🎬 Diretor: {{ movie?.director }}</p>

    <h2 class="text-2xl font-semibold mb-4">Avaliações</h2>

    <!-- Formulário de nova avaliação -->
    <form @submit.prevent="addReview" class="flex flex-col gap-3 mb-8 w-full max-w-md">
      <input v-model="newReview.rating" type="number" min="0" max="10" placeholder="Nota (0-10)" class="p-2 rounded bg-gray-800 border border-gray-700" />
      <textarea v-model="newReview.comment" placeholder="Comentário" class="p-2 rounded bg-gray-800 border border-gray-700"></textarea>
      <button type="submit" class="bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400">Enviar Avaliação</button>
    </form>

    <!-- Lista de avaliações -->
    <div v-if="reviews.length">
      <div v-for="r in reviews" :key="r.id" class="border-b border-gray-700 py-3">
        <p class="font-semibold text-yellow-400">Nota: {{ r.rating }}/10</p>
        <p>{{ r.comment }}</p>
        <p class="text-gray-500 text-sm">{{ new Date(r.created_at).toLocaleString() }}</p>
      </div>
    </div>
    <p v-else class="text-gray-400">Nenhuma avaliação ainda 😔</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'

const route = useRoute()
const movie = ref(null)
const reviews = ref([])

const newReview = ref({
  rating: '',
  comment: ''
})

// Busca o filme
const fetchMovie = async () => {
  const { data } = await supabase.from('movies').select('*').eq('id', route.params.id).single()
  movie.value = data
}

// Busca avaliações do filme
const fetchReviews = async () => {
  const { data } = await supabase
    .from('reviews')
    .select('*')
    .eq('movie_id', route.params.id)
    .order('created_at', { ascending: false })
  reviews.value = data || []
}

// Adiciona nova avaliação
const addReview = async () => {
  if (!newReview.value.rating || !newReview.value.comment) return

  const { error } = await supabase.from('reviews').insert({
    movie_id: route.params.id,
    rating: parseInt(newReview.value.rating),
    comment: newReview.value.comment
  })

  if (!error) {
    newReview.value = { rating: '', comment: '' }
    fetchReviews()
  } else {
    console.error(error)
  }
}

onMounted(() => {
  fetchMovie()
  fetchReviews()
})
</script>
