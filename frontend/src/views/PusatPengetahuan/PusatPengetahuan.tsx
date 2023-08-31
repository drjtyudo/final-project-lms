import { Button } from 'antd'
import Cards from 'components/Cards/Cards'
import PaginationComp from 'components/Pagination/PaginationComp'
import SidebarFilter from 'components/SidebarFilter/SidebarFilter'
import Footer from 'layouts/containers/Public/Footer'
import NavigationBar from 'layouts/containers/Public/Navbar'
import React, { useState } from 'react'

function PusatPengetahuan() {
  const categories = [
    'Kategori 1',
    'Kategori 2',
    'Kategori 3',
    'Kategori 4',
    'Kategori 5',
  ]

  const dataCard = [
    {
      image: './static/Content/kategori.png',
      title: 'Frontend Developer',
      titlePelatihan: '',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum.',
      harga: '300.000 -',
    },
    {
      image: './static/Content/kategori.png',
      title: 'Frontend Developer',
      titlePelatihan: '',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum.',
      harga: '300.000 -',
    },
    {
      image: './static/Content/kategori.png',
      title: 'Frontend Developer',
      titlePelatihan: '',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum.',
      harga: '300.000 -',
    },
    {
      image: './static/Content/kategori.png',
      title: 'Frontend Developer',
      titlePelatihan: '',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum.',
      harga: '300.000 -',
    },
    {
      image: './static/Content/kategori.png',
      title: 'Frontend Developer',
      titlePelatihan: '',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum.',
      harga: '300.000 -',
    },
    {
      image: './static/Content/kategori.png',
      title: 'Frontend Developer',
      titlePelatihan: '',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum.',
      harga: '300.000 -',
    },
    {
      image: './static/Content/kategori.png',
      title: 'Frontend Developer',
      titlePelatihan: '',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum.',
      harga: '300.000 -',
    },
    {
      image: './static/Content/kategori.png',
      title: 'Frontend Developer',
      titlePelatihan: '',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum.',
      harga: '300.000 -',
    },
    //Tambahkan objek lainnya di sini jika diperlukan
  ]

  const [filteredCategories, setFilteredCategories] = useState([])

  const handleCategoryChange = (selectedCategories) => {
    setFilteredCategories(selectedCategories)
    // Di sini Anda dapat mengupdate data atau melakukan filter data dengan kategori yang dipilih.
  }

  return (
    <>
      <NavigationBar />
      <SidebarFilter
        categories={categories}
        onCategoryChange={handleCategoryChange}
      />
      <div className="ml-[370px]">
        <div className="flex gap-x-5 border-none mb-10">
          <Button className="rounded-3xl px-6 mt-[22px]">sort</Button>
          <Button className="rounded-3xl px-6 mt-[22px]">Reset</Button>
        </div>

        <div className="flex flex-wrap gap-x-[33px] gap-y-[50px] mb-[25px]">
          {dataCard.map((item, index) => (
            <div
              key={index}
              className="w-[317px] border-gray-200 border-2 rounded-lg"
            >
              <Cards.CardPelatihan
                image={item.image}
                title={item.title}
                titlePelatihan={item.titlePelatihan}
                description={item.description}
                harga={item.harga}
                styleCard="w-[317px] h-[450px]"
                styleImage="rounded-tl-[10px] bg-cover w-full rounded-tr-[10px] h-[235px]"
              />
            </div>
          ))}
        </div>
      <PaginationComp />
      </div>
      <Footer />
    </>
  )
}

export default PusatPengetahuan
