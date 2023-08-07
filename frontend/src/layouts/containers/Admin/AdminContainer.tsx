import { PieChartOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './AdminContainer.module.scss'

const { Header, Content, Sider } = Layout

/**
 * TODO: refactor parameters
 */
function createMenu(label, key, icon?, children?: any, link?: any) {
  return {
    key,
    icon,
    children,
    label: link ? (
      <Link href={link}>
        <p style={{ margin: 0 }}>{label}</p>
      </Link>
    ) : (
      label
    ),
  }
}

const MENUS = [
  createMenu('Dashboard', 'admin', <PieChartOutlined />, null, '/admin'),
  createMenu('Users', 'users', <UserOutlined />, null, '/'),
]

function AdminContainer(props: any) {
  const { Component } = props
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    /**
     * You can handle Login Session actions here
     */
  }, [])

  return (
    <Layout id={styles.adminContainer} style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={classNames(styles.logo)}>LOGO</div>
        <Menu defaultSelectedKeys={['admin']} mode="inline" items={MENUS} />
      </Sider>

      <Layout className={styles['site-layout']}>
        <Header
          className={styles['site-layout-background']}
          style={{ padding: 0 }}
        />
        <Content style={{ marginRight: 32, marginLeft: 32, marginTop: 40 }}>
          <div
            className={styles['site-layout-background']}
            style={{ padding: 24, minHeight: 360 }}
          >
            <Component {...props} />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminContainer
