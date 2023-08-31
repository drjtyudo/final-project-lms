import { Button } from 'antd'
import Cards from 'components/Cards/Cards'
import SidebarFilter from 'components/SidebarFilter/SidebarFilter'
import NavigationBar from 'layouts/containers/Public/Navbar'
import React, { useState } from 'react'

function KategoriPelatihan() {
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
  return (
    <>
      <NavigationBar />
      <div className="mx-[370px]">
        <div className="flex gap-x-5 border-none">
          <Button className="rounded-3xl px-6 mt-[22px]">sort</Button>
          <Button className="rounded-3xl px-6 mt-[22px]">Reset</Button>
        </div>
        {/* <Cards.CardPelatihan
          image="./static/Content/kategori.png"
          title="Frontend Developer"
          titlePelatihan=""
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum."
        /> */}
      </div>
    </>
  )
}

export default KategoriPelatihan
