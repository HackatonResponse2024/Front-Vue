<template>
  <div>
    <div v-if="siteStore.loading">Chargement...</div>
    <div v-else>
      <h2>Liste des sites</h2>
      <div class="filters">
        <button @click="filterType = 'Groupe Scolaire'">Groupes Scolaires</button>
        <button @click="filterType = 'Equipement Public'">Équipements Publics</button>
        <button @click="filterType = ''">Tous</button>
      </div>

      <ul>
        <li v-for="site in filteredSites" :key="site.id" class="site-item">
          <h3>{{ site.name }}</h3>
          <p>Type: {{ site.type }}</p>
          <p>Production: {{ site.production ? 'Oui' : 'Non' }}</p>
          <p>Coordonnées: {{ site.latitude }}, {{ site.longitude }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useSiteStore } from '../stores/siteStore'

const siteStore = useSiteStore()
const filterType = ref('')

const filteredSites = computed(() => {
  if (!filterType.value) return siteStore.sites
  return siteStore.getSitesByType(filterType.value)
})

onMounted(async () => {
  await siteStore.fetchSites()
})
</script>

<style scoped>
.site-item {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filters {
  margin-bottom: 1rem;
}

button {
  margin-right: 0.5rem;
}
</style> 