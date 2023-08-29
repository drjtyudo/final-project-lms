import React, { useState } from 'react'
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from 'react-country-region-selector'

interface InputCountryProps {
  valueCountry?: string
  valueRegion?: string
  onChangeCountry?: any
  onChangeRegion?: any
}

function InputCountry(props: InputCountryProps) {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')

  const handleCountryChange = (val) => {
    setSelectedCountry(val)
  }
  const handleRegionChange = (val) => {
    setSelectedRegion(val)
  }

  const { onChangeCountry, onChangeRegion, valueCountry, valueRegion } = props

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
          value={valueCountry}
          onChange={(val) => {
            handleCountryChange(val)
            onChangeCountry(val)
          }}
          valueType="short"
        />
      </div>
      {selectedCountry && (
        <div className="mb-4">
          <label
            htmlFor="region"
            className="block mb-4 text-[#404258] text-[17px]"
          >
            Domisili
          </label>
          <RegionDropdown
            id="region"
            country={selectedCountry}
            className="border border-gray-300 rounded p-2 w-full"
            value={valueRegion}
            onChange={(val) => {
              handleRegionChange(val)
              onChangeRegion(val)
            }}
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
