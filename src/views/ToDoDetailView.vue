<template>
  <!-- Container für die Detailansicht eines Todos -->
  <v-container class="todo-detail-container" fluid>
    <!-- Karte zur Darstellung der Todo-Details -->
    <v-card class="pa-4 mb-4 todo-detail" :class="{ 'dark-mode-card': $root.darkMode }">
      <!-- Titel des Todos -->
      <v-card-title>{{ todo.title }}</v-card-title>
      <!-- Fälligkeitsdatum des Todos -->
      <v-card-subtitle>Due: {{ formatDate(todo.dueDate) }}</v-card-subtitle>
      <!-- Liste der Unteraufgaben -->
      <v-card-text>
        <v-list dense class="dark-mode-list">
          <v-list-item v-for="(subtask, index) in subtasks" :key="index" :class="{ 'dark-mode-list-item': $root.darkMode }">
            <v-list-item-content>{{ subtask.text }}</v-list-item-content>
          </v-list-item>
        </v-list>
        <!-- Eingabefeld zum Hinzufügen einer neuen Unteraufgabe -->
        <v-text-field v-model="newSubtask" label="Add Subtask" outlined dense :class="{ 'dark-mode-input': $root.darkMode }"></v-text-field>
        <!-- Schaltfläche zum Hinzufügen der neuen Unteraufgabe -->
        <v-btn @click="addSubtask" color="primary" small dense>Add Subtask</v-btn>
      </v-card-text>
      <!-- Aktionen für die Todo-Detailansicht -->
      <v-card-actions>
        <v-btn @click="goBack" color="primary" small dense>Back to List</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TodoDetailView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      todo: {}, // Das aktuelle Todo
      subtasks: [], // Liste der Unteraufgaben
      newSubtask: '' // Neue Unteraufgabe
    };
  },
  created() {
    this.fetchTodo();
  },
  methods: {
    // Methode zur Formatierung des Datums
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toISOString().split('T')[0];
    },
    // Methode zum Abrufen des Todos vom Server
    async fetchTodo() {
      try {
        const response = await axios.get(`/api/todos/${this.id}`);
        this.todo = response.data;
        this.subtasks = this.todo.subtasks || [];
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    },
    // Methode zum Hinzufügen einer neuen Unteraufgabe
    addSubtask() {
      if (this.newSubtask) {
        this.subtasks.push({ text: this.newSubtask, completed: false });
        this.newSubtask = '';
        this.updateTodo();
      }
    },
    // Methode zum Aktualisieren des Todos auf dem Server
    async updateTodo() {
      try {
        await axios.put(`/api/todos/${this.id}`, { ...this.todo, subtasks: this.subtasks });
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    // Methode zum Zurückkehren zur Todo-Liste
    goBack() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
/* Stil für den Container der Todo-Detailansicht */
.todo-detail-container {
  background-color: #fff; /* Setze den Hintergrund auf weiß */
  padding: 20px; /* Füge Polsterung hinzu */
  border-radius: 10px; /* Füge abgerundete Ecken hinzu */
  width: 100%; /* Stelle sicher, dass der Container die gesamte Breite einnimmt */
  max-width: 800px; /* Begrenze die maximale Breite */
  margin: 0 auto; /* Zentriere den Container */
}

/* Stil für die Todo-Detailkarte */
.todo-detail {
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Stil für die Karte im Dark Mode */
.dark-mode-card {
  background-color: #333 !important; /* Dunklere Hintergrundfarbe für den Dark Mode */
  color: #fff !important; /* Helle Textfarbe für den Dark Mode */
}

/* Stil für das Eingabefeld im Dark Mode */
.dark-mode-input .v-input__control {
  background-color: #444 !important; /* Dunklere Hintergrundfarbe für den Dark Mode */
  color: #fff !important; /* Helle Textfarbe für den Dark Mode */
}

/* Stil für den Slot des Eingabefelds im Dark Mode */
.dark-mode-input .v-input__slot {
  background-color: #444 !important; /* Dunklere Hintergrundfarbe für den Dark Mode */
  color: #fff !important; /* Helle Textfarbe für den Dark Mode */
}

/* Stil für das Label des Eingabefelds im Dark Mode */
.dark-mode-input .v-label {
  color: #bbb !important; /* Helle Textfarbe für den Dark Mode */
}

/* Stil für die Liste im Dark Mode */
.dark-mode-list {
  background-color: #333 !important; /* Dunklere Hintergrundfarbe für den Dark Mode */
}

/* Stil für die Listenelemente im Dark Mode */
.dark-mode-list-item {
  background-color: #444 !important; /* Dunklere Hintergrundfarbe für den Dark Mode */
  color: #fff !important; /* Helle Textfarbe für den Dark Mode */
  border: none !important; /* Entferne die weißen Ränder */
}

/* Entferne die weißen Ränder der Listenelemente */
.v-list-item {
  border: none !important; /* Entferne die weißen Ränder */
}
</style>