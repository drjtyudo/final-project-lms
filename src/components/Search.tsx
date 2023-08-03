import React from 'react'
import { Input, InputProps } from 'antd'

type IProps = InputProps & {
  // eslint-disable-next-line no-unused-vars
  onSearch: (value: string) => void
}

export function Search(props: IProps) {
  const { onSearch, type, placeholder, ...restProps } = props
  const [searchTerm, setSearchTerm] = React.useState('')
  const [delayedSearchTerm, setDelayedSearchTerm] = React.useState('')

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDelayedSearchTerm(searchTerm)
    }, 800)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  React.useEffect(() => {
    onSearch?.(delayedSearchTerm)
  }, [delayedSearchTerm])

  return (
    <Input
      autoFocus
      type={type || 'text'}
      autoComplete="off"
      placeholder={placeholder || 'Search here...'}
      onChange={(e) => setSearchTerm(e.target.value)}
      {...restProps}
    />
  )
}

export const memoizedSearch = React.memo(Search)
