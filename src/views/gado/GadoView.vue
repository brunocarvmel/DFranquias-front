<script setup>
import {gados, apagarGado, save, update, abaterGado} from "@/services/gadoService";
import TableList from "@/components/main/TableList.vue";
</script>

<script>

export default {
  name: 'GadoView',
  data: () => {
    return {
      items: [],
      _gado: {
        id: null,
        codigo: null,
        qtd_leite: null,
        qtd_racao: null,
        peso: null,
        nascimento: null
      },
      gado: {
        id: null,
        codigo: null,
        qtd_leite: null,
        qtd_racao: null,
        peso: null,
        nascimento: null
      },
      method: 'create'
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async deleteGado(gadoId) {
      apagarGado(gadoId).then(response => {
        if (response.data.success) {
          this.load();
          return this.success("Registro excluído com sucesso!");
        }

        this.error("Erro ao excluir!");
      })
    },
    success(message) {
      this.$swal({
        title: message,
        icon: 'success'
      });
    },
    load() {
      gados().then(response => {
        this.items = response.data;
      });
    },
    error(message){
      this.$swal({
        title: message,
        icon: 'error'
      });
    },
    confirmaExclusao(gado) {
      this.$swal({
        title: "Cuidado!",
        html: `Deseja realmente excluir o gado <span class='text-danger'>${gado.codigo}</span>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, apagar o registro!',
        cancelButtonText: 'Cancelar!',
        }).then(result => {
          if (result.isConfirmed) {
            this.deleteGado(gado.id);
          }
        });
    },
    hideModalAdicionarGado() {
      const modal = document.getElementById('modalAdicionarGado');
      modal.style.opacity = 0;
      modal.style.display = 'none';

      this.gado = { ...this._gado};
    },
    showModalAdicionarGado() {
      const modal = document.getElementById('modalAdicionarGado');
      modal.style.opacity = 1;
      modal.style.display = 'block';
    },
    async salvarGado() {
      if (this.method == 'create') {
        return this.insert();
      }
      
      return this.update();
    },
    insert() {
      save(this.gado).then(response => {
        if (response.data.success) {
          this.hideModalAdicionarGado();
          this.load();
          return this.success('Registro salvo com suceso!');
        }

        this.error(response.data.message);
      }).catch(resolve => {
        this.error('Ops! Não conseguimos concluir sua solicitação. Verfique os dados e tente novamente mais tarde.');
      });
    },
    update() {
      const data = { ...this.gado};

      update(this.gado.id, data).then(response => {
        if (response.data.success) {
          console.log('biscoito');
          this.hideModalAdicionarGado();
          this.load();
          return this.success('Registro salvo com suceso!');
        }

        this.error(response.data.message);
      }).catch(resolve => {
        this.error('Ops! Não conseguimos concluir sua solicitação. Verfique os dados e tente novamente mais tarde.');
      });
    },
    atualizarGado(gadoRecebido) {
      this.gado = gadoRecebido;
      this.method = 'update';

      this.showModalEditarGado();
    },
    showModalEditarGado() {
      const modal = document.getElementById('modalAdicionarGado');
      modal.style.opacity = 1;
      modal.style.display = 'block';
    },
    showModalAbaterGado(gado) {
      this.$swal({
        title: "Cuidado!",
        html: `Deseja realmente enviar o gado <span class='text-danger'>${gado.codigo}</span>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, abater!',
        cancelButtonText: 'Cancelar!',
        }).then(result => {
          if (result.isConfirmed) {
            this.enviarParaAbate(gado.id);
          }
        });
    },
    enviarParaAbate(gadoId) {
      abaterGado(gadoId).then(response => {
        if (response.data.success) {
          this.hideModalAdicionarGado();
          this.load();
          return this.success('Enviado para o Abate!');
        }

        this.error(response.data.message);
      }).catch(resolve => {
        this.error('Ops! Não conseguimos concluir sua solicitação. Verfique os dados e tente novamente mais tarde.');
      });
    }
  },
}
</script>

<template>
  <div class="row">
    <div class="row">
      <div class="col col-md-6 d-flex align-items-center" >
        <h3>Gados</h3>
      </div>

      <div class="col col-md-6 d-flex align-items-center flex-row-reverse" >
        <button type="button" class="btn btn-success" @click="showModalAdicionarGado">Adicionar Gado</button>
      </div>
    </div>

    <div class="row">
      <div class="col col-md-12" id="container-table">
        <TableList :items="items" @delete="confirmaExclusao" @update="atualizarGado" @abater="showModalAbaterGado"/>
      </div>
    </div>

    <div class="modal fade text-center my-5" id="modalAdicionarGado" tabindex="-1" role="dialog" aria-labelledby="modalAdicionarGadoLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalAdicionarGadoLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="usr">Código:</label>
              <input type="text" class="form-control" name="codigo" v-model="gado.codigo" v-mask="'########'">
            </div>
            <div class="form-group">
              <label for="usr">Quantida de leite:</label>
              <input type="number" class="form-control" steps="any" min="0" max="300" name="qtd_leite" v-model="gado.qtd_leite" v-money>
            </div>
            <div class="form-group">
              <label for="usr">Quantida de Ração:</label>
              <input type="number" class="form-control" steps="any" min="0" max="300" name="qtd_racao" v-model="gado.qtd_racao" v-money>
            </div>
            <div class="form-group">
              <label for="usr">Peso:</label>
              <input type="number" class="form-control" steps="any" min="0" max="300" name="peso" v-model="gado.peso" v-money>
            </div>
            <div class="form-group">
              <label for="usr">Nascimento:</label>
              <input type="text" class="form-control" name="nascimento" v-model="gado.nascimento" v-mask="'####-##-##'">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="salvarGado">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scopde>

div .row .col {
  box-sizing: border-box;
}

#container-table {
  padding: 10px;
  height: 80vh;
  overflow-x:hidden;
}

@media (min-width: 1024px) {
}
</style>
