import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

function Footer() {
  const iconStyle = {
    fontSize: '30px', // Ubah ukuran sesuai keinginan Anda
    color: 'white', // Ubah warna sesuai keinginan Anda
  }

  return (
    <footer className="text-left pt-[17px] bg-[#10455B] text-white">
      <ul className="flex justify-evenly">
        <li>
          <h1 className="font-bold text-xl mb-4">NusaKMS</h1>
          <p className="mb-2 text-[14px]">2022 NusaKMS</p>
          <p className="mb-2 text-[14px]">All rights reserved</p>
          <p>PT. Solusi Teknologi Nusantara</p>
        </li>
        <li>
          <h1 className="font-bold text-xl mb-4">About</h1>
          <p className="mb-2 text-[14px]">Privacy Policy</p>
          <p className="mb-2 text-[14px]">Help Center</p>
          <p>Terms & Condition</p>
        </li>
        <li>
          <h1 className="font-bold text-xl mb-4">Services</h1>
          <p className='text-[14px]'>Check Certificate</p>
        </li>
        <li>
          <h1 className="font-bold text-xl mb-4">Follow Us on</h1>
          <ul className="flex gap-2">
            <li>
              <FacebookOutlined style={iconStyle} />
            </li>
            <li>
              <InstagramOutlined style={iconStyle} />
            </li>
            <li>
              <TwitterOutlined style={iconStyle} />
            </li>
            <li>
              <YoutubeOutlined style={iconStyle} />
            </li>
          </ul>
        </li>
        <li>
          <h1 className="font-bold text-xl mb-4">Download NusaLMS Mobile</h1>
          <ul className="flex justify-between">
            <li>
              <Button className="text-white text-[14px] text-center w-[120px] h-[30px] flex items-center justify-center">
                Play store
              </Button>
            </li>
            <li>
              <Button className="text-white text-[14px] text-center w-[120px] h-[30px] flex items-center justify-center">
                App store
              </Button>
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
