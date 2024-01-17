<template>
    <div class="card mb-3">
      <div class="card-body">
        Click on the below refresh button to get your task. After creating your new task click again on the refresh button.
      </div>
    </div>
    <button v-on:click="handleclick" type="button" class="btn btn-outline-secondary mb-4">Refresh</button>
    <ul class="list-group mb-4">
      <li v-for ="(item,i) in items" :key="i" class="list-group-item" v-text="item.title"></li>
    </ul>
    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text" id="inputGroup-sizing-sm">Create New Task</span>
      <input v-model = "newTask.title" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
    </div>
    <button v-on:click="createNew" type="button" class="btn btn-outline-primary ">Create</button>
</template>

<script lang="ts">
import { ref,reactive } from "vue";

export default {
    name: "HomePage",
    setup() {
        const newTask = reactive({
            title: ''
        });
        const items = ref([]);
        const reactiveData = reactive({
            items:items,
        })
        const createNew = async()=> {
            await fetch('http://localhost:3000/task', {
                method: 'POST',
                headers: { 
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTM1YzYzOGRhYWVlZTczYzg3ODI0MiIsImlhdCI6MTcwNTIwNDg4MywiZXhwIjoxNzA1NjM2ODgzfQ.yqTi05B518FzNuRdCiffQbXVbDDUGIS4OwBYrcyyO7M',
                    'Content-Type': "application/json" },
                body: JSON.stringify(newTask)
            })
            .then(resp => resp.json())
            .then(data => console.log(data))


        }
        const handleclick = async () => {
            await fetch('http://localhost:3000/task', {
                headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTM1YzYzOGRhYWVlZTczYzg3ODI0MiIsImlhdCI6MTcwNTIwNDg4MywiZXhwIjoxNzA1NjM2ODgzfQ.yqTi05B518FzNuRdCiffQbXVbDDUGIS4OwBYrcyyO7M',
                'Content-Type': 'application/json'}
            })
                .then(resp => resp.json())
                .then(data=> {
                    items.value = data;
                })

        }

        return {
            items,
            newTask,
            createNew,
            handleclick
        }
    }
}
</script>
