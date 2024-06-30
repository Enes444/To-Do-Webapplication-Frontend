<template>
  <!-- Hauptcontainer der Anwendung -->
  <v-app :class="{ 'dark-mode': darkMode }">
    <v-container>
      <!-- Schaltfläche zum Umschalten des Dark Modes -->
      <v-btn @click="toggleDarkMode" color="primary">Toggle Dark Mode</v-btn>
      <!-- Platzhalter für die gerouteten Komponenten -->
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      darkMode: false // Status des Dark Modes
    };
  },
  methods: {
    // Methode zum Umschalten des Dark Modes
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.body.classList.toggle('dark-mode', this.darkMode);
      localStorage.setItem('darkMode', this.darkMode);
    }
  },
  mounted() {
    // Überprüfen, ob der Dark Mode im lokalen Speicher aktiviert ist
    if (localStorage.getItem('darkMode') === 'true') {
      this.darkMode = true;
      document.body.classList.add('dark-mode');
    }
  }
};
</script>

<style>
/* Grundstil für den Body */
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Standardfarben für den Light Mode */
:root {
  --background-color: #ffffff;
  --text-color: #000000;
}

/* Farben für den Dark Mode */
.dark-mode {
  --background-color: #2c2c2c;
  --text-color: #ffffff;
}

/* Stil für den Body im Dark Mode */
.dark-mode body {
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Stil für die v-app-Komponente */
.v-app {
  background-color: var(--background-color) !important;
  color: var(--text-color) !important;
  min-height: 100vh;
}

/* Stil für den v-container */
.v-container {
  background-color: var(--background-color) !important;
  color: var(--text-color) !important;
  padding: 20px;
  border-radius: 10px;
}
</style>