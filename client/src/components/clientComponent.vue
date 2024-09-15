<template>
  <div class="flex space-x-4">
    <p>{{ id }}</p>
    <p>{{ name }}</p>
    <p>{{ mac }}</p>
    <p>{{ status }}</p>
    <p>{{ ip }}</p>
    <button @click="startClient" class="bg-red-100 rounded-xl px-2 py-1">start</button>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    name: String,
    mac: String,
    status: String,
    ip: String
  },
  methods: {
    async startClient() {
      const url = `http://127.0.0.1:3000/wol/${this.id}`
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Error fetching data')

        const json = await response.json()

        this.$emit('update:status', json.status)
        this.$emit('update:ip', json.ip)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
