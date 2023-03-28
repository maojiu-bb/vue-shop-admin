<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :isShow="!isShowTable" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 属性表格 -->
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="100px"
            align="center"
          />
          <el-table-column prop="attrName" label="属性名称" width="200px" />
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                type="success"
                style="margin: 5px 10px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200px">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAttr(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加修改属性 -->
      <div v-show="!isShowTable">
        <el-form ref="form" :inline="true" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              ref="attrName"
              v-model="attrInfo.attrName"
              placeholder="请输入属性名"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName || addAttrValueDisable"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="cancel">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="100px"
            align="center"
          />
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row }">
              <el-input
                v-if="row.flag"
                ref="input"
                v-model="row.valueName"
                placeholder="请输入属性值的名称"
                size="mini"
                @blur="showInput(row)"
              />
              <span
                v-else
                ref="span"
                style="
                  display: block;
                  width: 564px;
                  height: 30px;
                  line-height: 30px;
                "
                @click="showSpan(row)"
              >
                {{ row.valueName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定要删除${row.valueName}吗？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="saveAttrValueDisable"
          @click="saveAttrValue"
          >保存</el-button
        >
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      isShowTable: true,
      addAttrValueDisable: false,
      saveAttrValueDisable: true,
      attrInfo: {
        attrName: '',
        attrValueList: [
          /* {
            attrId: 0,
            valueName: ''
          } */
        ],
        categoryId: 0,
        categoryLevel: 3
      }
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
        this.getAttrList()
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      const { data: res } = await this.$API.attr.reqGetAttrList({
        category1Id,
        category2Id,
        category3Id
      })
      if (res.code === 200) {
        this.attrList = res.data
      }
    },
    addAttr() {
      this.attrInfo.attrName = ''
      this.attrInfo.attrValueList = []
      this.isShowTable = false
      this.$nextTick(() => {
        this.$refs.attrName.focus()
      })
    },
    updateAttr(row) {
      this.isShowTable = false
      this.attrInfo = row
      this.attrInfo.attrValueList.forEach((item) => {
        // 由于是对象类型，直接添加数据，vue检测不到
        // 利用 $set 解决
        this.$set(item, 'flag', false)
      })
    },
    async deleteAttr(row) {
      try {
        const { id } = row
        const { data: res } = await this.$API.attr.reqDeleteAttr(id)
        if (res.code === 201) {
          this.$message({
            message: '系统数据不能删除！',
            type: 'warning'
          })
        } else if (res.code === 200) {
          this.$message({
            message: '数据删除成功！',
            type: 'success'
          })
          this.getAttrList()
        }
      } catch (error) {
        this.$message({
          message: '删除操作发生错误！',
          type: 'error'
        })
      }
    },
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: undefined,
        valueName: '',
        flag: true
      })
      this.attrInfo.categoryId = this.category3Id
      this.inputFocus()
    },
    async saveAttrValue() {
      try {
        const data = this.attrInfo
        const { data: res } = await this.$API.attr.reqAddAttr(data)
        if (res.code === 200) {
          this.isShowTable = true
          this.$message({
            message: '保存成功！',
            type: 'success'
          })
          this.getAttrList()
        }
      } catch (error) {
        this.$message({
          message: '保存失败！',
          type: 'error'
        })
      }
    },
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1)
      this.$message({
        message: '删除成功！',
        type: 'success'
      })
    },
    showSpan(row) {
      row.flag = true
      this.inputFocus()
    },
    showInput(row) {
      if (row.valueName.trim() === '') {
        this.$message({
          message: '属性值不能为空！',
          type: 'warning'
        })
        this.isDisabled(true)
        this.inputFocus()
      } else {
        const isRept = this.attrInfo.attrValueList.some((item) => {
          if (row !== item) {
            return item.valueName === row.valueName
          }
        })
        if (isRept) {
          this.$message({
            message: '属性值不能重复！'
          })
          this.isDisabled(true)
          this.inputFocus()
        } else {
          row.flag = false
          this.isDisabled(false)
        }
      }
    },
    inputFocus() {
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    isDisabled(flag) {
      this.addAttrValueDisable = flag
      this.saveAttrValueDisable = flag
    },
    cancel() {
      this.isShowTable = true
      this.attrInfo = {
        attrName: '',
        attrValueList: [
          /* {
            attrId: 0,
            valueName: ''
          } */
        ],
        categoryId: 0,
        categoryLevel: 3
      }
    }
  }
}
</script>

<style></style>
