<template>
  <el-card style="width: 50%; margin-right: 10px">
    <div class="header">
      <span>线上热门搜索</span>
      <i class="el-icon-more" />
    </div>
    <div class="body">
      <div class="body-item">
        <Charts>
          <template slot="title">
            <h3>
              搜索用户数
              <i class="el-icon-info" />
            </h3>
          </template>
          <template slot="number">
            <span>12321</span>
            <span>17.7 <i class="el-icon-caret-top" style="color: red" /></span>
          </template>
        </Charts>
      </div>
      <div class="body-item">
        <Charts>
          <template slot="title">
            <h3>
              人均搜索次数
              <i class="el-icon-info" />
            </h3>
          </template>
          <template slot="number">
            <span>2.7</span>
            <span
              >26.2 <i class="el-icon-caret-bottom" style="color: yellowgreen"
            /></span>
          </template>
        </Charts>
      </div>
    </div>
    <div class="footer">
      <el-table style="width: 100%" border>
        <el-table-column
          type="index"
          label="排名"
          width="60px"
          align="center"
        />
        <el-table-column prop="prop" label="搜索关键字" width="width" />
        <el-table-column prop="prop" label="用户数" width="width" sortable />
        <el-table-column prop="prop" label="周涨幅" width="width" sortable />
      </el-table>
      <!--  @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      <el-pagination
        :current-page="6"
        :page-size="3"
        layout=" prev, pager, next"
        :total="99"
        style="text-align: center; margin-top: 10px"
      />
    </div>
  </el-card>
</template>

<script>
import Charts from './Charts/index.vue'

export default {
  components: {
    Charts
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
}
.el-icon-more {
  margin-top: 20px;
}
.body {
  display: flex;
  justify-content: space-between;
}
.body-item {
  width: 50%;
  height: 140px;
}
.body-item:first-child {
  margin-right: 10px;
}
</style>
