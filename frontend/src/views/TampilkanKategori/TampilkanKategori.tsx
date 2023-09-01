import Cards from 'components/Cards/Cards'
import Footer from 'layouts/containers/Public/Footer'
import NavigationBar from 'layouts/containers/Public/Navbar'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function TampikanKategori() {
  const [kategori, setKategori] = useState([])

  useEffect(() => {
    getKategori()
  }, [])

  const getKategori = async () => {
    try {
      const data = await axios.get('http://localhost:8000/kategori')
      setKategori(data.data.response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <NavigationBar />
      <div className="h-screen p-[50px] mb-8 m-auto">
        <h1 className="text-[24px]">Kategori Pelatihan</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          condimentum aliquet arcu, sit amet eleifend tortor. Donec elementum
          enim quis ligula laoreet convallis.{' '}
        </p>
        <div>
          <div className="flex gap-10 flex-wrap  justify-center items-center">
            {kategori.map((data) => (
              <Cards.CardKategori
                image={data.url_image}
                title={data.kategori}
                titlePelatihan=""
                description={data.deskripsi}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
