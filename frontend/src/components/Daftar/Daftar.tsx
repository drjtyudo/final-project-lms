import React, { useState } from 'react'
import { Button, Modal, Form } from 'antd'
import InputCommon from 'components/Input/InputCommon'
import InputPassword from 'components/Input/InputPassword'
import InputSubmit from 'components/Input/InputSubmit'
import InputCountry from 'components/Input/InputCountry'
import Link from 'next/link'

function Daftar() {
  const [visible, setVisible] = useState(false)
  const showModal = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    nama_lengkap: '',
    no_telp: '',
    re_password: '',
    ttl: '',
  })
  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const Icon = {
    backgroundImage: "url('./static/Icons/Icon-face.png')",
  }
  return (
    <div>
      <button onClick={showModal}>Daftar</button>
      <Modal
        className="w-[707px] h-[707px] mt-[-5px]"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="container px-4 flex flex-col justify-center items-center">
          <div className="flex items-center mt-2">
            <p className="mr-auto text-4xl">Daftar</p>
          </div>
          <div
            className="rounded-full w-[190px] h-[190px] bg-no-repeat bg-contain"
            style={Icon}
          />
          <div>
            <Form>
              <InputCommon
                type="text"
                name="nama_lengkap"
                required
                label="Nama Lengkap"
                placeholder="Masukkan Nama Lengkap Anda"
                className="w-full h-[40px] rounded-[8px]"
                messages="Nama Lengkap belum diisi"
                value={formValues.nama_lengkap}
                onChange={(e) =>
                  handleInputChange('nama_lengkap', e.target.value)
                }
              />
              <InputCommon
                type="email"
                name="email"
                required
                label="Email"
                placeholder="Masukkan Email Anda"
                className="w-full h-[40px] rounded-[8px]"
                messages="Email belum diisi"
                value={formValues.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <InputCommon
                type="number"
                name="telp"
                required
                label="No Telephone"
                placeholder="Masukkan No Telephon Anda"
                className="w-full h-[40px] rounded-[8px]"
                messages="No Telephon belum diisi"
                value={formValues.no_telp}
                onChange={(e) => handleInputChange('telp', e.target.value)}
              />
              <InputCommon
                type="date"
                name="ttl"
                required
                label="Tanggal Lahir"
                placeholder=""
                className="w-full h-[40px] rounded-[8px]"
                messages="Tanggal Lahir belum diisi"
                value={formValues.ttl}
                onChange={(e) => handleInputChange('ttl', e.target.value)}
              />
              <InputCountry />
              <InputPassword
                name="password"
                required
                label="Password"
                placeholder="Masukkan Password Anda"
                className="w-full h-[40px] rounded-[8px]"
                messages="Password belum diisi"
                value={formValues.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
              <InputPassword
                name="re-password"
                required
                label="Konfirmasi Password"
                placeholder="Masukkan KOnfirmasi Password Anda"
                className="w-full h-[40px] rounded-[8px]"
                messages="Konfirmasi Password belum diisi"
                value={formValues.re_password}
                onChange={(e) =>
                  handleInputChange('re_password', e.target.value)
                }
              />
              <InputSubmit
                className="mx-[138px] w-[353px] text-[#fff] bg-[#204D84] font-[600] h-[44px] mt-[35px] rounded-lg cursor-pointer hover:outline-blue-400"
                value="Daftar"
              />
            </Form>
          </div>
          <div className="createAcc text-center mt-[48px] md:mt-[41px]">
            <h2 className="text-[#484C57] font-[400px] text-[12px] leading-[18px] ">
              Sudah punya akun? Silahkan <span />
              <Link href="./login" className="text-[#204D84] font-[600px]">
                login di sini
              </Link>
            </h2>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default Daftar
