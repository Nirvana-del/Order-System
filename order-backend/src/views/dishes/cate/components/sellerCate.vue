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
import {
  removeDishesApi,
  getDishesDetailApi,
  getDishesByStatusApi,
  removeCateApi,
  editCateApi,
  addCateApi
} from '@/api/dishes';
import {getCateListApi} from "@/api/dishes";

const dataTableRef = ref(ElTable);
const router = useRouter();
const props = defineProps<{
  fetchCateList: () => AxiosPromise<any>
}>()
const state = reactive({
  // 遮罩层
  loading: false,
  // 选中数组
  ids: [],
  total: 0,
  cateList: [] as Array<any>,
  cateName: '',
  cateId: '',
  isAdd: true,
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
  cateName,
  cateId,
  total,
  dialogVisible,
  cateList,
  isAdd
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
  cateList.value = res.data.categories
}

const handleQuery = async () => {
  state.loading = true;
  await getCategoryList()
  state.loading = false;
}

onMounted(() => {
  handleQuery()
  getCategoryList()
})

function handleAdd() {
  isAdd.value = true
  dialogVisible.value = true
  cateName.value = ''
  cateId.value = ''
}

function handleUpdate(row: any) {
  isAdd.value = false
  console.log(row)
  dialogVisible.value = true
  cateName.value = row.name
  cateId.value = row.id
  // router.push({
  //   path: 'goods-detail',
  //   query: {goodsId: row.id, categoryId: row.categoryId},
  // });
}

function handleDelete(row: any) {
  const ids = row.id || state.ids.join(',');
  console.log(ids)
  ElMessageBox.confirm('是否确认删除选中的分类?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(function () {
      return removeCateApi(ids);
    })
    .then(() => {
      ElMessage.success('删除成功');
      handleQuery();
    });
}

async function confirmUpdate() {
  console.log('确定')
  if (isAdd.value) {
    await addCateApi(cateName.value)
  } else {
    await editCateApi(cateId.value, cateName.value)
  }
  await getCategoryList()
  dialogVisible.value = false
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
        >删除
        </el-button>
      </template>

      <el-table
        ref="dataTableRef"
        v-loading="loading"
        :data="cateList"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" header-align="center"/>
        <el-table-column label="分类ID" prop="id" header-align="center"/>
        <el-table-column label="分类名称" prop="name" header-align="center"/>
        <!--        <el-table-column label="图片" align="center">-->
        <!--          <template #default="scope">-->
        <!--            <el-popover placement="right" :width="400" trigger="hover">-->
        <!--              <img :src="scope.row.picUrl" width="400" height="400" alt=""/>-->
        <!--              <template #reference>-->
        <!--                <img-->
        <!--                  :src="scope.row.picUrl"-->
        <!--                  style="max-height: 60px; max-width: 60px"-->
        <!--                  alt=""/>-->
        <!--              </template>-->
        <!--            </el-popover>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column label="商品类目" prop="categoryName" min-width="100" align="center"/>-->
        <!--        <el-table-column align="center" label="零售价" prop="handicrafts.originPrice">-->
        <!--          <template #default="scope">{{-->
        <!--              scope.row.originPrice-->
        <!--            }}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <!--            <el-button-->
            <!--              type="success"-->
            <!--              link-->
            <!--              @click.stop="handleGoodsView(scope.row)"-->
            <!--            >查看详情-->
            <!--            </el-button>-->
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
            >删除分类
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
    <el-dialog v-model="dialogVisible" title="分类编辑">
      <el-input v-model="cateName" placeholder="分类名称"/>
      <template #footer>
      <span>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmUpdate">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>
