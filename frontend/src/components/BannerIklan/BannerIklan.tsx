import axios from 'axios'
import React, { useEffect, useState } from 'react'

function BannerIklan() {
  const [iklan, setIklan] = useState([])

  useEffect(() => {
    getIklan()
  }, [])

  const getIklan = async () => {
    try {
      const data = await axios.get('http://localhost:8000/iklan')
      setIklan(data.data.iklans)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full bg-[#10455B] flex justify-center items-center">
      {iklan.map((e) => (
        <img className="w-[650px]" src={e.url_image} alt="" />
      ))}

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
