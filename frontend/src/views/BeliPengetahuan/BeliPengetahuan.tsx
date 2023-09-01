import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Space, Button } from 'antd'
import NavigationBar from 'layouts/containers/Public/Navbar'
import Footer from 'layouts/containers/Public/Footer'
import { ModulComp } from 'components/Modul/ModulComp'
import Komentar from 'components/Review/komentar'
import { useRouter } from 'next/router'
import Content from 'components/contentPreview/content'
import Link from 'next/link'

function BeliPengetahuan() {
  const router = useRouter()
  const { id } = router.query

  console.log('Router Query:', router.query)
  const [pelatihan, setPelatihan] = useState({})
  const [selectedSubmodule, setSelectedSubmodule] = useState(0)

  useEffect(() => {
    if (id) {
      getPelatihan()
    }
  }, [id])

  const getPelatihan = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/pelatihan/${id}`)
      console.log('Axios Response:', response)
      setPelatihan(response.data.pelatihan)
    } catch (error) {
      console.log('Error fetching data:', error)
      console.log('Response data:', error.response?.data)
    }
  }

  const handleSubmoduleClick = (submoduleIndex) => {
    setSelectedSubmodule(submoduleIndex)
  }

  return (
    <div>
      <NavigationBar />
      <div className="flex mt-[100px] mx-[52px]">
        <div className="w-[1440px] ">
          <h1 className="text-[35px] mb-[26px]">Detail Pelatihan</h1>
          <div className="w-[965px] px-4">
            <h1 className="text-[23px] mb-[26px]">{pelatihan.judul}</h1>
            <p className="text-[20px] font-bold">Tentang Pelatihan</p>
            <p className="text-justify">{pelatihan.deskripsi}</p>
            <p className="text-[20px] font-bold">Level: {pelatihan.level}</p>
            <div className="mt-[44px] mb-[13px] border-4 p-7 rounded-md">
              <h5>Konten Preview</h5>
              <div className="w-[full] flex">
                <div>
                  <ModulComp onSubmoduleClick={handleSubmoduleClick} />
                </div>
                {selectedSubmodule === 0 && <Content.contentSub1 />}
                {selectedSubmodule === 1 && <Content.contentSub2 />}
              </div>
            </div>
            <h5 className="mt-[51px]">Target Audiens</h5>
            <p>Internal NusaLMS</p>
            <h5 className="mt-[43px]">Kategori</h5>
            <p>
              {pelatihan && pelatihan.kategori
                ? pelatihan.kategori.map((kategori, index) => (
                    <span key={index}>
                      {kategori.kategori}
                      {index !== pelatihan.kategori.length - 1 ? ', ' : ''}
                    </span>
                  ))
                : 'Tidak ada kategori'}
            </p>

            <h5 className="mt-[43px]">Masa berlaku lisensi</h5>
            <p>{pelatihan.masa_lisensi}</p>
            <div className="w-[965px] mt-[53px]">
              <h5>Ulasan</h5>
              <div className="h-[1px] w-full bg-black mb-4"></div>
              <div className="w-full h-[400px] mb-[52px]">
                <Komentar />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-[81px]">
            <Space direction="vertical" size={16}>
              <Card
                title={
                  <h3 style={{ fontSize: '24px', margin: '5px 0 0 0 ' }}>
                    Pembuat : {pelatihan.dibuat_oleh}
                  </h3>
                }
                style={{
                  width: 332,
                }}
              >
                {pelatihan && pelatihan.tanggal_terbit && (
                  <p className="px-1 text-[20px]">
                    Tanggal Dibuat : {pelatihan.tanggal_terbit.split('T')[0]}
                  </p>
                )}
              </Card>
            </Space>
          </div>
          <div className="mt-[21px]">
            <h5 className="ml-6">Yang Kamu dapatkan</h5>
            <Card
              style={{
                width: 332,
              }}
            >
              <ul className="list-disc px-[25px]">
                <li className="text-[16px]">
                  {pelatihan.totalDurasiString} menit total video pembelajaran
                </li>
                <li className="text-[16px]">
                  {pelatihan.bahanBacaan} bahan bacaan{' '}
                </li>
                <li className="text-[16px]">
                  {pelatihan.kontenUnduh} konten dapat diunduh{' '}
                </li>
                <li className="text-[16px]">Kuis yang dapat dikerjakan </li>
                <li className="text-[16px]">Sertifikat dapat diunduh</li>
              </ul>
            </Card>
          </div>
          <div className="mt-[26px]">
            <Space direction="vertical" size={16}>
              <Card
                title={
                  <h3 style={{ fontSize: '24px', margin: '5px 0 0 0 ' }}>
                    Transaksi
                  </h3>
                }
                style={{
                  width: 332,
                }}
              >
                  <p className="flex items-center justify-between px-1 text-[20px]">
                    Harga
                    <span className="ml-auto font-bold">
                      Rp {pelatihan.harga},-
                    </span>
                  </p>
                <Link href='/pembayaran'>
                <Button className="w-full mt-4">Beli Sekarang</Button>
                </Link>
              </Card>
            </Space>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BeliPengetahuan
