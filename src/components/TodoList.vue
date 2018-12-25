<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
        autofocus autocomplete="off"
        placeholder="What needs to be done?"
        :value="newTodo"
        @change="setNewTodo"
        @keyup.enter="addTodo"
        >
    </header>
    <section class="main" v-show="todos.length" v-cloak>
      <ul class="todo-list">
        <li
          v-for="todo in todos"
          class="todo"
          :key="todo.id"
          :class="{ completed: todo.completed }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed" />
            <label>{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)">Delete</button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    msg: String
  },
  created() {
    this.$store.dispatch("loadTodos");
  },
  computed: {
    newTodo() {
      return this.$store.getters.newTodo;
    },
    todos() {
      return this.$store.getters.todos;
    }
  },
  methods: {
    setNewTodo(e) {
      this.$store.dispatch("setNewTodo", e.target.value);
    },
    addTodo(e) {
      e.target.value = "";
      this.$store.dispatch("addTodo");
      this.$store.dispatch("clearNewTodo");
    },
    removeTodo(todo) {
      this.$store.dispatch("removeTodo", todo);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
