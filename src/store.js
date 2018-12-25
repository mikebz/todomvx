import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

function randomId() {
  return parseInt(Math.random() * 10000000);
}

export default new Vuex.Store({
  state: {
    loading: true,
    todos: [],
    newTodo: ""
  },
  getters: {
    newTodo: state => state.newTodo,
    todos: state => state.todos
  },
  mutations: {
    SET_LOADING(state, flag) {
      state.loading = flag;
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    SET_NEW_TODO(state, todo) {
      state.newTodo = todo;
    },
    REMOVE_TODO(state, todo) {
      var todos = state.todos;
      todos.splice(todos.indexOf(todo), 1);
    },
    ADD_TODO(state, todoObject) {
      state.todos.push(todoObject);
    },
    CLEAR_NEW_TODO(state) {
      state.newTodo = "";
    }
  },
  actions: {
    loadTodos({ commit }) {
      console.log("loadTodos action");
      commit("SET_LOADING", true);
      axios
        .get("http://localhost:3000/todos")
        .then(r => r.data)
        .then(todos => {
          commit("SET_TODOS", todos);
          commit("SET_LOADING", false);
        });
    },
    setNewTodo({ commit }, todo) {
      commit("SET_NEW_TODO", todo);
    },
    addTodo({ commit, state }) {
      console.log("addTodo action");
      if (!state.newTodo) {
        // to do add empty todos
        return;
      }
      const todo = {
        title: state.newTodo,
        completed: false,
        id: randomId()
      };
      axios.post("/todos", todo).then(() => {
        commit("ADD_TODO", todo);
      });
    },
    removeTodo({ commit }, todo) {
      axios.delete(`/todos/${todo.id}`).then(() => {
        console.log("removed todo", todo.id, "from the server");
        commit("REMOVE_TODO", todo);
      });
    },
    clearNewTodo() {
      console.log("clearNewTodo action");
      commit("CLEAR_NEW_TODO");
    }
  }
});
