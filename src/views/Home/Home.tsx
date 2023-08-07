import { Button } from 'antd'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './Home.module.scss'
import Footer from 'layouts/containers/Public/Footer'

function Home() {
  return (
    <>
      <div
        className={classNames(
          'bg-gray-100 min-h-screen flex-col justify-center items-center',
          styles['home-page'],
        )}
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website!</h1>
        <p className="text-lg mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p className="text-lg mb-8">
          {process.env.NEXT_PUBLIC_FRONTEND_URL || ''}
        </p>
        <p className="text-lg mb-8">
          {process.env.NEXT_PUBLIC_BACKEND_URL || ''}
        </p>
        <Link href="/admin">
          <Button>Go to Admin</Button>
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default Home
