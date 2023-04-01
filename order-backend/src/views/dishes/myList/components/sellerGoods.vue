<!--商品列表-->
<script lang="ts">
export default {
  name: 'goods',
};
</script>

<script setup lang="ts">
import {reactive, ref, onMounted, toRefs} from 'vue';
import {ElTable, ElMessage, ElMessageBox} from 'element-plus';
import {useRouter} from 'vue-router';
import {AxiosPromise} from 'axios';

import {
  Search,
  Refresh,
  Delete,
  Plus,
} from '@element-plus/icons-vue';
import {removeDishesApi, getDishesDetailApi, getDishesByStatusApi } from '@/api/dishes';
import {getCateListApi} from "@/api/dishes";

const dataTableRef = ref(ElTable);
const router = useRouter();
const props = defineProps<{
  refreshGoodsList: () => AxiosPromise<any>
}>()
const state = reactive({
  // 遮罩层
  loading: false,
  // 选中数组
  ids: [],
  total: 0,
  goodsList: [] as Array<any>,
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  } as any,
  categoryOptions: [
    {
      value: 0,
      label: '正在出售',
    }, {
      value: 1,
      label: '已经售出',
    }, {
      value: 2,
      label: '已经下架',
    },
  ] as OptionType[],
  goodDetail: '',
  dialogVisible: false,
});

const {
  loading,
  ids,
  queryParams,
  categoryOptions,
  goodDetail,
  total,
  dialogVisible,
  goodsList
} = toRefs(state);
// 过滤分类数据
function filterCategory(categories: any[]): OptionType[] {
  return categories.map(item => {
    if (item.categoryList && item.categoryList.length !== 0) {
      return {
        value: item.id,
        label: item.name,
        children: filterCategory(item.categoryList)
      }
    } else {
      return {
        value: item.id,
        label: item.name
      }
    }
  })
}
// 获取分类数据
async function getCategoryList() {
  const res = await getCateListApi()
  console.log(res)
  categoryOptions.value = filterCategory(res.data.categories);
}
const handleQuery = async () => {
  state.loading = true;
  const res = await props.refreshGoodsList()
  console.log(res)
  goodsList.value = res.data.dishesList
  state.loading = false;
}
async function getGoodsListByQuery(){
  console.log(queryParams.value.categoryId)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const res = await getDishesByStatusApi(queryParams.value.categoryId!)
  console.log(res.data.dishes)
  goodsList.value = res.data.dishes
}
onMounted(() => {
  handleQuery()
  getCategoryList()
})
function resetQuery() {
  state.queryParams = {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    categoryId: undefined,
  };
  handleQuery();
}

async function handleGoodsView(row: any) {
  console.log(row)
  const res = await getDishesDetailApi(row.id)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  state.goodDetail = res.data.handicrafts.detail!;
  state.dialogVisible = true;
}

function handleAdd() {
  router.push({path: 'goods-detail'});
}

function handleUpdate(row: any) {
  router.push({
    path: 'goods-detail',
    query: {goodsId: row.id, categoryId: row.categoryId},
  });
}

function handleDelete(row: any) {
  const ids = row.dishes.id || state.ids.join(',');
  console.log(ids)
  ElMessageBox.confirm('是否确认下架选中的商品?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(function () {
      return removeDishesApi(ids);
    })
    .then(() => {
      ElMessage.success('删除成功');
      handleQuery();
    });
}

function handleRowClick(row: any) {
  dataTableRef.value.toggleRowSelection(row);
}

function handleSelectionChange(selection: any) {
  state.ids = selection.map((item: { id: any }) => item.id);
}
</script>

<template>
  <div class="app-container">
    <div class="search">
      <!--      商家展示： 正在出售的/已经售出的/已经下架的-->
      <!--      买家展示： 按类别/价格/名称等-->
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="商品分类">
          <el-cascader
            v-model="queryParams.categoryId"
            placeholder="全部"
            :props="{ emitPath: false }"
            :options="categoryOptions"
            clearable
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="getGoodsListByQuery"
          >搜索
          </el-button
          >
          <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card>
      <template #header>
        <el-button type="success" :icon="Plus" @click="handleAdd"
        >新增
        </el-button
        >
        <el-button
          type="danger"
          :icon="Delete"
          :disabled="ids.length === 0"
          @click="handleDelete"
        >下架
        </el-button>
      </template>

      <el-table
        ref="dataTableRef"
        v-loading="loading"
        :data="goodsList"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        border
      >
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column width="120" label="分类名称" align="center" prop="dishes.categoryName">
        </el-table-column>
        <el-table-column label="商品名称" prop="dishes.name" align="center"/>
        <el-table-column label="图片" align="center">
          <template #default="scope">
            <el-popover placement="right" :width="400" trigger="hover">
              <img :src="scope.row.dishes.picUrl" width="400" height="400" alt=""/>
              <template #reference>
                <img
                  :src="scope.row.dishes.picUrl"
                  style="max-height: 60px; max-width: 60px"
                  alt=""/>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" label="零售价" prop="dishes.originPrice">
          <template #default="scope">{{
              scope.row.dishes.originPrice
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              link
              @click.stop="handleUpdate(scope.row)"
            >
              修改信息
            </el-button>
            <el-button
              type="danger"
              link
              @click.stop="handleDelete(scope.row)"
            >下架菜品
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页工具条 -->
    <pagination
      v-if="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="handleQuery"
    />
    <el-dialog v-model="dialogVisible" title="商品详情">
      <div class="goods-detail-box" v-html="goodDetail"/>
    </el-dialog>
  </div>
</template>

<style scoped></style>
