import React from 'react'

export default function Prabayar() {
  return (
    <div
      id="prabayar"
      className="w-[442px] h-[116px]  bg-white rounded-[21px] py-3 px-[18px] absolute top-[150px] left-0 right-0 m-auto"
    >
      <div className="flex justify-between">
        <p className='text-[16px] font-bold'>Total</p>
        <p>Choose within 23:59:59</p>
      </div>
      <div id="money" className="">
        <h1 className='text-[24px] font-bold'>Rp 100,000</h1>
      </div>
      <div id="orderId">
        <p>Order ID #wWwTsA</p>
      </div>
    </div>
  )
}
