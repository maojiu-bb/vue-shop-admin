<template>
  <div>
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 10px"
      @click="addTradeMark"
      >添加</el-button
    >
    <!-- 表格 -->
    <!-- data 为要展示的数据 -->
    <!-- el-ui 是一列一列 -->
    <!-- label 为标题 -->
    <!-- props 为要写入的数据 -->
    <!-- type="index" 可以展示索引 -->
    <el-table style="width: 100%" border :data="trademarkList">
      <!-- label 显示的标题 -->
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="width" />
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" alt="" style="width: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="scope">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(scope)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
    <!-- current-page 当前页码 -->
    <!-- page-sizes，page-size 每页显示个数 -->
    <!-- layout 布局 -->
    <!-- total 总数 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="1"
      :page-sizes="[3, 5, 10]"
      :page-size="3"
      layout=" prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <!-- 对话框 -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="ruleForm" :model="tmForm" :rules="rules">
        <el-form-item label="品牌名称" label-width="80px" prop="tmName">
          <el-input
            v-model="tmForm.tmName"
            autocomplete="off"
            style="width: 80%"
          />
        </el-form-item>
        <el-form-item label="品牌logo" label-width="80px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      trademarkList: [],
      dialogFormVisible: false,
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change'
          }
        ],
        logoUrl: [{ required: true, message: '请选择品牌LOGO' }]
      }
    }
  },
  mounted() {
    this.getTradeMarkList()
  },
  methods: {
    // 获取品牌列表
    async getTradeMarkList() {
      try {
        const { page, limit } = this
        const { data: res } = await this.$API.trademark.reqTradeMark(
          page,
          limit
        )
        if (res.code === 200) {
          this.total = res.data.total
          this.trademarkList = res.data.records
        }
      } catch (error) {
        Message({
          message: error.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
    },
    // 分页器当前页
    handleCurrentChange(pager) {
      this.page = pager
      this.getTradeMarkList()
    },
    // 分页器的每页数目
    handleSizeChange(limit) {
      this.limit = limit
      this.getTradeMarkList()
    },
    // 添加品牌按钮
    addTradeMark() {
      this.dialogFormVisible = true
    },
    // 更新品牌按钮
    updateTradeMark(scope) {
      this.dialogFormVisible = true
      this.tmForm = { ...scope.row }
    },
    // 上传成功后
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
    },
    // logo上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加或更新品牌
    addOrUpdateTradeMark() {
      // eslint-disable-next-line space-before-function-paren
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          try {
            this.dialogFormVisible = false
            if (!this.tmForm.id) {
              const { data: res } = await this.$API.trademark.reqAddTradeMark(
                this.tmForm
              )
              if (res.code === 200) {
                this.$message({
                  message: '添加品牌成功！',
                  type: 'success'
                })
                this.getTradeMarkList()
              }
            } else {
              const { data: res } =
                await this.$API.trademark.reqUpdateTradeMark(this.tmForm)
              if (res.code === 200) {
                this.$message({
                  message: '更新品牌成功！',
                  type: 'success'
                })
                this.getTradeMarkList()
              }
            }
          } catch (error) {
            Message({
              message: error.message || 'Error',
              type: 'error',
              duration: 5 * 1000
            })
          }
        } else {
          this.$message({
            message: '表单验证错误！',
            type: 'error'
          })
          return false
        }
      })
    },
    // 取消按钮
    cancel() {
      this.dialogFormVisible = false
      if (!this.tmForm.id) {
        this.tmForm.tmName = ''
        this.tmForm.logoUrl = ''
      }
    },
    // 删除品牌
    deleteTradeMark(scope) {
      this.$confirm(`是否确定要删除${scope.row.tmName}品牌`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          const { data: res } = await this.$API.trademark.reqDeleteTradeMark(
            scope.row.id
          )
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getTradeMarkList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
