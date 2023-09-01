import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import { Button, Image } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Footer() {
  const iconStyle = {
    fontSize: '30px', // Ubah ukuran sesuai keinginan Anda
    color: 'white', // Ubah warna sesuai keinginan Anda
  }
  const [footer, setFooter] = useState([])
  const getFooter = async () => {
    try {
      const response = await axios.get('http://localhost:8000/footer')
      console.log(response.data.judulFooter)
      setFooter(response.data.judulFooter)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getFooter()
  }, [])

  return (
    <footer className="text-left pt-[25px] pb-[40px] bg-[#10455B]">
      <ul className="flex mx-[63px] justify-between text-white">
        {footer.map((data, index) => (
          <li key={index} className="flex flex-col">
            <h1 className="font-bold text-xl mb-4 text-white">
              {data.judul_footer}
            </h1>
            {data.Footers.map((dataSub, indexSub) => (
              <div key={indexSub}>
                <p className="mb-2 text-[14px] text-white">
                  {dataSub.nama_footer}
                </p>
              </div>
            ))}
            <div className="flex mt-[-40px]">
              {data.Footers.map((dataSub, indexSub) => (
                <div key={indexSub}>
                  {dataSub.image != null && (
                    <Link href={dataSub.link}>
                      <Image preview={false} src={dataSub.url} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
            {index === footer.length - 1 && (
              <div className="mt-[20px]">
                <ul className="flex justify-between">
                  <Link href={data.Footers[0].link}>
                    <Button className="text-white text-[14px] text-center w-[120px] h-[30px] flex items-center justify-center">
                      Play store
                    </Button>
                  </Link>
                  <Link href={data.Footers[1].link}>
                    <Button className="text-white text-[14px] text-center w-[120px] h-[30px] flex items-center justify-center">
                      App store
                    </Button>
                  </Link>
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </footer>
  )
}

export default Footer
