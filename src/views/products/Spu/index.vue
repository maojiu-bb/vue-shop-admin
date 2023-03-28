<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :isShow="scene != 0" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加Spu</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          />
          <el-table-column prop="spuName" label="Spu名称" width="width" />
          <el-table-column prop="description" label="Spu描述" width="width" />
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                title="添加"
              />
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改"
                @click="updateSpu(row)"
              />
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="详情"
              />
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin: 20px 0; text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
      <SpuForm v-show="scene == 1" ref="spu" @changeScene="changeScene" />
      <SkuForm v-show="scene == 2" />
    </el-card>
  </div>
</template>

<script>
import SkuForm from './SkuForm/index.vue'
import SpuForm from './SpuForm/index.vue'

export default {
  components: {
    SkuForm,
    SpuForm
  },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      scene: 0
    }
  },
  methods: {
    getCategoryId(categoryId) {
      if (categoryId.level === 1) {
        this.category2Id = ''
        this.category3Id = ''
        this.category1Id = categoryId.category1Id
      } else if (categoryId.level === 2) {
        this.category3Id = ''
        this.category2Id = categoryId.category2Id
      } else {
        this.category3Id = categoryId.category3Id
        this.getSpuList()
      }
    },
    async getSpuList() {
      const { page, limit, category3Id } = this
      const { data: res } = await this.$API.spu.reqGetSpuList(
        page,
        limit,
        category3Id
      )
      if (res.code === 200) {
        this.records = res.data.records
        this.total = res.data.total
      }
    },
    handleCurrentChange(page) {
      this.page = page
      this.getSpuList()
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    addSpu() {
      this.scene = 1
    },
    updateSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    changeScene(scene) {
      this.scene = scene
    }
  }
}
</script>

<style></style>
