export function request(params: any) {
  let data
  uni.request({
    url: `http://129.204.224.187:8080${params.url}`,
    method: params.method,
    data: params.params,
    header: {
      'token': 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_6tWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDc0Mjc0Mzc21FEqLU4t8kwBqjJUgnDyEnNTgVxjI6VaAGZDjc1BAAAA.YSX3JxTTNMAV8tub28sOB_TIZsNxx6pVVN7EmQVB-OXTk-kHmTZ_hqH0Ph--V7FLVhVOT2wrGdZp6QgTOcdK6A' //自定义请求头信息
    },
    success: (res) => {
      data = res.data
    }
  })
  return data
}

