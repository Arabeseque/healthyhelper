import { request } from "@/utils/service"

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
export function getTableDataApi(params: any) {
  return request({
    url: "table",
    method: "get",
    params
  })
}