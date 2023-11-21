<template>
  <div class="wrapper-main-page">
    <div class="wrapper-button-block">
      <div class="add-person-block">
        <input v-model="name" type="text" placeholder="Введите имя" required>
        <input v-model="surname" type="text" placeholder="Введите фамилию" required>
        <button :disabled="!name || !surname" @click="addPerson()" class="button-add-person">Добавить человека в очередь</button>
      </div>
      <button @click="deletePersons()" class="button-delete-person">Обнулить очередь</button>
      <button @click="getPDF()" class="button-list">Получить PDF</button>
    </div>
    <div class="list-queue">   
      <p v-for="person in listQueue" :key="person">{{ person[0] }}, {{ person[1] }}</p>
    </div>
  </div>
</template>

<script>

const { jsPDF } = require("jspdf");
require('jspdf-autotable');

export default {
  name: 'App',
  data() {
    return {
      name: null,
      surname: null,
      listQueue: []
    }
  },
  methods: {
    async deletePersons() {
      let res = null
      try {
        res = await fetch('http://localhost:8081/deleteUsers')
        .then(result => {
          this.listQueue = []
          return result.json()
        })
      } catch(err) {
        res = err
      }
      console.log(res)
    },
    async addPerson() {
      let res = null;
      try {
        res = await fetch('http://localhost:8081/addPerson', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            name: this.name,
            surname: this.surname
          })
        })
          .then(result => {
            this.listQueue.push(`${this.name}, ${this.surname}`)
            return result.json()
          })
      } catch(err) {
        res = err
      }
      console.log(res)
    },
    async getPDF() {
      let res = await fetch('http://localhost:8081/getPDF')
        .then(result => {
          return result.json()
        })
        console.log(res)
      const columns = ['Name', "Surname", 'Date']
      const DOC = new jsPDF()
      DOC.autoTable(columns, res,{startY: 25})
      DOC.text("Queue", 14, 15);
      DOC.save('dataModel.pdf');
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapper-main-page {
  .wrapper-button-block {
    display: flex;
  justify-content: space-around;
    .add-person-block {
      input {
        display: block;
        margin: 20px;
      }
      .button-add-person {
        width: 200px;
        height: 50px;
        margin-top: 20px;
        border-radius: 10px;
        background-color: #f8f79f;
      }  
    }
    
    .button-delete-person {
      width: 200px;
      height: 50px;
      margin-top: 20px;
        border-radius: 10px;
        background-color: #f8f79f;
    }
    .button-list {
      width: 200px;
      height: 50px;
      margin-top: 20px;
        border-radius: 10px;
        background-color: #f8f79f;
    }
  }
}
</style>
