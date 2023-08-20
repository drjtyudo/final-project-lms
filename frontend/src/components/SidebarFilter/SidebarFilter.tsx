import Input from 'antd/es/input/Input'
import React, { useState } from 'react'

export default function SidebarFilter({ categories, onCategoryChange }) {
 const [selectedCategories, setSelectedCategories] = useState([])
 const [isDropdownOpen, setIsDropdownOpen] = useState(false)

 const toggleDropdown = () => {
   setIsDropdownOpen(!isDropdownOpen)
 }

 const handleCategoryChange = (category) => {
   const updatedCategories = [...selectedCategories]
   if (updatedCategories.includes(category)) {
     updatedCategories.splice(updatedCategories.indexOf(category), 1)
   } else {
     updatedCategories.push(category)
   }
   setSelectedCategories(updatedCategories)
   onCategoryChange(updatedCategories)
 }

  return (
    <div className="fix w-80 h-[1080px] bg-[#10455B] pt-[70px] px-[23px]">
      <h2 className="text-[#fff] text-[24px] font-bold mb-[17px]">Filter</h2>
      <ul className="mx-[50px]">
        <li
          className="text-white mb-[27px] cursor-pointer flex items-center"
          onClick={toggleDropdown}
        >
          <span className="pr-[120px]">Kategori</span> {isDropdownOpen ? 'v' : '>'}
        </li>
        {isDropdownOpen && (
          <ul>
            {categories.map((category) => (
              <li key={category} className="text-white mb-8">
                <label className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-9 h-8" // Menggunakan kelas sesuai dengan Tailwind CSS
                  />
                  <span>{category}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  )
}



// cara pake component di file lain
// 1. taruh ini di anuin(antar function & return)
// const categories = [
//   'Kategori 1',
//   'Kategori 2',
//   'Kategori 3',
//   'kategori 4',
//   'kategoti 5',
// ]
// const [filteredCategories, setFilteredCategories] = useState([])

// const handleCategoryChange = (selectedCategories) => {
//   setFilteredCategories(selectedCategories)
//   // Di sini Anda dapat mengupdate data atau melakukan filter data dengan kategori yang dipilih.
// }

// 2. tinggal pake atur" da sudah besar ya
// <SidebarFilter
//   categories={categories}
//   onCategoryChange={handleCategoryChange}
// />