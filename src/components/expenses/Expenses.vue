<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table :headers="headers" :items="expenses" sort-by="status" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Despesas</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nova Despesa</v-btn>
          </template>
          <v-card>
              <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedExpense.descricao" label="Descrição" type="text"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedExpense.valor" label="Valor" type="number" prefix="R$"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedExpense.parcelas" label="Parcelas" type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select :items="tipo" v-model="editedExpense.tipo" label="Tipo"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedExpense.vencimento" label="Vencimento" type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select :items="situacao" v-model="editedExpense.situacao" label="Situação"></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedExpense.observacao" label="Observação" type="text"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
              
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="400px">
          <v-card>
            <v-card-title class="text-h5 text-center">Tem certeza que deseja excluir esta despesa?</v-card-title>
            <v-card-actions class="text-center">
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteExpenseConfirm">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.situacao="{ item }">
      <v-chip :color="getColor(item.situacao)" dark></v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editExpense(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteExpense(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Resetar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      tipo: ['Variável', 'Fixa'],
      situacao: ['Atrasado', 'Pendente', 'Pago'],
      headers: [
        { text: 'Situação', value: 'situacao', align: 'start' },
        { text: 'Descrição', value: 'descricao' },
        { text: 'Valor', value: 'valor' },
        { text: 'Parcelas', value: 'parcelas' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      expenses: [],
      expenseId: null,
      expense: {
        situacao: '',
        descricao: '',
        valor: null,
        parcelas: null,
        tipo: '',
        vencimento: '',
        observacao: '',
      },
      editedExpense: {
        situacao: '',
        descricao: '',
        valor: null,
        parcelas: null,
        tipo: '',
        vencimento: '',
        observacao: '',
      },
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nova Despesa' : 'Editar Despesa'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.expenses = [
        this.$http.get('expenses.json').then(res => {this.expenses = res.data})
      ]
      console.log(this.expenses)
    },

    getColor(situacao) {
      if (situacao == 'Atrasado') return 'red rounded-circle'
          else if (situacao == 'Pendente') return 'yellow rounded-circle'
          else return 'green rounded-circle'
    },

    carregar (id) {
      this.id = id
      this.expense = { ...this.expenses[id] }
    },

    editExpense (item) {
      this.editedIndex = this.expenses.indexOf(item)
      this.editedExpense = Object.assign({}, item)
      this.dialog = true
    },

    deleteExpense (item) {
      this.editedIndex = this.expenses.indexOf(item)
      this.editedExpense = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteExpenseConfirm (id) {
      this.expenses.splice(this.editedIndex, 1)
      this.$http.delete(`/expenses/${id}.json`)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedExpense = Object.assign({}, this.expense)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedExpense = Object.assign({}, this.expense)
        this.editedIndex = -1
      })
    },

    save () {
      const metodo = this.id ? 'patch' : 'post'
			const finalUrl = this.id ? `/${this.id}.json` : '.json'
			this.$http[metodo](`/expenses${finalUrl}`, this.editedExpense).then(() => {
					this.mensagens.push({
						texto: 'Operação realizada com sucesso!',
						tipo: 'success'
					})
				})
      this.close()
    },

    getExpenses() {
      this.$http.get('expenses.json').then(res => {
				this.expenses = res.data
				console.log(res.data)
			})
    }
  },
}
</script>

<style>

</style>
