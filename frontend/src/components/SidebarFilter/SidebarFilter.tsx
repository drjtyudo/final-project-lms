import React, { useState } from 'react'

interface SidebarFilterProps {
  categories: string[]
  onCategoryChange: (selectedCategories: string[]) => void
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  categories,
  onCategoryChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleCategoryChange = (category: string) => {
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
      <div className="fix w-80 h-full bg-[#10455B] pt-[70px] px-[23px] fixed -z-10">
        <h2 className="text-[#fff] text-[24px] font-bold mb-[17px]">Filter</h2>
        <ul className="mx-[50px]">
          <li
            className="text-white mb-[27px] cursor-pointer flex items-center"
            onClick={toggleDropdown}
          >
            <span className="pr-[120px]">Kategori</span>{' '}
            {isDropdownOpen ? 'v' : '>'}
          </li>
          {isDropdownOpen && (
            <ul>
              {categories.map((category) => (
                <li key={category} className="text-white mb-8">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-5 h-5" // Menggunakan kelas sesuai dengan Tailwind CSS
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

export default SidebarFilter
