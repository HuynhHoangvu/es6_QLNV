export default class Api {
  callApi(uri, method,data){
    const DOMAIN ="https://64709e373de51400f724a075.mockapi.io"
    return axios({
      url:`${DOMAIN}/${uri}`,
      method,
      data
    })
  }
}