<script setup>
import { ref } from "vue";
import { useApiStore } from "@/services/api.js";

const page = ref(1);

const emit = defineEmits(["handlePageChange"]);

const handlePageChange = () => {
  const paginate = { page: page.value, per_page: 15 };
  emit("handlePageChange", paginate);
};

const model = ref();

const requestsStore = useApiStore();

const props = defineProps({
  headers: {
    type: Array,
    required: true,
    default: () => [],
  },
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  hideDefaultFooter: {
    type: Boolean,
    default: true,
  },
  hideDefaultHeader: {
    type: Boolean,
    default: false,
  },
  showExpand: {
    type: Boolean,
    default: false,
  },
  showSelect: {
    type: Boolean,
    default: false,
  },
  selectStrategy: {
    type: String,
    default: "single",
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  customColumn: {
    type: Array,
    default: () => [],
  },
  onModelUpdate: {
    type: Function,
    default: () => {},
  },
  disableSort: {
    type: Boolean,
    default: true,
  },
  fixedHeader: {
    type: Boolean,
    default: false,
  },
  handlePageChange: {
    type: Function,
    default: () => {},
  },
  paginateLength: {
    type: Number,
    default: 0,
  },
  showPaginate: {
    type: Boolean,
    default: true,
  },
  onExpand: {
    type: Function,
    default: () => {},
  },
  customExpanded: {
    type: Boolean,
    default: false,
  },
  id: null,
});

const onSelect = (newSelectedItems) => {
  emit("update:modelValue", newSelectedItems); // Emite o evento para o componente pai
};
</script>
<template>
  <v-data-table-server
    :headers="headers"
    :items="data"
    :hide-default-footer="hideDefaultFooter"
    :hide-default-header="hideDefaultHeader"
    :show-expand="showExpand"
    :show-select="showSelect"
    :select-strategy="selectStrategy"
    :model-value="modelValue"
    :customColumn="customColumn"
    @update:model-value="onSelect"
    :disable-sort="disableSort"
    :fixed-header="fixedHeader"
    loading-text="Carregando..."
    :loading="requestsStore.numberOfAjaxCallsPending != 0"
    :items-length="data.length"
    v-bind="$attrs"
    @update:expanded="onExpand"
    :id="id"
  >
    <template #top>
      <slot name="top"></slot>
    </template>
    <template #expanded-row="{ item }">
      <td colspan="12">
        <slot name="expandedRow" :item="item"></slot>
      </td>
    </template>
    <template
      v-if="customExpanded"
      #[`item.data-table-expand`]="{
        item,
        internalItem,
        toggleExpand,
        isExpanded,
      }"
    >
      <td colspan="12">
        <slot
          name="data-table-expand-custom"
          :item="item"
          :internalItem="internalItem"
          :toggleExpand="toggleExpand"
          :isExpanded="isExpanded"
        ></slot>
      </td>
    </template>
    <template
      v-for="column in customColumn"
      :key="column"
      #[`item.${column}`]="{ item }"
    >
      <slot :name="column" :item="item"></slot>
    </template>
    <template #bottom>
      <v-pagination
        v-model="page"
        :length="paginateLength"
        :total-visible="5"
        @update:model-value="handlePageChange"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        show-first-last-page
        v-if="showPaginate"
      ></v-pagination>
    </template>
    <template #no-data>
      <slot name="no-data">
        <div>Não há dados</div>
      </slot>
    </template>
  </v-data-table-server>
</template>
<style scoped>
:deep(.v-pagination__list) {
  padding-left: 0 !important;
}
</style>
