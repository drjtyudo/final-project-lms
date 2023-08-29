import React, { useState } from 'react'
import { Modal, Button, Form } from 'antd'
import InputCommon from 'components/Input/InputCommon'
import InputPassword from 'components/Input/InputPassword'
import InputSubmit from 'components/Input/InputSubmit'
import ButtonImg from 'components/Button/Button'
import Link from 'next/link'
import axios from 'axios'

function Login() {
  const [visible, setVisible] = useState(false)
  const showModal = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }

  const login = async () => {
    try {
      await axios.post('http://localhost:8000/users/login', {
        email: formValues.email,
        password: formValues.password,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
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
  const google = {
    backgroundImage: "url('./static/Icons/google.png')",
  }
  const facebook = {
    backgroundImage: "url('./static/Icons/facebook.png')",
  }
  return (
    <div>
      <button type="submit" onClick={showModal}>
        Login
      </button>
      <Modal
        className="w-[707px] h-[707px] mt-[-5px]"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="container px-4 flex flex-col justify-center items-center">
          <div className="flex items-center mt-2">
            <p className="mr-auto text-4xl">Login</p>
          </div>
          <div
            className="rounded-full w-[190px] h-[190px] bg-no-repeat bg-contain"
            style={Icon}
          />
          <div>
            <Form onSubmitCapture={login}>
              <InputCommon
                type="text"
                name="Email"
                required
                label="Email"
                placeholder="Masukkan Email Anda"
                className="w-full h-[40px] rounded-[8px]"
                messages="Email belum diisi"
                value={formValues.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
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
              <div className="forgotPw text-[#204D84] text-[12px] mt-[-10px] pt-3 font-Lexend font-[400px] leading-[18px]  text-right">
                <p className="mt-[-14px]">Lupa Password?</p>
              </div>
              <InputSubmit
                className="mx-[138px] w-[353px] text-[#fff] bg-[#204D84] font-[600] h-[44px] mt-[15px] rounded-lg cursor-pointer hover:outline-blue-400"
                value="Login"
              />
            </Form>
          </div>
          <div className="anyLogin mt-2">
            <div className="flex flex-row justify-center items-center">
              <hr className="w-[250px]" />
              <p className="mx-4 mt-[10px]">Atau</p>
              <hr className="w-[250px]" />
            </div>
            <div className="items-center buttonAnyLogin gap-7 flex flex-row">
              <ButtonImg text="Login Dengan Google" style={google} />
              <ButtonImg text="Login Dengan Facebook" style={facebook} />
            </div>
          </div>
          <div className="createAcc text-center mt-[52px]">
            <h2 className="text-[#484C57] font-[400px] text-[12px] leading-[18px]">
              Belum punya akun? Silahkan <span />
              <Link href="./daftar" className="text-[#204D84] font-[600px]">
                daftar di sini
              </Link>
            </h2>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Login
