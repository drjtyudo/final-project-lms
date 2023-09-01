import axios from 'axios'
import Cards from 'components/Cards/Cards'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface ISlider {
  title: string
  deskripsi: string
}

const Slider = {
  SliderKategori: (props: ISlider) => {
    const { title, deskripsi } = props
    const [kategori, setKategori] = useState([])

    useEffect(() => {
      getKategori()
    }, [])

    const getKategori = async () => {
      try {
        const data = await axios.get('http://localhost:8000/kategori')
        setKategori(data.data.response)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <div className="mt-[100px] pb-10">
        <h1 className="text-[30px] font-bold text-[#1D1E1E] border-l-[7px] border-[#ffaf20] px-3">
          {title}
        </h1>
        <div className="flex justify-between">
          <p className="w-[80%] py-5 font-normal text-[#424242]">{deskripsi}</p>
          <button className="bg-[#10455B] text-white font-bold h-[50px] w-[180px] rounded-[50px] mt-4">
            Tampilkan semua
          </button>
        </div>
        <div className="flex gap-10">
          {kategori.map((data) => (
            <Cards.CardKategori
              image={data.url_image}
              title={data.kategori}
              titlePelatihan=""
              description={data.deskripsi}
            />
          ))}
        </div>
      </div>
    )
  },
  SliderPelatihan: (props: ISlider) => {
    const { title, deskripsi } = props
    const [pelatihan, setPelatihan] = useState([])

    const getPelatihan = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pelatihan')
        setPelatihan(response.data.pelatihan)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getPelatihan()
    }, [])

    console.log(pelatihan)

    return (
      <div className="mt-[100px] pb-10">
        <h1 className="text-[30px] font-bold text-[#1D1E1E] border-l-[7px] border-[#ffaf20] px-3">
          {title}
        </h1>
        <div className="flex justify-between flex-wrap">
          <p className="w-[80%] py-5 font-normal text-[#424242]">{deskripsi}</p>
          <Link href="/pusatpengetahuan">
            <button className="bg-[#10455B] text-white font-bold h-[50px] w-[180px] rounded-[50px] mt-4">
              Tampilkan semua
            </button>
          </Link>
        </div>
        <div className="flex gap-10">
          {pelatihan.map((data) => (
            <Link
              key={data.id}
              href={`/beliPengetahuan?id=${data.id}`}
              passHref
            >
              <Cards.CardPelatihan
                key={data.id}
                titlePelatihan={data.judul}
                image={data.image_url}
                description={data.deskripsi}
                harga={data.harga}
                dibuat_oleh={data.dibuat_oleh}
                level={data.level}
                totalViews={data.totalViews}
                averageRating={data.averageRating}
                styleCard="w-[317px] rounded-[10px] shadow-[0_40px_60px_0px_rgba(32,77,132,0.1)]"
                styleParagraft="text-[#424242] text-[14px] overflow-auto h-[150px]"
                styleImage="rounded-tl-[10px] bg-cover w-full rounded-tr-[10px] h-[235px]"
              />
            </Link>
          ))}
        </div>
      </div>
    )
  },
}
export default Slider
