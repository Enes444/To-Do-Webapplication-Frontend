<template>
  <v-container :class="isDarkMode ? 'dark-mode' : 'light-mode'" fluid>
    <v-card class="pa-4 mb-4" :class="isDarkMode ? 'dark-mode-card' : 'light-mode-card'">
      <v-card-title>{{ todo.title }}</v-card-title>
      <v-card-subtitle>Due: {{ formatDate(todo.dueDate) }}</v-card-subtitle>
      <v-card-text>
        <v-list dense>
          <v-list-item v-for="(subtask, index) in subtasks" :key="index" :class="isDarkMode ? 'dark-mode-item' : 'light-mode-item'">
            <v-list-item-content>{{ subtask.text }}</v-list-item-content>
          </v-list-item>
        </v-list>
        <v-text-field v-model="newSubtask" label="Add Subtask" outlined dense :class="isDarkMode ? 'dark-mode-input' : 'light-mode-input'"></v-text-field>
        <v-btn @click="addSubtask" color="primary" small dense>Add Subtask</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="goBack" color="primary" small dense>Back to List</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

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
      todo: null,
      subtasks: [],
      newSubtask: '',
      isDarkMode: false
    };
  },
  created() {
    this.fetchTodo();
    this.isDarkMode = this.$root.darkMode;
  },
  watch: {
    '$root.darkMode': {
      handler(newVal) {
        this.isDarkMode = newVal;
      },
      immediate: true
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toISOString().split('T')[0];
    },
    async fetchTodo() {
      try {
        const response = await axios.get(`/api/todos/${this.id}`);
        this.todo = response.data;
        this.subtasks = this.todo.subtasks || [];
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    },
    addSubtask() {
      if (this.newSubtask) {
        this.subtasks.push({ text: this.newSubtask, completed: false });
        this.newSubtask = '';
        this.updateTodo();
      }
    },
    async updateTodo() {
      try {
        await axios.put(`/api/todos/${this.id}`, { ...this.todo, subtasks: this.subtasks });
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    goBack() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
.dark-mode {
  background-color: #333;
  color: #fff;
}

.light-mode {
  background-color: #fff;
  color: #000;
}

.dark-mode-card {
  background-color: #444 !important;
  color: #fff !important;
}

.light-mode-card {
  background-color: #fff !important;
  color: #000 !important;
}

.dark-mode-item {
  background-color: #555 !important;
  color: #fff !important;
  margin-bottom: 8px; /* Abstand zwischen den Subtasks */
  border-radius: 4px; /* Abgerundete Ecken */
  padding: 8px; /* Polsterung innerhalb der Box */
}

.light-mode-item {
  background-color: #fff !important;
  color: #000 !important;
  margin-bottom: 8px; /* Abstand zwischen den Subtasks */
  border: 1px solid #ddd; /* Leichter Rahmen */
  border-radius: 4px; /* Abgerundete Ecken */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Leichter Schatten */
  padding: 8px; /* Polsterung innerhalb der Box */
}

.dark-mode-input .v-input__control {
  background-color: #666 !important;
  color: #fff !important;
}

.light-mode-input .v-input__control {
  background-color: #fff !important;
  color: #000 !important;
  border: 1px solid #ddd; /* Leichter Rahmen */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Leichter Schatten */
  border-radius: 4px; /* Abgerundete Ecken */
}
</style>