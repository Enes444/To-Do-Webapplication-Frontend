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
      tasks: [
        { id: 1, name: 'Abgabe Milestone' },
        { id: 2, name: 'Vorarbeit informationssicherheit' },
        { id: 3, name: 'Vorarbeit ' }
      ]
    };
  }
};
</script>

<style scoped>
/* Hier kommt später der stil, den habe ich noch nicht definiert */
</style>