<template>
  <!-- Container für die Todo-Liste -->
  <v-container class="todo-list-container" fluid>
    <!-- Überschrift der Todo-Liste -->
    <h1>Todo List</h1>
    <!-- Komponente zum Hinzufügen eines neuen Todos -->
    <AddTodoComponent @add-todo="addTodo" />
    <!-- Grid zur Darstellung der Todos -->
    <div class="todo-grid">
      <div v-for="todo in todos" :key="todo.id" class="todo-item">
        <!-- Komponente zur Darstellung eines einzelnen Todos -->
        <TodoItemComponent
            :todo="todo"
            @delete-todo="deleteTodo"
            @update-todo="openEditDialog"
            @view-details="viewDetails"
        />
      </div>
    </div>
    <!-- Dialog zum Bearbeiten eines Todos -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Todo</v-card-title>
        <v-card-text>
          <v-form ref="editForm" v-model="valid" lazy-validation>
            <!-- Eingabefeld für den Titel des zu bearbeitenden Todos -->
            <v-text-field
                v-model="editedTodo.title"
                label="Title"
                :rules="[v => !!v || 'Title is required']"
                required
            ></v-text-field>
            <!-- Eingabefeld für das Fälligkeitsdatum des zu bearbeitenden Todos -->
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
          <!-- Schaltfläche zum Abbrechen der Bearbeitung -->
          <v-btn @click="closeEditDialog" color="primary" text>Cancel</v-btn>
          <!-- Schaltfläche zum Speichern der Änderungen -->
          <v-btn @click="saveEdit" :disabled="!valid" color="primary" text>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
import AddTodoComponent from '../components/AddTodoComponent.vue';
import TodoItemComponent from '../components/TodoItemComponent.vue';

export default {
  name: 'HomeView',
  components: {
    AddTodoComponent,
    TodoItemComponent
  },
  data() {
    return {
      todos: [], // Liste der Todos
      editDialog: false, // Status des Bearbeitungsdialogs
      editedTodo: {}, // Das zu bearbeitende Todo
      valid: false // Gültigkeitsstatus des Bearbeitungsformulars
    };
  },
  methods: {
    // Methode zum Abrufen der Todos vom Server
    async fetchTodos() {
      try {
        const response = await axios.get('/api/todos');
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    // Methode zum Hinzufügen eines neuen Todos
    async addTodo(todo) {
      try {
        const response = await axios.post('/api/todos', todo);
        this.todos.push(response.data);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    // Methode zum Löschen eines Todos
    async deleteTodo(id) {
      try {
        await axios.delete(`/api/todos/${id}`);
        this.todos = this.todos.filter(todo => todo.id !== id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
    // Methode zum Öffnen des Bearbeitungsdialogs
    openEditDialog(todo) {
      this.editedTodo = { ...todo };
      this.editDialog = true;
    },
    // Methode zum Schließen des Bearbeitungsdialogs
    closeEditDialog() {
      this.editDialog = false;
    },
    // Methode zum Speichern der Änderungen eines Todos
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
    // Methode zum Anzeigen der Details eines Todos
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
/* Stil für den Container der Todo-Liste */
.todo-list-container {
  background-color: #fff; /* Setze den Hintergrund auf weiß */
  padding: 20px; /* Füge Polsterung hinzu */
  border-radius: 10px; /* Füge abgerundete Ecken hinzu */
  width: 100%; /* Stelle sicher, dass der Container die gesamte Breite einnimmt */
}

/* Stil für die Todo-Liste */
.todo-list {
  width: 100%; /* Stelle sicher, dass die Liste die gesamte Breite einnimmt */
  max-width: 1200px; /* Begrenze die maximale Breite */
  margin: 0 auto; /* Zentriere die Liste */
  text-align: center; /* Zentriere den Text */
  background-color: #f0f0f0; /* Setze den Hintergrund auf ein helles Grau */
  padding: 20px; /* Füge Polsterung hinzu */
  border-radius: 10px; /* Füge abgerundete Ecken hinzu */
}

/* Stil für die Überschrift */
h1 {
  font-size: 2em; /* Setze die Schriftgröße */
  margin-bottom: 20px; /* Füge einen unteren Rand hinzu */
  color: var(--text-color); /* Verwende die Textfarbe aus den CSS-Variablen */
}

/* Stil für das Grid der Todos */
.todo-grid {
  display: grid; /* Verwende ein Grid-Layout */
  grid-template-columns: repeat(3, 1fr); /* Drei Spalten mit gleicher Breite */
  gap: 20px; /* Füge einen Abstand zwischen den Grid-Elementen hinzu */
  margin-top: 20px; /* Füge einen oberen Rand hinzu */
}

/* Stil für ein einzelnes Todo-Item */
.todo-item {
  display: flex; /* Verwende Flexbox */
  justify-content: center; /* Zentriere den Inhalt horizontal */
}

/* Stil für die Karte im Dark Mode */
.dark-mode-card {
  background-color: #333 !important; /* Dunklere Hintergrundfarbe für den Dark Mode */
  color: #fff !important; /* Helle Textfarbe für den Dark Mode */
  border: 1px solid #444; /* Dunklere Umrandung für den Dark Mode */
}

/* Stil für das Kalendersymbol im Eingabefeld */
.v-input__icon--prepend .v-icon {
  font-size: 24px; /* Vergrößere das Kalendersymbol */
  color: #000 !important; /* Helle Farbe für das Kalendersymbol */
}

/* Stil für das Kalendersymbol im Dark Mode */
.dark-mode .v-input__icon--prepend .v-icon {
  color: #fff !important; /* Helle Farbe für das Kalendersymbol im Dark Mode */
}

/* Stil für das Kalendersymbol im Eingabefeld mit der Klasse 'calendar-icon' */
.calendar-icon .v-input__icon--prepend .v-icon {
  font-size: 24px; /* Vergrößere das Kalendersymbol */
  color: #000 !important; /* Helle Farbe für das Kalendersymbol */
}

/* Stil für das Kalendersymbol im Dark Mode mit der Klasse 'calendar-icon' */
.dark-mode .calendar-icon .v-input__icon--prepend .v-icon {
  color: #fff !important; /* Helle Farbe für das Kalendersymbol im Dark Mode */
}
</style>