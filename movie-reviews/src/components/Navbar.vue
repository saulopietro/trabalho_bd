<template>
  <header class="flex justify-between items-center p-6 bg-gray-900 shadow-md">
    <RouterLink to="/" class="text-2xl font-bold text-yellow-400">
      🎬 Movie Reviews
    </RouterLink>

    <nav class="hidden md:flex gap-6">
      <RouterLink to="/" class="hover:text-yellow-400 transition">Início</RouterLink>
      <RouterLink to="/admin" class="hover:text-yellow-400 transition">Listar filme</RouterLink>
    </nav>
  </header>
</template>