import { Button } from 'antd'
import axios from 'axios'
import Cards from 'components/Cards/Cards'
import PaginationComp from 'components/Pagination/PaginationComp'
import SidebarFilter from 'components/SidebarFilter/SidebarFilter'
import Footer from 'layouts/containers/Public/Footer'
import NavigationBar from 'layouts/containers/Public/Navbar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function PusatPengetahuan() {
  const categories = [
    'Kategori 1',
    'Kategori 2',
    'Kategori 3',
    'Kategori 4',
    'Kategori 5',
  ]

  const [filteredCategories, setFilteredCategories] = useState([])

  const handleCategoryChange = (selectedCategories) => {
    setFilteredCategories(selectedCategories)
    // Di sini Anda dapat mengupdate data atau melakukan filter data dengan kategori yang dipilih.
  }

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
          {pelatihan.map((data, index) => (
            <Link
              key={data.id}
              href={`/beliPengetahuan?id=${data.id}`}
              passHref
            >
              <div
                key={index}
                className="w-[317px] border-gray-200 border-2 rounded-lg"
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
                  styleCard="w-[317px] h-[450px]"
                  styleImage="rounded-tl-[10px] bg-cover w-full rounded-tr-[10px] h-[235px]"
                />
              </div>
            </Link>
          ))}
        </div>
        <PaginationComp />
      </div>
      <Footer />
    </>
  )
}

export default PusatPengetahuan
