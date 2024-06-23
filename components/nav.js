import Link from "next/link"
import Image from 'next/image'
import { BsFillGridFill } from "react-icons/bs"
import { FaPlus, FaList } from "react-icons/fa"
import { FaRightFromBracket } from "react-icons/fa6"
import { useEffect, useState } from "react"
import { useSession,signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

export function Nav() {
    const session = useSession()
    function handleClick() {
        signOut({callbackUrl:'http://localhost:3000/signup'})
    }
    return (
        <nav className="duration-1000 group/nav w-fit h-screen w-50 border-solid items-center border-black border-r-4 p-4 flex flex-col overflow-x-hidden">
            <Link href="/dashboard">
                <Image
                    src="/logo-tasklify.svg"
                    width={0}
                    height={0}
                    alt="logo tasklify"
                    priority={false}
                    className="m-auto w-[40px] h-auto"
                />
            </Link>
            <Link href="/dashboard/add" className="group hover:bg-black py-3 px-4 rounded mt-4">
                <div className="flex items-center">
                    <FaPlus className="w-8 h-8 inline-block group-hover:text-white"/>
                    <div className="text-lg group-hover:text-white w-0 opacity-0 group-hover/nav:ml-2 group-hover/nav:opacity-100 group-hover/nav:w-24 inline duration-500">New</div>
                </div>
            </Link>
            <Link href="/dashboard/overview" className="group hover:bg-black py-3 px-4 rounded mt-4">
                <div className="flex items-center">
                    <BsFillGridFill className="w-8 h-8 inline-block group-hover:text-white"/>
                    <div className="text-lg group-hover:text-white w-0 opacity-0 group-hover/nav:ml-2 group-hover/nav:opacity-100 group-hover/nav:w-24 inline duration-500">Overview</div>
                </div>
            </Link>
            <Link href="/dashboard/task" className="group hover:bg-black py-3 px-4 rounded mt-4">
                <div className="flex items-center">
                    <FaList className="w-8 h-8 inline-block group-hover:text-white"/>
                    <div className="text-lg group-hover:text-white w-0 opacity-0 group-hover/nav:ml-2 group-hover/nav:opacity-100 group-hover/nav:w-24 inline duration-500">Task</div>
                </div>
            </Link>
            <button onClick={handleClick} className="group hover:bg-black py-3 px-4 rounded mt-4">
                <div className="flex items-center">
                    <FaRightFromBracket className="w-8 h-8 inline-block group-hover:text-white"/>
                    <div className="text-lg group-hover:text-white w-0 opacity-0 group-hover/nav:opacity-100 group-hover/nav:w-24 inline duration-500">SignOut</div>
                </div>
            </button>
            <Link href="/dashboard/profile" className="group hover:bg-black py-3 px-4 rounded mt-4">
                <div className="flex items-center">
                    <Image
                        src={session?.data?.user?.image}
                        width={50}
                        height={50}
                        alt="profile"
                        priority={false}
                        className="rounded-full border-black border-4 border-solid"
                    />
                    <div className="text-lg group-hover:text-white w-0 opacity-0 group-hover/nav:ml-2 group-hover/nav:opacity-100 group-hover/nav:w-24 inline duration-500 truncate">{session?.data?.user?.name}</div>
                </div>
            </Link>
        </nav>
    )
}