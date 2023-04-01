<!--商品列表-->
<script lang="ts">

export default {
  name: 'goods',
};

</script>

<script setup lang="ts">
import {getCateListApi} from "@/api/dishes";
import SellerCate from '@/views/dishes/cate/components/sellerCate.vue'
const fetchCateList = async () => {
  return getCateListApi();
}

</script>

<template>
  <div>
    <SellerCate :fetchCateList="fetchCateList"/>
  </div>
</template>

<style scoped></style>
