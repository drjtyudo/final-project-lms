import Cards from 'components/Cards/Cards'
import React from 'react'
import Quiz from 'components/Quiz/Quiz'

interface ISlider {
  title: string
  deskripsi: string
}

function Slider(props: ISlider) {
  const { title, deskripsi } = props
  return (
    <div>
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
        <Cards.CardKategori
          image="./static/Content/kategori.png"
          title="Frontend Developer"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum."
        />
      </div>
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
        <Cards.CardPelatihan
          image="./static/Content/kategori.png"
          titlePelatihan="Judul Pelatihan"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum."
        />
      </div>
    </div>
  )
}

export default Slider
