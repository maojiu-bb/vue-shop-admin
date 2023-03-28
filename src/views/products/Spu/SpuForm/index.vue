<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" placeholder="SPU名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" value="" placeholder="请选择品牌">
          <el-option
            v-for="item in trademark"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spu.description"
          type="textarea"
          rows="4"
          placeholder="SPU描述"
        />
      </el-form-item>
      <el-form-item label="SPU照片">
        <el-upload
          action="/api/admin/product/upload"
          list-type="picture-card"
          :file-list="images"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          v-model="attr"
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          />
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attr"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          />
          <el-table-column prop="saleAttrName" label="属性名" width="200px" />
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                v-for="(tag, index) in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
                @blur="handleInputConfirm(row)"
                @keyup.enter.native="handleInputConfirm(row)"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: '',
        spuImageList: [
          /* {
            id: 0,
            imgName: 'string',
            imgUrl: 'string',
            spuId: 0
          } */
        ],
        spuName: '',
        spuSaleAttrList: [
          /* {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: 'string',
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: 'string',
                saleAttrName: 'string',
                saleAttrValueName: 'string',
                spuId: 0
              }
            ]
          } */
        ],
        tmId: 0
      },
      trademark: [],
      saleAttr: [],
      images: [],
      attr: ''
    }
  },
  computed: {
    unSelectSaleAttr() {
      return this.saleAttr.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name !== item1.saleAttrName
        })
      })
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.images = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(response, file, fileList) {
      this.images = fileList
    },
    showInput(row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row
      if (inputValue.trim() === '') {
        this.$message({
          message: '属性值不能为空！',
          type: 'warning'
        })
        this.$nextTick(() => {
          this.$refs.saveTagInput.focus()
        })
      }
      const result = row.spuSaleAttrValueList.some(
        (item) => item.saleAttrValueName !== inputValue
      )
      if (!result) {
        this.$message({
          message: '属性值不能重复！',
          type: 'warning'
        })
        this.$nextTick(() => {
          this.$refs.saveTagInput.focus()
        })
        return
      }
      const newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue
      }
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
    },
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attr.split(':')
      const newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrList: [] }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attr = ''
    },
    async initSpuData(spu) {
      const { data: spuRes } = await this.$API.spu.reqGetSpuInfo(spu.id)
      if (spuRes.code === 200) {
        this.spu = spuRes.data
      }
      const { data: trademarkRes } = await this.$API.spu.reqGetTradeMark()
      if (trademarkRes.code === 200) {
        this.trademark = trademarkRes.data
      }
      const { data: saleAttrRes } = await this.$API.spu.reqGetSaleAttr()
      if (saleAttrRes.code === 200) {
        this.saleAttr = saleAttrRes.data
      }
      const { data: imageRes } = await this.$API.spu.reqGetSpuImages(spu.id)
      if (imageRes.code === 200) {
        const imgArr = imageRes.data
        imgArr.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.images = imgArr
      }
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
