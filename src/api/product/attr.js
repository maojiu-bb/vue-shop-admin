import myRequest from '@/utils/myRequest'

// 商品一级分类
// GET /admin/product/getCategory1
export const reqGetCategory1 = () =>
  myRequest({
    url: `/admin/product/getCategory1`,
    method: 'GET'
  })

// 商品二级分类
// GET /admin/product/getCategory2/{category1Id}
export const reqGetCategory2 = (category1Id) =>
  myRequest({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'GET'
  })

// 商品三级分类
// GET /admin/product/getCategory3/{category2Id}
export const reqGetCategory3 = (category2Id) =>
  myRequest({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'GET'
  })

// 获取商品属性
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrList = ({ category1Id, category2Id, category3Id }) =>
  myRequest({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'GET'
  })

// 添加保存商品属性
// POST / admin / product / saveAttrInfo
/* {
  "attrName": "string",
  "attrValueList": [
    {
      "attrId": 0,
      "valueName": "string"
    }
  ],
  "categoryId": 0,  category3Id
  "categoryLevel": 3,
} */
export const reqAddAttr = (params) =>
  myRequest({
    url: '/admin/product/saveAttrInfo',
    method: 'POST',
    data: params
  })

// 删除商品属性
// DELETE /admin/product/deleteAttr/{attrId}
export const reqDeleteAttr = (attrId) =>
  myRequest({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'DELETE'
  })
