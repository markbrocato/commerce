import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo } from '@components/ui'
import { Searchbar, UserNav } from '@components/core'
const { Prefetch } = require('@xdn/react')

interface Props {
  className?: string
}

const Navbar: FC<Props> = ({ className }) => {
  const rootClassName = className

  return (
    <div className={rootClassName}>
      <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
        <div className="flex flex-1 items-center">
          <Link href="/" passHref>
            <Prefetch>
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Prefetch>
          </Link>
          <nav className="space-x-4 ml-6 hidden lg:block">
            <Link href="/" passHref>
              <Prefetch>
                <a className={s.link}>All</a>
              </Prefetch>
            </Link>
            <Link href="/search?q=clothes">
              <Prefetch url="/api/bigcommerce/catalog/products?search=clothes">
                <a className={s.link}>Clothes</a>
              </Prefetch>
            </Link>
            <Link href="/search?q=accesories">
              <Prefetch url="/api/bigcommerce/catalog/products?search=accesories">
                <a className={s.link}>Accessories</a>
              </Prefetch>
            </Link>
          </nav>
        </div>

        <div className="flex-1 justify-center hidden lg:flex">
          <Searchbar />
        </div>

        <div className="flex flex-1 justify-end space-x-8">
          <UserNav />
        </div>
      </div>

      <div className="flex pb-4 lg:px-6 lg:hidden">
        <Searchbar id="mobileSearch" />
      </div>
    </div>
  )
}

export default Navbar
