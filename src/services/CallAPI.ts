import { AxiosInstance } from 'axios'
import { BASE_API_URL } from 'constant'

import createCustomAxiosInstance from './createCustomAxiosInstance'

class BaseCallAPI {
  /**
   * Call the API without token
   */
  public common: AxiosInstance

  /**
   * Required token to call the API
   */
  public admin: AxiosInstance

  constructor() {
    this.common = createCustomAxiosInstance({
      baseURL: BASE_API_URL,
    })

    this.admin = createCustomAxiosInstance({
      baseURL: BASE_API_URL,
      tokenLocalStorageKey: 'apiToken',
    })
  }

  login(data: { user: string; password: string }) {
    return this.common.post(`/auth/sign-in`, data)
  }

  // eslint-disable-next-line no-unused-vars
  getDummyUsers(payload: { page: number; pageSize: number }) {
    return this.common.get('https://jsonplaceholder.typicode.com/users')
  }
}

const CallAPI = new BaseCallAPI()

export default CallAPI
