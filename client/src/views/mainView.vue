<script setup>
import clientComponent from '@/components/clientComponent.vue'
</script>

<template>
  <h1>Hello World</h1>
  <clientComponent
    v-for="client in clients"
    :key="client.id"
    :id="client.id"
    :name="client.name"
    :mac="client.mac"
    :status="client.status"
  />
</template>

<script>
export default {
  data() {
    return {
      clients: null
    }
  },
  methods: {
    async getClients() {
      const url = 'http://127.0.0.1:3000/clients'
      try {
        const response = await fetch(url)
        if (!response) throw new Error('Error fetching the Data')

        const json = await response.json()
        this.clients = json
        console.log(json)
      } catch (e) {
        console.error(e)
      }
    }
  },
  beforeMount() {
    this.getClients()
  }
}
</script>
