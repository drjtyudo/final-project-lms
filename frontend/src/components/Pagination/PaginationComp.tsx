import React from 'react'
import { Pagination } from 'antd'
 

export default function PaginationComp() {
  return (
    <>
      <Pagination defaultCurrent={1} total={50} className="flex justify-end mr-[50px]"/>;
    </>
  )
}
