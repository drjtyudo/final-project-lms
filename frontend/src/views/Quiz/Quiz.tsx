import Slider from 'components/Slider/Slider'
import Cards from 'components/Cards/Cards'
import { ModulComp } from 'components/Modul/ModulComp'
import QuizComp from 'components/Quiz/Quiz'
import Footer from 'layouts/containers/Public/Footer'
import NavigationBar from 'layouts/containers/Public/Navbar'
import React from 'react'
import Komentar from 'components/Review/komentar'

export default function Quiz() {
  return (
    <>
      <NavigationBar />
      <div className="mx-[80px]">
        <div>
          <h1 className='my-5'>Judul Pelatihan</h1>
          <QuizComp />
        </div>
        <div className="flex mt-[37px]">
          <ModulComp />
          <div>
            <Cards.CardBenefit />
            <div className='w-full h-[160px] my-4 bg-gray-100'></div>
            <Komentar />
          </div>
        </div>
        <div className='w-full h-[2px] bg-black mt-12'></div>
        <div>
          <Slider.SliderPelatihan
            title="Pelatihan Serupa"
            // deskripsi="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium perferendis numquam soluta dolor sapiente eveniet, autem ipsam modi culpa deserunt porro illo voluptates iste debitis repudiandae impedit, itaque asperiores perspiciatis?"
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
