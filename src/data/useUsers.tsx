import { useQuery, UseQueryOptions } from 'react-query'
import { AxiosError } from 'axios'
import CallAPI from 'services/CallAPI'

interface User {
  id: number
  name: string
}

type IResponse = User[]

type IParams = {
  page?: number
  pageSize?: number
  options?: UseQueryOptions<IResponse, AxiosError>
}

function useUsers(params: IParams = {}) {
  const { page = 1, pageSize = 10, options } = params
  const queryKey = ['/users', page, pageSize]

  const query = useQuery<IResponse, AxiosError>(
    queryKey,
    () =>
      CallAPI.getDummyUsers({ page, pageSize }).then((res) => {
        return res.data
      }),
    { ...options },
  )

  return {
    ...query,
    data: query.data,
  }
}

export default useUsers
