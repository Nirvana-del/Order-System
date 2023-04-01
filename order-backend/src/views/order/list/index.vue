<script lang="ts">
export default {
  name: 'order',
};
</script>

<script setup lang="ts">
import {onMounted, reactive, ref, toRefs} from 'vue';
import {ElForm} from 'element-plus';

import {
  getDishesDetailApi,
  getOrderByStatusApi,
  sendOrderApi,
  getOrderDetailApi, confirmPayApi
} from '@/api/order';
import {Search, Refresh} from '@element-plus/icons-vue';
// import {Logistics, Order, OrderQuery} from '@/api/order/types';

const queryFormRef = ref(ElForm);

const orderStatusMap = {
  '待评价': '待评价',
  '已完成': '已完成',
  '待上餐': '待上餐',
  '待支付': '待支付'
};


const state = reactive({
  loading: false,
  ids: [],
  single: true,
  multiple: true,
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    dateRange: [] as any,
  } as any,
  orderList: [] as any[],
  total: 0,
  dialog: {
    title: '订单详情',
    visible: false,
    // eslint-disable-next-line no-undef
  } as any,
  dialogVisible: false,
  deskId: '',
  orderStatusMap,
  orderDelivery: {} as any
});

const {loading, queryParams, orderList, total, orderDelivery, dialog, deskId} = toRefs(state);

const handleQuery = async () => {
  state.loading = false;
  console.log(queryParams.value.status)
  await getOrderList(queryParams.value.status)
}

function resetQuery() {
  queryFormRef.value.resetFields();
  handleQuery();
}

const viewDetail = async (row: any) => {
  console.log(row)
  const res = await getOrderDetailApi(row.id)
  console.log(res.data)
  deskId.value = res.data.seat
  orderDelivery.value = res.data.order
  state.dialog.visible = true;
}

const getOrderList = async (status?: string) => {
  const res = await getOrderByStatusApi(status)
  console.log(res)
  const newList = res.data.orderList
  for (const item of newList) {
    const res = await getDishesDetailApi(item.id)
    item.orderItems = res.data.orderItemList
  }
  orderList.value = newList
}
const sendProduct = async (order: any) => {
  await sendOrderApi(order.id)
  resetQuery()
}

const confirmPay = async (order: any) => {
  await confirmPayApi(order.id)
  resetQuery()
}
onMounted(() => {
  handleQuery();
  getOrderList()
});
</script>

<template>
  <div class="app-container">
    <!-- 搜索表单 -->
    <el-form ref="queryFormRef" :model="queryParams" :inline="true">
      <el-form-item prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="订单状态"
        >
          <el-option
            v-for="(key, value) in orderStatusMap"
            :key="key"
            :label="key"
            :value="value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleQuery"
        >查询
        </el-button
        >
        <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="dataTable"
      v-loading="loading"
      :data="orderList"
      border>
      <el-table-column type="expand" width="100" label="订单商品">
        <template #default="scope">
          <el-table :data="scope.row.orderItems" border>
            <el-table-column label="序号" type="index" width="100"/>
            <el-table-column label="商品编号" align="center" prop="id"/>
            <el-table-column label="图片" prop="picUrl">
              <template #default="scope">
                <img :src="scope.row.picUrl" width="40" height="40" alt=""/>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单价" prop="price">
              <template #default="scope">{{ scope.row.price }}</template>
            </el-table-column>
            <el-table-column align="center" label="数量" prop="count">
              <template #default="scope">{{ scope.row.count }}</template>
            </el-table-column>
            <el-table-column align="center" label="总价" prop="count">
              <template #default="scope">{{ scope.row.totalAmount }}</template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="orderSn" label="订单编号"/>

      <el-table-column align="center" label="订单状态">
        <template #default="scope">
          <el-tag>{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="orderPrice" label="订单金额">
        <template #default="scope">
          {{ scope.row.totalAmount }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="payPrice" label="商品数量">
        <template #default="scope">
          {{ scope.row.totalQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="createTime" label="创建时间"/>

      <el-table-column align="center" label="操作" width="300">
        <template #default="scope">
          <el-button size="small" @click="viewDetail(scope.row)">查看订单</el-button>
          <el-popconfirm v-if="scope.row.status === '待上餐'" title="确定餐品已送达吗？" @confirm="sendProduct(scope.row)">
            <template #reference>
              <el-button size="small" type="danger">
                确定送餐
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm v-if="scope.row.status === '待支付'" title="确定该订单已支付吗？" @confirm="confirmPay(scope.row)">
            <template #reference>
              <el-button size="small" type="danger">
                已支付
              </el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>

    </el-table>

    <!-- 分页工具条 -->
    <pagination
      v-if="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="handleQuery"
    />
    <el-dialog v-model="dialog.visible" title="订单信息">
      <el-descriptions>
        <el-descriptions-item label="订单编号">{{ orderDelivery.id }}</el-descriptions-item>
        <el-descriptions-item label="餐桌">{{ deskId }}</el-descriptions-item>
        <el-descriptions-item label="订餐者">{{ orderDelivery.buyerUsername }}</el-descriptions-item>
        <el-descriptions-item label="商铺">{{ orderDelivery.seller }}</el-descriptions-item>
        <el-descriptions-item label="总金额">￥{{ orderDelivery.totalAmount }}</el-descriptions-item>
        <el-descriptions-item label="总数量">{{ orderDelivery.totalQuantity }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ orderDelivery.createTime }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">
          <el-tag>{{ orderDelivery.status}}</el-tag>
        </el-descriptions-item>
<!--        <el-descriptions-item label="备注">-->
<!--          <el-tag size="small">{{ orderDelivery.remark }}</el-tag>-->
<!--        </el-descriptions-item>-->
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<style scoped></style>
