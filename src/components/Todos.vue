<script setup lang="ts">
import '@/assets/main.css';
import { onMounted, ref } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const client = generateClient<Schema>();

// create a reactive reference to the array of todos
const todos = ref<Array<Schema['Todo']["type"]>>([]);

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items }) => {
      todos.value = items;
    },
  });
}

function createTodo() {
  const content = window.prompt("Enter the new todo content:");
  if (content) {
    client.models.Todo.create({
      content,
      isDone: false
    }).then(() => {
      listTodos();
    });
  }
}

function deleteTodo(todoId: string) {
  if (window.confirm("Are you sure you want to delete this todo?")) {
    client.models.Todo.delete({ id: todoId }).then(() => {
      listTodos();
    });
  }
}

function editTodo(todo: any) {
  const newContent = window.prompt("Edit the todo content:", todo.content);
  if (newContent && newContent !== todo.content) {
    client.models.Todo.update({
      id: todo.id,
      content: newContent
    }).then(() => {
      listTodos();
    });
  }
}

// fetch todos when the component is mounted
onMounted(() => {
  listTodos();
});
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-center">{{t('todos.title')}}</h1>
    <div class="flex justify-center mb-8">
      <button @click="createTodo" class="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
        {{t('todos.addTodo')}}
      </button>
    </div>
    <ul class="space-y-4">
      <li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center p-4 bg-gray-100 rounded shadow">
        <div class="text-lg mr-2">{{ todo.content }}</div>
        <div class="flex space-x-4">
          <button @click="editTodo(todo)" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            {{t('todos.editTodo')}}
          </button>
          <button @click="deleteTodo(todo.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
            {{t('todos.deleteTodo')}}
          </button>
        </div>
      </li>
    </ul>
    <div class="text-center mt-8 text-gray-600">
      🥳 App successfully hosted. Try creating a new todo.
      <br />
      <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/" class="text-blue-500 hover:underline">Review next steps of this tutorial.</a>
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 600px;
  margin: 0 auto;
}
</style>
