<template>
  <div class="add-todo">
    <input v-model="newTodoTitle" placeholder="Add a new todo title" />
    <input v-model="newTodoDescription" placeholder="Add a new todo description" />
    <button @click="addNewTodo">Add</button>
  </div>
</template>

<script>
export default {
  name: 'AddTodoComponent',
  data() {
    return {
      newTodoTitle: '',
      newTodoDescription: ''
    };
  },
  methods: {
    addNewTodo() {
      if (this.newTodoTitle.trim() && this.newTodoDescription.trim()) {
        this.$emit('add-todo', {
          title: this.newTodoTitle,
          description: this.newTodoDescription
        });
        this.newTodoTitle = '';
        this.newTodoDescription = '';
      }
    }
  }
};
</script>

<style scoped>
.add-todo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
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
</style>