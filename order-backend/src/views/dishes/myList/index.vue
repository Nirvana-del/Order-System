<!--商品列表-->
<script lang="ts">

export default {
  name: 'goods',
};

</script>

<script setup lang="ts">
import {getDishesListApi} from "@/api/dishes";
import SellerGoods from '@/views/dishes/myList/components/sellerGoods.vue'
const fetchGoodsList = async () => {
  return getDishesListApi();
}

</script>

<template>
  <div>
    <SellerGoods :refreshGoodsList="fetchGoodsList"/>
  </div>
</template>

<style scoped></style>
