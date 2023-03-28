<template>
  <div>
    <el-form :inline="true" :model="categoryForm" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryForm.category1Id"
          placeholder="请选择"
          :disabled="isShow"
          @change="getCategory2"
        >
          <el-option
            v-for="item in category1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryForm.category2Id"
          placeholder="请选择"
          :disabled="isShow"
          @change="getCategory3"
        >
          <el-option
            v-for="item in category2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryForm.category3Id"
          placeholder="请选择"
          :disabled="isShow"
          @change="changeCategory3"
        >
          <el-option
            v-for="item in category3"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: {
    isShow: {
      type: Boolean
    }
  },
  data() {
    return {
      // 一级列表
      category1: [],
      // 二级列表
      category2: [],
      // 三级列表
      category3: [],
      // 分类id
      categoryForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    this.getCategory1()
  },
  methods: {
    // 获取一级分类
    async getCategory1() {
      try {
        const { data: res } = await this.$API.attr.reqGetCategory1()
        if (res.code === 200) {
          this.category1 = res.data
        }
      } catch (error) {
        this.$message({
          message: '获取分类列表失败！',
          type: 'error'
        })
        return false
      }
    },
    // 获取二级分类
    async getCategory2() {
      try {
        this.category2 = []
        this.categoryForm.category2Id = ''
        this.categoryForm.category3Id = ''
        const { category1Id } = this.categoryForm
        const { data: res } = await this.$API.attr.reqGetCategory2(category1Id)
        if (res.code === 200) {
          this.category2 = res.data
          this.$emit('getCategoryId', {
            category1Id: category1Id,
            level: 1
          })
        }
      } catch (error) {
        this.$message({
          message: '获取分类列表失败！',
          type: 'error'
        })
        return false
      }
    },
    // 获取三级分类
    async getCategory3() {
      try {
        this.category3 = []
        this.categoryForm.category3Id = ''
        const { category2Id } = this.categoryForm
        const { data: res } = await this.$API.attr.reqGetCategory3(category2Id)
        if (res.code === 200) {
          this.category3 = res.data
          this.$emit('getCategoryId', { category2Id, level: 2 })
        }
      } catch (error) {
        this.$message({
          message: '获取分类列表失败！',
          type: 'error'
        })
        return false
      }
    },
    // 改变三级分类
    changeCategory3() {
      const { category3Id } = this.categoryForm
      this.$emit('getCategoryId', { category3Id, level: 3 })
    }
  }
}
</script>

<style scoped />
