// import request from "@/utils/service"
import { request } from "@/utils/request"

/** 增 */
export function createTableDataApi(data: any) {
  return request({
    url: "table",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `table/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateTableDataApi(data: any) {
  return request({
    url: "table",
    method: "put",
    data
  })
}

/** 查 */
export function getTableDataApi(params: any, type: string) {
  if (type === 'summary') {
    return request({
      url: `/record/summary/today/${params.id}`,
      method: "get",
      params
    })
  } else if (type === 'detail') {
    return request({
      url: `/record/detail/today/${params.id}`,
      method: "get",
      params
    })
  }

}