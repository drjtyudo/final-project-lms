import React, { useEffect, useState } from 'react'
import { Layout, Menu, Select, Image, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Search } from 'components/Search'
import Login from 'pages/login'
import axios from 'axios'
import Link from 'next/link'
import jwt_decode from 'jwt-decode'

const { Header } = Layout

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}

const handleSearch = (value: string) => {
  console.log('Search keyword:', value)
}

function NavigationBar() {
  const [token, setToken] = useState()
  const [expire, setExpire] = useState()

  useEffect(() => {
    refreshToken()
  }, [])

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:8000/token', {
        withCredentials: true,
      })
      setToken(response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken)
      console.log(decoded)
      setExpire(decoded.exp)
    } catch (error) {
      if (error.response) {
        setToken(null)
      }
    }
  }

  axios.interceptors.request.use(async (config) => {
    const currentDate = new Date()
    if (expire * 1000 < currentDate.getTime()) {
      try {
        const response = await axios.get('http://localhost:8000/token', {
          withCredentials: true,
        })

        const newConfig = { ...config }
        newConfig.headers.Authorization = `Bearer ${response.data.accessToken}`
        return newConfig
      } catch (error) {
        console.error('Error fetching new token:', error)
      }
    }
    return config
  })

  const Logout = async () => {
    try {
      await axios.get('http://localhost:8000/users/logout', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setToken(null)
      window.location.reload()
    } catch (error) {
      console.log('Logout failed:', error)
    }
  }

  const profileMenu = (
    <Menu>
      <Menu.Item key="dashboard">
        <Link href="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="pelatihanSaya">
        <Link href="/pelatihanSaya">Pelatihan Saya</Link>
      </Menu.Item>
      <Menu.Item key="sertifikat">
        <Link href="/sertifikat">Sertifikat</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <button onClick={Logout}>Logout</button>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Layout className="layout py-2 border-b-2 fixed w-full top-0 z-50">
        <Header className="flex bg-transparent items-center justify-between">
          <Image src="./static/lms-logo.svg" width={200} preview={false} />
          <Search
            className="w-[400px] border-2 mr-28"
            placeholder="Cari Pelatihan.."
            onSearch={handleSearch}
          />
          <div className="flex items-center  w-[400px] justify-between">
            <Menu
              className="bg-transparent mr-4"
              mode="horizontal"
              defaultSelectedKeys={['1']}
            >
              <Menu.Item key="1">Beranda</Menu.Item>
              <Menu.Item key="2">Pelatihan</Menu.Item>
            </Menu>
            <div className="flex items-center w-[200px] justify-evenly gap-5">
              <div>
                <Select
                  defaultValue="ID"
                  className="w-16"
                  onChange={handleChange}
                  options={[
                    { value: 'ID', label: 'ID' },
                    { value: 'ENG', label: 'ENG' },
                  ]}
                />
              </div>
              <Image
                width={27}
                preview={false}
                src="./static/icons/bel-icon.png"
                className="ml-2"
              />
              <div className="flex gap-2">
                {token ? (
                  <Dropdown
                    overlay={profileMenu}
                    trigger={['click']}
                    placement="bottomLeft"
                  >
                    <a
                      className="ant-dropdown-link ml-5 flex items-center gap-2"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Image
                        width={30}
                        preview={false}
                        src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                      />
                      <DownOutlined />
                    </a>
                  </Dropdown>
                ) : (
                  <Login />
                )}
              </div>
            </div>
          </div>
        </Header>
      </Layout>
    </>
  )
}

export default NavigationBar
