<template>
  <!-- Formular zur Eingabe eines neuen Todos -->
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row>
      <!-- Eingabefeld für den Titel des Todos -->
      <v-col cols="12" md="6">
        <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            label="Title"
            required
            class="mb-4"
        ></v-text-field>
      </v-col>
      <!-- Eingabefeld für das Fälligkeitsdatum des Todos -->
      <v-col cols="12" md="6">
        <v-text-field
            v-model="dueDate"
            :error-messages="dueDateErrors"
            label="Due Date"
            type="date"
            required
            prepend-icon="mdi-calendar"
            class="mb-4 calendar-icon"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Schaltfläche zum Hinzufügen des Todos -->
    <v-btn @click="submit" color="primary">Add Todo</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'AddTodoComponent',
  data() {
    return {
      title: '', // Titel des neuen Todos
      dueDate: '', // Fälligkeitsdatum des neuen Todos
      valid: false, // Gültigkeitsstatus des Formulars
      titleErrors: [], // Fehlernachrichten für das Titelfeld
      dueDateErrors: [] // Fehlernachrichten für das Fälligkeitsdatumsfeld
    };
  },
  methods: {
    // Validierungsmethode für das Formular
    validate() {
      this.titleErrors = [];
      this.dueDateErrors = [];

      if (!this.title) {
        this.titleErrors.push('Title is required');
      }

      if (!this.dueDate) {
        this.dueDateErrors.push('Due Date is required');
      }

      return this.titleErrors.length === 0 && this.dueDateErrors.length === 0;
    },
    // Methode zum Absenden des Formulars
    submit() {
      if (this.validate()) {
        this.$emit('add-todo', {
          title: this.title,
          dueDate: this.dueDate
        });
        this.resetForm();
      }
    },
    // Methode zum Zurücksetzen des Formulars
    resetForm() {
      this.title = '';
      this.dueDate = '';
      this.titleErrors = [];
      this.dueDateErrors = [];
    }
  }
};
</script>

<style scoped>
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