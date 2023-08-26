import CreditComp from 'components/CreditComp/CreditComp'
import React from 'react'
import Prabayar from 'components/Prabayar/Prabayar'
import Footer from 'layouts/containers/Public/Footer'
export default function CreditCard() {
  return (
    <div>
      <div className="w-[532px] h-[803px] bg-gray-500 m-auto my-8">
        <Prabayar />
        <div>
          <div className="h-[177px] bg-slate-300 p-14">
            <h1 className="text-[24px]">NusaKMS</h1>
          </div>
          <div className="h-[546px] mx-[18px] px-6 mt-[70px] overflow-auto">
            <CreditComp />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
