<template>
  <li class="todo-item">
    <div v-if="!isEditing">
      <span>{{ todo.title }}</span>
      <div class="actions">
        <router-link :to="{ name: 'todo-detail', params: { id: todo.id } }" class="router-link">View Details</router-link>
        <button @click="isEditing = true">Edit</button>
        <button @click="deleteTodo">Delete</button>
      </div>
    </div>
    <div v-else class="edit-item">
      <input v-model="newText" />
      <button @click="saveEdit">Save</button>
      <button @click="isEditing = false">Cancel</button>
    </div>
  </li>
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
  data() {
    return {
      isEditing: false,
      newText: this.todo.title
    };
  },
  methods: {
    deleteTodo() {
      this.$emit('delete-todo', this.todo.id);
    },
    saveEdit() {
      const updatedTodo = { ...this.todo, title: this.newText };
      this.$emit('update-todo', updatedTodo);
      this.isEditing = false;
    }
  },
  watch: {
    todo(newVal) {
      this.newText = newVal.title;
    }
  }
};
</script>
<style scoped>
.todo-item {
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #369f7c;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  width: 100%;
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