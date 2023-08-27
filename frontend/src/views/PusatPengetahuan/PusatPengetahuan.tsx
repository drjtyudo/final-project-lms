import SidebarFilter from 'components/SidebarFilter/SidebarFilter'
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

  const [filteredCategories, setFilteredCategories] = useState<string[]>([])

  const handleCategoryChange = (selectedCategories: string[]) => {
    setFilteredCategories(selectedCategories)
    // Di sini Anda dapat mengupdate data atau melakukan filter data dengan kategori yang dipilih.
  }

  return (
    <>
      <NavigationBar />
      <div className="grid grid-cols-2 gap-4">
        <SidebarFilter
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </>
  )
}

export default PusatPengetahuan
