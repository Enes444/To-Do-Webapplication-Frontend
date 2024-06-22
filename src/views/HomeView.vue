<template>
  <div class="home">
    <TodoListComponent />
  </div>
</template>

<script>
import TodoListComponent from '../components/TodoListComponent.vue';

export default {
  name: 'HomeView',
  components: {
    TodoListComponent
  }
};
</script>

<style>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>