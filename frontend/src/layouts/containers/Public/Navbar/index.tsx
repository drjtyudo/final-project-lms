import React from 'react'
import { Layout, Menu, Select, Typography, Image, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Search } from 'components/Search'
import Login from 'pages/login'

const { Header } = Layout

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}

const handleSearch = (value: string) => {
  console.log('Search keyword:', value)
}

const profileMenu = (
  <Menu>
    <Menu.Item key="dashboard">
      <a href="/dashboad">Dashboard</a>
    </Menu.Item>
    <Menu.Item key="pelatihanSaya">
      <a href="/pelatihanSaya">Pelatihan Saya</a>
    </Menu.Item>
    <Menu.Item key="sertifikat">
      <a href="/sertifikat">Sertifikat</a>
    </Menu.Item>
    <Menu.Item key="logout">
      <a href="/logout">Logout</a>
    </Menu.Item>
  </Menu>
)

function NavigationBar() {
  return (
    <>
      <Layout className="layout py-2 border-b-2">
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
                defaultSelectedKeys={['2']}
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
                  <Login />
                  {/* <Dropdown
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
                </Dropdown> */}
                </div>
              </div>
            </div>
          </Header>
      </Layout>
    </>
  )
}

export default NavigationBar
