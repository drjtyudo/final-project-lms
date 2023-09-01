import { Button } from 'antd'
import BankComp from 'components/BankComp/BankComp'
import { MyCollapse } from 'components/Collapse/Collapse'
import React from 'react'
import Link from 'next/link'

function BankTransfer() {
  return (
    <>
    <div className="h-[767px]">
      <div className="w-[532px] mx-auto">
        <BankComp />
        <div className="mb-10">                         
          <MyCollapse />
        </div>
        <div className="rounded-lg text-center">
          <Link href='/pembayaran'>
          <Button className="px-20 bg-gray-500">Back to Merchant</Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default BankTransfer