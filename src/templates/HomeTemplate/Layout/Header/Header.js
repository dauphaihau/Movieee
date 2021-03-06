import React, {Fragment, useEffect, useState} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import {ACCESS_TOKEN, history, USER_LOGIN} from "../../../../util/settings";
import _ from "lodash";
import {useSelector} from "react-redux";
import { Link} from 'react-scroll'

const navigation = [
    {name: 'Contact', href: 'footer', current: false},
    {name: 'News', href: 'news', current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {

    const [shadowHeader, setShadowHeader] = useState(false)
    const [current] = useState(false)

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 40) {
                setShadowHeader(true)
            } else {
                setShadowHeader(false)
            }
        }

        window.addEventListener('scroll', scrollListener)

        return () => {
            window.removeEventListener("scroll", scrollListener)
        }
    }, [])

    const {userLogin} = useSelector(state => state.UserReducer)

    const renderProfile = () => {
        if (_.isEmpty(userLogin)) {
            return <>
                <button
                    className='text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    onClick={() => {
                        history.push('/login')
                    }}
                >Sign in
                </button>
                <button
                    className='hidden md:block text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    onClick={() => {
                        history.push('/register')
                    }}
                >Sign up
                </button>
            </>
        }
        return <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({active}) => (
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                onClick={() => {
                                    history.push(`/setting/profile/${userLogin.taiKhoan}`)
                                }}
                            >
                                Profile
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                onClick={() => {
                                    localStorage.removeItem(USER_LOGIN);
                                    localStorage.removeItem(ACCESS_TOKEN);
                                    window.location.reload();
                                }}
                            >
                                Sign out
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    }

    return (
        <Disclosure as="nav" className={`z-10 bg-white
        ${shadowHeader ? 'shadow-2xl' : ''} 
         fixed w-full
         `}>
            {({open}) => (
                <>
                    <div className=" max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className={` ${shadowHeader ? 'shadow-2xl' : ''} 
                                     inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white `}>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center hidden md:block">
                                    <svg
                                        className="cursor-pointer w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg"
                                         xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px"
                                         y="0px"
                                         viewBox="0 0 225 225" style={{enableBackground: "new 0 0 225 225"}}
                                         xmlSpace="preserve">
                                        <style type="text/css"
                                               dangerouslySetInnerHTML={{__html: "\n.st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                "}}/>
                                        <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                                            <g>
                                                <path id="Layer0_0_1_STROKES" className="st0"
                                                      d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"/>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        <a
                                            key='Home' href='/'
                                            className={classNames(
                                                current ? ' text-black' : 'text-black hover:bg-black hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-medium'
                                            )}
                                            aria-current={current ? 'page' : undefined}
                                        >
                                            Home
                                        </a>
                                        {navigation.map((item) => (
                                            <Link
                                                spy={true} smooth={true} offset={50} duration={500}
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? ' text-black' : 'text-black hover:bg-black hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                {renderProfile()}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a
                                key='Home' href='/'
                                className={classNames(
                                    current ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white',
                                    'block px-3 py-2 rounded-md text-base font-medium'
                                )}
                                aria-current={current ? 'page' : undefined}
                            >
                                Home
                            </a>
                            {navigation.map((item) => (
                                <Link
                                    spy={true} smooth={true} offset={50} duration={500}
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.current ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
