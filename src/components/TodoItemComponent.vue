<template>
  <!-- Karte zur Darstellung eines einzelnen Todos -->
  <v-card :class="{ 'dark-mode-card': $root.darkMode }">
    <!-- Titel des Todos -->
    <v-card-title>{{ todo.title }}</v-card-title>
    <!-- Fälligkeitsdatum des Todos -->
    <v-card-subtitle>Due: {{ formatDate(todo.dueDate) }}</v-card-subtitle>
    <!-- Aktionen für das Todo (Löschen, Details anzeigen, Bearbeiten) -->
    <v-card-actions>
      <v-btn @click="$emit('delete-todo', todo.id)" color="red" small dense>Delete</v-btn>
      <v-btn @click="$emit('view-details', todo)" color="secondary" small dense>Details</v-btn>
      <v-btn @click="$emit('update-todo', todo)" color="primary" small dense>Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'TodoItemComponent',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    // Methode zur Formatierung des Datums
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toISOString().split('T')[0];
    }
  }
};
</script>

<style scoped>
/* Stil für die Karte im Dark Mode */
.dark-mode-card {
  background-color: #333 !important; /* Dunklere Hintergrundfarbe für den Dark Mode */
  color: #fff !important; /* Helle Textfarbe für den Dark Mode */
  border: 1px solid #444; /* Dunklere Umrandung für den Dark Mode */
}
</style>