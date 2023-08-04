import React from 'react'

interface ISubmit {
  value: string
  className: string
}

function InputSubmit(props: ISubmit) {
  const { value, className } = props
  return <input className={className} type="submit" value={value} />
}

export default InputSubmit
