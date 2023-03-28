import myRequest from '@/utils/myRequest'

// 获取品牌列表
// GET / admin / product / baseTrademark / { page } / { limit }
export const reqTradeMark = (page, limit) =>
  myRequest({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'GET'
  })

// 新增品牌
// POST / admin / product / baseTrademark / save
export const reqAddTradeMark = (params) =>
  myRequest({
    url: '/admin/product/baseTrademark/save',
    method: 'POST',
    data: params
  })

// 修改品牌
// PUT / admin / product / baseTrademark / update
export const reqUpdateTradeMark = (params) =>
  myRequest({
    url: '/admin/product/baseTrademark/update',
    method: 'PUT',
    data: params
  })

// 删除品牌
// DELETE / admin / product / baseTrademark / remove / { id }
export const reqDeleteTradeMark = (id) =>
  myRequest({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'DELETE'
  })
