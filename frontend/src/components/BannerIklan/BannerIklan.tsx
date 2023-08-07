import React from 'react'

function BannerIklan() {
  return (
    <div className="w-full bg-[#10455B] flex justify-center items-center">
      <img className="w-[650px]" src="./static/Content/Banner.png" alt="" />
      <div className="px-4">
        <h1 className="text-[40px] font-semibold text-yellow-200">
          Dapatkan Diskon Untuk Pelajar
        </h1>
        <p className="leading-[24px] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          reprehenderit vero a voluptatum esse eum magnam eius provident
          corrupti quasi voluptates iste non quam nesciunt accusamus, magni
          sequi. Cumque, culpa.
        </p>
      </div>
    </div>
  )
}

export default BannerIklan
