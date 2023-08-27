import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Space, Button } from 'antd'
import NavigationBar from 'layouts/containers/Public/Navbar'
import Footer from 'layouts/containers/Public/Footer'
import { ModulComp } from 'components/Modul/ModulComp'
import Komentar from 'components/Review/komentar'
import { useRouter } from 'next/router'

interface PelatihanData {
  id: number;
  image: string;
  url: string;
  judul: string;
  harga: string;
  deskripsi: string;
  watching: number;
  dibuat_oleh: string;
  untuk: string;
  createdAt: string;
  updatedAt: string;
  Kategoris: any[]; // Adjust this type as needed
}

function BeliPengetahuan() {
  const router = useRouter();
  const [pelatihan, setPelatihan] = useState<PelatihanData | null>(null);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getPelatihan();
    }
  }, [id]);

  const getPelatihan = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/pelatihan/${id}`);
      setPelatihan(response.data.response);
    } catch (error) {
      console.log('Error fetching data:', error);
      console.log('Response status:', error.response?.status);
      console.log('Response data:', error.response?.data);
      // Set an error state or handle the error as needed
    }
  };
  

  const list = ['Item 1', 'Item 2', 'Item 3'];

  if (pelatihan === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavigationBar />
      <div className="flex mt-[32px] mx-[52px]">
        <div className="w-[1440px] ">
          <h1 className="text-[35px] mb-[26px]">Detail Pelatihan</h1>
          <div className="w-[965px] px-4">
            <h1 className="text-[35px] mb-[26px]">{pelatihan.judul}</h1>
            <p>{pelatihan.deskripsi}</p>
            <div className="mt-[44px] mb-[13px]">
              <h5>Konten Preview</h5>
              <div className="w-[full] flex">
                <div>
                  <ModulComp />
                </div>
                <div className="w-full bg-gray-100 mr-4"></div>
              </div>
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
          <div className="mt-[21px]">
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
                  <span className="ml-auto font-bold">Rp 100.000,-</span>
                </p>
                <Button className="w-full mt-4">Beli Sekarang</Button>
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
