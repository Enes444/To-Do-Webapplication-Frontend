<template>
  <div class="todo-detail">
    <h1>{{ todo.title }}</h1>
    <p>{{ todo.description }}</p>
    <router-link to="/">Back to List</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TodoDetailView',
  data() {
    return {
      todo: {}
    };
  },
  created() {
    this.fetchTodo();
  },
  methods: {
    async fetchTodo() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`/api/todos/${id}`);
        this.todo = response.data;
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    }
  }
};
</script>

<style scoped>
.todo-detail {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

p {
  font-size: 1.2em;
  color: #666;
}

.router-link {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.router-link:hover {
  text-decoration: underline;
}
</style>