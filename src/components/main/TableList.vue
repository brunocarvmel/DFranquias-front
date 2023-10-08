<script lang="ts" setup>
import type { Header, Item } from "vue3-easy-data-table";

const headers: Header[] = [
  { text: "ID", value: "id" },
  { text: "Código", value: "codigo" },
  { text: "Peso", value: "peso", sortable: true},
  { text: "Produção semanal de Leite", value: "qtd_leite", sortable: true},
  { text: "Quantidade de Ração", value: "qtd_racao", sortable: true},
  { text: "Data de nascimento", value: "nascimento", sortable: true},
  { text: "Encaminhado para o abate em:", value: "abate.created_at", sortable: true},
  { text: "Operation", value: "operation" },
];
</script>

<script lang="ts">
export default {
  props: ['items'],
  methods: {
    deleteItem(val: Item) {
      this.$emit("delete", val);
    },
    editItem(val: Item) {
      this.$emit("update", val);
    },
    abater(val: Item) {
      this.$emit("abater", val);
    }
  }
}

</script>

<template>
  <EasyDataTable
    :headers="headers"
    :items="items"
    :loading="loading"
    alternating
  >
  <template #item-operation="item">
    <div class="operation-wrapper">
      <span @click="abater(item)">Abater</span> / <span @click="editItem(item)">Editar</span> / <span @click="deleteItem(item)">Apagar</span>
    </div>
  </template>

  </EasyDataTable>
</template>


