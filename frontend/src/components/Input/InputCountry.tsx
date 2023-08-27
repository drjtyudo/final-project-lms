import React, { useState } from 'react'
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from 'react-country-region-selector'

function InputCountry() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')

  const handleCountryChange = (val) => {
    setSelectedCountry(val)
    setSelectedRegion('')
  }

  const handleRegionChange = (val) => {
    setSelectedRegion(val)
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block mb-4 text-[#404258] text-[17px]"
        >
          Negara
        </label>
        <CountryDropdown
          id="country"
          className="border border-gray-300 rounded p-2 w-full"
          value={selectedCountry}
          onChange={handleCountryChange}
          valueType="short"
        />
      </div>
      {selectedCountry && (
        <div className="mb-4">
          <label htmlFor="region" className="block mb-4 text-[#404258] text-[17px]">
            Domisili
          </label>
          <RegionDropdown
            id="region"
            country={selectedCountry}
            className="border border-gray-300 rounded p-2 w-full"
            value={selectedRegion}
            onChange={handleRegionChange}
            disableWhenEmpty
            countryValueType="short"
            blankOptionLabel="Pilih Wilayah"
            showDefaultOption
            defaultOptionLabel="Semua Wilayah"
            countryOptions={CountryRegionData}
          />
        </div>
      )}
    </div>
  )
}

export default InputCountry
