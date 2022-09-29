<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-data-table
        :headers="headers"
        :items="expenses"
        sort-by="calories"
        class="elevation-1">
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
                                        <v-text-field v-model="editedItem.descricao" label="Descrição"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.valor" label="Valor"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.parcelas" label="Parcelas"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-select :items="tipo" v-model="editedItem.tipo" label="Tipo"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.vencimento" label="Vencimento"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-select :items="situacao" v-model="editedItem.situacao" label="Situação"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="editedItem.observacao" label="Observação"></v-text-field>
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
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.situacao="{ item }">
            <v-chip :color="getColor(item.situacao)" dark></v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Resetar</v-btn>
        </template>
    </v-data-table>
</template>

<script>
export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      tipo: ['Variável', 'Fixa'],
      situacao: ['Atrasado', 'Pendente', 'Pago'],
      headers: [
        {   text: 'Situação', value: 'situacao', align: 'start', sortable: true },
        {   text: 'Descrição', value: 'descricao'  },
        {   text: 'Valor', value: 'valor'  },
        {   text: 'Parcelas', value: 'parcelas'  },
        {   text: 'Actions', value: 'actions', sortable: false },
      ],
      expenses: [],
      editedIndex: -1,
      editedItem: {
        situacao: '',
        descricao: '',
        valor: 0,
        parcelas: 0,
        tipo: '',
        vencimento: '',
        observacao: '',
      },
      defaultItem: {
        situacao: '',
        descricao: '',
        valor: 0,
        parcelas: 0,
        tipo: '',
        vencimento: '',
        observacao: '',
      },
    }),

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
            { situacao: 'Atrasado', descricao: 'Bolsa de couro', valor: 250, parcelas: 1, tipo: 'Fixa', vencimento: '29/09', observacao: 'a' },
            { situacao: 'Pendente', descricao: 'Conta de internet', valor: 50, parcelas: 2, tipo: 'Fixa', vencimento: '01/10', observacao: 'a' },
            { situacao: 'Pago', descricao: 'Conta de luz', valor: 220, parcelas: 2, tipo: 'Variável', vencimento: '20/09', observacao: 'a' },
        ]
      },

      getColor(situacao) {
        if (situacao == 'Atrasado') return 'red'
            else if (situacao == 'Pendente') return 'yellow'
            else return 'green'
      },

      editItem (item) {
        this.editedIndex = this.expenses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.expenses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.expenses.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.expenses[this.editedIndex], this.editedItem)
        } else {
          this.expenses.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style>

</style>
