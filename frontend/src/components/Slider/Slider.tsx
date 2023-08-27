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
        const data = await axios.get('http://localhost:8000/pelatihan')
        setKategori(data.data.response)
      } catch (error) {
        console.log(error)
      }
    }
    console.log(kategori)
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
              image={data.url}
              title={data.judul}
              titlePelatihan=""
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum."
            />
          ))}
        </div>
      </div>
    )
  },
  SliderPelatihan: (props: ISlider) => {
    const { title, deskripsi } = props
    const [kategori, setKategori] = useState([])

    useEffect(() => {
      getKategori()
    }, [])

    const getKategori = async () => {
      try {
        const data = await axios.get('http://localhost:8000/pelatihan')
        setKategori(data.data.response)
      } catch (error) {
        console.log(error)
      }
    }
    console.log(kategori)

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
            <Link
              key={data.id}
              href={`/beliPengetahuan?id=${data.id}`}
              passHref
            >
              <Cards.CardPelatihan
                key={data.id}
                id={data.id} // Pass the ID as a prop
                image={data.url}
                titlePelatihan={data.judul}
                harga={data.harga}
                description={data.deskripsi}
                watching={data.watching}
                rating={data.rating}
                comment={data.comment}
                create={data.createdAt}
                untuk={data.untuk}
              />
            </Link>
          ))}
        </div>
      </div>
    )
  },
}
export default Slider
