export interface UpdateTableRequestData {
  id: number
  reg_deadline: string
  begin_time: string
  end_time: string
  title: string
  headcount: number
  sponsor: string
  type: string
  location: string
  description: string
  race_season: string
  data_query: string
}

export interface GetTableRequestData {
  /** 当前页码 */
  offset: number
  /** 查询条数 */
  limit: number
}

export interface CreateTableRequestData {
  reg_deadline: string
  begin_time: string
  end_time: string
  title: string
  headcount: number
  sponsor: string
  type: string
  location: string
  description: string
  race_season: string
  data_query: string
}

export interface GetTableData {
  id: number
  reg_deadline: string
  begin_time: string
  end_time: string
  title: string
  headcount: number
  reg_count: number
  sponsor: string
  type: string
  location: string
  description: string
  race_season: string
  data_query: string
  state: number
  author_id: number
}

export type GetTableResponseData = ApiResponseData<{
  data: GetTableData[]
  count: number
  code: number
}>
