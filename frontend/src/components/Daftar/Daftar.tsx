import React, { useState } from 'react'
import { Button, Modal, Form, Image } from 'antd'
import InputCommon from 'components/Input/InputCommon'
import InputPassword from 'components/Input/InputPassword'
import InputSubmit from 'components/Input/InputSubmit'
import InputCountry from 'components/Input/InputCountry'
import Link from 'next/link'
import axios from 'axios'

function Daftar() {
  const register = async () => {
    try {
      const newUser = await axios.post('http://localhost:8000/users/regist', {
        fullname: formValues.fullname,
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
        nomor_telp: formValues.nomor_telp,
        tggl_lahir: formValues.tggl_lahir,
        negara: formValues.negara,
        domisili: formValues.domisili,
      })

      console.log('Registration successful:', newUser)
    } catch (error) {
      console.log('Registration failed:', error)
    }
  }

  const [formValues, setFormValues] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    nomor_telp: '',
    tggl_lahir: '',
    negara: '',
    domisili: '',
  })
  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  return (
    <div className="mt-10">
      <div className="container  border-2 rounded-md w-[500px] p-2 mx-auto flex flex-col flex-wrap justify-center items-center">
        <div className="flex flex-col my-3">
          <p className="mx-auto text-[30px]">Daftar</p>
          <Image
            src="./static/icons/icon-face.png"
            width={150}
            preview={false}
          />
        </div>

        <Form className="w-[350px]" onSubmitCapture={register}>
          <InputCommon
            type="text"
            required
            name="fullname"
            messages="Nama lengkap belum diisi"
            label="Nama Lengkap"
            placeholder="Nama Lengkap"
            className="w-full p-2"
            onChange={(e) => handleInputChange('fullname', e.target.value)}
          />
          <InputCommon
            type="text"
            required
            name="email"
            messages="Email belum diisi"
            label="Email"
            placeholder="Email"
            className="w-full p-2"
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <InputCommon
            type="tel"
            required
            name="nomor_telp"
            messages="Nomor telepon belum diisi"
            label="Nomor Telepon"
            placeholder="Nomor telepon"
            className="w-full p-2"
            onChange={(e) => handleInputChange('nomor_telp', e.target.value)}
          />
          <InputCommon
            type="date"
            required
            name="tggl_lahir"
            messages="Tanggal lahir belum diisi"
            label="Tanggal Lahir"
            placeholder="Tanggal lahir"
            className="w-full p-2"
            onChange={(e) => handleInputChange('tggl_lahir', e.target.value)}
          />
          <InputCountry
            valueCountry={formValues.negara}
            valueRegion={formValues.domisili}
            onChangeCountry={(value) => handleInputChange('negara', value)}
            onChangeRegion={(value) => handleInputChange('domisili', value)}
          />
          <InputPassword
            required
            name="password"
            messages="Password belum diisi"
            label="Password"
            placeholder="Password"
            className="w-full p-2"
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
          <InputPassword
            required
            name="confirmPassword"
            messages="Confirm Password belum diisi"
            label="Confirm Password"
            placeholder="Confirm password"
            className="w-full p-2"
            onChange={(e) =>
              handleInputChange('confirmPassword', e.target.value)
            }
          />
          <InputSubmit
            className="w-[353px] h-[44px] mt-[35px] rounded-lg bg-[#204D84] text-white font-semibold cursor-pointer"
            value="Daftar"
          />
        </Form>

        <div className="createAcc text-center mt-[48px] md:mt-[41px]">
          <h2 className="text-[#484C57] font-[400px] text-[12px] leading-[18px] ">
            Sudah punya akun? Silahkan <span />
            <Link href="/" className="text-[#204D84] font-[600px]">
              login di sini
            </Link>
          </h2>
        </div>
      </div>
    </div>
  )
}
export default Daftar
