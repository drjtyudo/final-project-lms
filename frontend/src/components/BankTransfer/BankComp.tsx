import { Button } from 'antd'
import React from 'react'

interface BankCompTrans{
  styleComp?: string
}
export default function BankComp(props: BankCompTrans) {
  const {styleComp} = props
  return (
    <>
      <div className={`${styleComp}`}>
        {/* header start*/}
        <section className="relative">
          <h1 className="bg-[#D9D9D9] p-9 h-[177px] text-[24px] text-black font-bold">NusaKMS</h1>
          <div className="flex gap-20 justify-center bg-white border-2 border-black w-[442px] rounded-[21px] p-6 absolute top-24 left-11">
            <span>
              <h3 className="text-[16px] font-bold">Total</h3>
              <h1 className="text-[24px] font-bold">Rp 100,000</h1>
              <h4 className="text-[16px] font-normal">Order ID #wWwTsA</h4>
            </span>
            <span>
              <p className="text-[16px] font-normal">Pay within 23:59:59</p>
            </span>
          </div>
        </section>
        {/* header end*/}

        {/* comp Text BCA start */}
        <section className="mt-[90px] mx-9">
          <div className="leading-5 mb-[37px]">
            <h3 className="font-bold">Bank BCA</h3>
            <p className="w-[432px]">
              Complete Payment from BCA to the virtual account number below
            </p>
          </div>
          <div className="leading-8 mb-3">
            <p className="mb-0">Virtual Account Number</p>
            <span className="flex justify-between">
              <p>78987898789</p>
              <Button className="border-none">Copy</Button>
            </span>
          </div>
        </section>
        {/* comp Text BCA end */}
      </div>
    </>
  )
}
