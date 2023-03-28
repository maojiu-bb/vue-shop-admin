import myRequest from '@/utils/myRequest'

// 获取spu列表接口
// GET /admin/product/{page}/{limit}
export const reqGetSpuList = (page, limit, category3Id) =>
  myRequest({
    url: `/admin/product/${page}/${limit}`,
    method: 'GET',
    params: { category3Id }
  })

// 获取spu基本信息
// GET /admin/product/getSpuById/{spuId}
export const reqGetSpuInfo = (spuId) =>
  myRequest({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'GET'
  })

// 获取品牌接口
// GET /admin/product/baseTrademark/getTrademarkList
export const reqGetTradeMark = () =>
  myRequest({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'GET'
  })

// 获取销售属性
// GET /admin/product/baseSaleAttrList
export const reqGetSaleAttr = () =>
  myRequest({
    url: '/admin/product/baseSaleAttrList',
    method: 'GET'
  })

// 获取图片
// GET /admin/product/spuImageList/{spuId}
export const reqGetSpuImages = (spuId) =>
  myRequest({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'GET'
  })
