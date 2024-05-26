<template>
  <div>
    <h2>Todo List</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: []
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await fetch('https://my-springboot-app.onrender.com/api/todos');
        const data = await response.json();
        this.tasks = data;
      } catch (error) {
        console.error('Fehler beim Abrufen der Todos:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Hier kommt später der Stil, den habe ich noch nicht definiert */
</style>
