<template>
  <v-container class="todo-list-container" fluid>
    <h1>Todo List</h1>
    <AddTodoComponent @add-todo="addTodo" />
    <div class="todo-grid">
      <div v-for="todo in todos" :key="todo.id" class="todo-item">
        <TodoItemComponent
            :todo="todo"
            @delete-todo="deleteTodo"
            @update-todo="openEditDialog"
            @view-details="viewDetails"
        />
      </div>
    </div>
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Todo</v-card-title>
        <v-card-text>
          <v-form ref="editForm" v-model="valid" lazy-validation>
            <v-text-field
                v-model="editedTodo.title"
                label="Title"
                :rules="[v => !!v || 'Title is required']"
                required
            ></v-text-field>
            <v-text-field
                v-model="editedTodo.dueDate"
                label="Due Date"
                type="date"
                :rules="[v => !!v || 'Due Date is required']"
                required
                prepend-icon="mdi-calendar"
                class="calendar-icon"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeEditDialog" color="primary" text>Cancel</v-btn>
          <v-btn @click="saveEdit" :disabled="!valid" color="primary" text>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
      todos: [],
      editDialog: false,
      editedTodo: {},
      valid: false
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
    openEditDialog(todo) {
      this.editedTodo = { ...todo };
      this.editDialog = true;
    },
    closeEditDialog() {
      this.editDialog = false;
    },
    async saveEdit() {
      if (this.$refs.editForm.validate()) {
        try {
          const response = await axios.put(`/api/todos/${this.editedTodo.id}`, this.editedTodo);
          const index = this.todos.findIndex(todo => todo.id === this.editedTodo.id);
          if (index !== -1) {
            this.todos.splice(index, 1, response.data);
          }
          this.closeEditDialog();
        } catch (error) {
          console.error('Error updating todo:', error);
        }
      }
    },
    viewDetails(todo) {
      this.$router.push({ name: 'todo-detail', query: { id: todo.id } });
    }
  },
  mounted() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
.todo-list-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
}

.todo-list {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: var(--text-color);
}

.todo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.todo-item {
  display: flex;
  justify-content: center;
}

.dark-mode-card {
  background-color: #333 !important;
  color: #fff !important;
  border: 1px solid #444;
}

.v-input__icon--prepend .v-icon {
  font-size: 24px;
  color: #000 !important;
}

.dark-mode .v-input__icon--prepend .v-icon {
  color: #fff !important;
}

.calendar-icon .v-input__icon--prepend .v-icon {
  font-size: 24px;
  color: #000 !important;
}

.dark-mode .calendar-icon .v-input__icon--prepend .v-icon {
  color: #fff !important;
}
</style>