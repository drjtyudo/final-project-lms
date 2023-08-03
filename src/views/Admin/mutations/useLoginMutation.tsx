import { useMutation } from 'react-query'
import CallAPI from 'services/CallAPI'

type IParams = {
  onSuccess?: () => void
}

function useLoginMutation(params: IParams = {}) {
  const { onSuccess } = params

  const mutation = useMutation(
    (fieldValues: { user: string; password: string }) => {
      return CallAPI.login(fieldValues)
    },
    {
      onSuccess() {
        onSuccess?.()
        // Action after login success here
      },
      onSettled() {
        // Action after login success or error here
      },
    },
  )

  return mutation
}

export default useLoginMutation
