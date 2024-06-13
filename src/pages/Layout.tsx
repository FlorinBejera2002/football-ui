import { Outlet } from 'react-router-dom'

import { IoIosFootball } from 'react-icons/io'
import { Avatar, Navbar } from 'flowbite-react'

export const Layout = () => {
  return (
    <div className="container">
      <Navbar className="bg-gray-200 w-screen">
        <Navbar.Brand>
          <IoIosFootball color="black" size={35} />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Football-app
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded={true}
          />

          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link className="text-base" href="/">
            Home
          </Navbar.Link>
          <Navbar.Link className="text-base" href="/newplayer">
            Add Player
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
    </div>
  )
}
