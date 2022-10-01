<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :headers="headers"
    :items="expenses"
    sort-by="status"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Despesas</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
              >Nova Despesa</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedExpense.descricao"
                      label="Descrição"
                      type="text"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedExpense.valor"
                      label="Valor"
                      type="number"
                      prefix="R$"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedExpense.parcelas"
                      label="Parcelas"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      :items="tipo"
                      v-model="editedExpense.tipo"
                      label="Tipo"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedExpense.vencimento"
                      label="Vencimento"
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      :items="situacao"
                      v-model="editedExpense.situacao"
                      label="Situação"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedExpense.observacao"
                      label="Observação"
                      type="text"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeCard"
                >Cancelar</v-btn
              >
              <!--TO FIX: botão não pega o ID da despesa-->
              <v-btn color="blue darken-1" text @click="saveExpense"
                >Salvar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="400px">
          <v-card>
            <v-card-title class="text-h5 text-center"
              >Tem certeza que deseja excluir esta despesa?</v-card-title
            >
            <v-card-actions class="text-center">
              <v-btn color="blue darken-1" text @click="closeCardDelete"
                >Cancelar</v-btn
              >
              <!--TO FIX: botão não pega o ID da despesa-->
              <v-btn
                color="blue darken-1"
                text
                @click="deleteExpenseCardConfirm"
                >OK</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.situacao="{ item }">
      <v-chip :color="getColor(item.situacao)" dark></v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editCard(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteExpenseCard(item)">mdi-delete</v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Resetar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Situação", value: "situacao", align: "start" },
        { text: "Descrição", value: "descricao" },
        { text: "Valor", value: "valor" },
        { text: "Parcelas", value: "parcelas" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      tipo: ["Variável", "Fixa"],
      situacao: ["Atrasado", "Pendente", "Pago"],
      editedIndex: -1,
      expenses: [],
      expenseId: null,
      editedExpense: {
        situacao: "",
        descricao: "",
        valor: null,
        parcelas: null,
        tipo: "",
        vencimento: "",
        observacao: "",
      },
      defaultExpense: {
        situacao: "",
        descricao: "",
        valor: null,
        parcelas: null,
        tipo: "",
        vencimento: "",
        observacao: "",
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nova Despesa" : "Editar Despesa";
    },
  },

  watch: {
    dialog(val) {
      val || this.closeCard();
    },
    dialogDelete(val) {
      val || this.closeCardDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.expenses = [
        this.$http.get("expenses.json").then((res) => {
          this.expenses = res.data;
          //console.log(res.data);
        }),
      ];
    },

    getColor(situacao) {
      if (situacao == "Atrasado") return "red rounded-circle";
      else if (situacao == "Pendente") return "yellow rounded-circle";
      else return "green rounded-circle";
    },

    editCard(item) {
      this.editedIndex = this.expenses.indexOf(item);
      this.editedExpense = Object.assign({}, item);
      this.dialog = true;
    },

    closeCard() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedExpense = Object.assign({}, this.defaultExpense);
        this.editedIndex = -1;
      });
    },

    deleteExpenseCard(item) {
      this.editedIndex = this.expenses.indexOf(item);
      this.editedExpense = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteExpenseCardConfirm(expenseId) {
      this.$http.delete(`/expenses/${expenseId}`);
      this.expenses.splice(this.editedIndex, 1);
      this.closeCardDelete();
    },

    closeCardDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedExpense = Object.assign({}, this.defaultExpense);
        this.editedIndex = -1;
      });
    },

    saveExpense() {
      const metodo = this.expenseId ? "patch" : "post";
      const finalUrl = this.expenseId ? `/${this.expenseId}.json` : ".json";
      this.$http[metodo](`/expenses${finalUrl}`, this.editedExpense);
      this.closeCard();
    },

    getExpenses() {
      this.$http.get("expenses.json").then((res) => {
        this.expenses = res.data;
      });
    },
  },
};
</script>

<style></style>
