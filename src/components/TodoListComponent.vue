<template>
  <div class="todo-list">
    <h1>Todo List</h1>
    <AddTodoComponent @add-todo="addTodo" />
    <ul>
      <TodoItemComponent
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @delete-todo="deleteTodo"
          @update-todo="updateTodo"
          @view-details="viewDetails"
      />
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import AddTodoComponent from './AddTodoComponent.vue';
import TodoItemComponent from './TodoItemComponent.vue';

export default {
  name: 'TodoListComponent',
  components: {
    AddTodoComponent,
    TodoItemComponent
  },
  data() {
    return {
      todos: []
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get('/api/todos');
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async addTodo(todo) {
      try {
        const response = await axios.post('/api/todos', todo);
        this.todos.push(response.data);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`/api/todos/${id}`);
        this.todos = this.todos.filter(todo => todo.id !== id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
    async updateTodo(updatedTodo) {
      try {
        const response = await axios.put(`/api/todos/${updatedTodo.id}`, updatedTodo);
        const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          this.todos.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    viewDetails(todo) {
      this.$router.push({ name: 'todo-detail', params: { id: todo.id } });
    }
  },
  mounted() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
.todo-list {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  margin-left: 5px;
}
</style>