import React from 'react'
import { Card, Space, Button } from 'antd'
import NavigationBar from 'layouts/containers/Public/Navbar'
import Footer from 'layouts/containers/Public/Footer'

function BeliPengetahuan() {
  const list = ['Item 1', 'Item 2', 'Item 3']
  return (
    <div>
      <NavigationBar />
      <div className="flex mt-[32px] mx-[52px]">
        <div className="w-[1440px] ">
          <h1 className="text-[35px] mb-[26px]">Detail Pelatiahan</h1>
          <div className="w-[965px] px-4">
            <h5>Judul Pelatihan</h5>
            <p>Lorem ipsum dolor sit amet.</p>
            <h5 className="mt-[46px]">Tentang Pelatihan</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
              fugiat qui tempora non voluptatibus earum quo minus nemo,
              veritatis obcaecati voluptates asperiores aut temporibus nostrum
              voluptatum minima tempore reiciendis corrupti accusantium
              blanditiis nobis molestias adipisci! Dolore doloribus dolores
              eligendi, voluptatem cum consequatur perferendis, earum facilis
              similique autem voluptatum impedit provident.
            </p>
            <div className="mt-[44px] mb-[13px]">
              <h5>Konten Preview</h5>
              {/* Mba sabilah Modul */}
              <div className="w-[full] h-[515px] bg-gray-200"></div>
            </div>
            <h5 className="mt-[51px]">Target Audiens</h5>
            <p>Internal NusaLMS</p>
            <h5 className="mt-[43px]">Kategori</h5>
            <p>Kategori A, Kategori B</p>
            <h5 className="mt-[43px]">Masa berlaku lisensi</h5>
            <p>Selamanya</p>
            <div className="w-[965px] mt-[53px]">
              <h5>Ulasan</h5>
              <div className="h-[1px] w-full bg-black mb-4"></div>
              {/* Ulasan Mba sabilah */}
              <div className="w-full h-[400px] bg-gray-100 mb-[52px]"></div>
            </div>
          </div>
        </div>
        <div>
          <div className='mt-[81px]'>
            <Space direction="vertical" size={16}>
              <Card
                title={
                  <h3 style={{ fontSize: '24px', margin: '5px 0 0 0 ' }}>
                    Pembuat
                  </h3>
                }
                style={{
                  width: 332,
                }}
              >
                <p className="px-1 text-[20px]">Tanggal Dibuat : 20/20/21</p>
              </Card>
            </Space>
          </div>
          <div className='mt-[21px]'>
            <h5>Yang Kamu dapatkan</h5>
            <Card
              style={{
                width: 332,
              }}
            >
              <ul className="list-disc px-[25px]">
                {list.map((item, index) => (
                  <li className="text-[16px]" key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <div className='mt-[26px]'>
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
                  <span className="ml-auto font-bold">Rp 100.000,-</span>
                </p>
                <Button className="w-full mt-4">Beli Sekarang</Button>
              </Card>
            </Space>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default BeliPengetahuan
