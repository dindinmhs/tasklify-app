import Link from "next/link"
import Image from 'next/image'
import { BsFillGridFill } from "react-icons/bs"
import { FaPlus, FaList } from "react-icons/fa"
import { FaRightFromBracket } from "react-icons/fa6"
import { useSession,signOut } from "next-auth/react"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"

export function Nav() {
    const session = useSession()
    const pathname = usePathname()
    const [path, setPath] = useState()

    useEffect(()=>{
        setPath(pathname)
    }, [pathname])

    function handleClick() {
        signOut({callbackUrl:'/signup'})
    }
    return (
        <nav className="bottom-0 w-screen md:w-fit z-20 bg-[#F5F5F5] group/nav md:h-screen fixed md:static justify-around md:justify-start border-solid items-center border-black md:border-r-4 border-t-4 md:border-t-0 md:p-4 flex md:flex-col overflow-x-hidden">
            <Link href="/dashboard/overview">
                <Image
                    src="/logo-tasklify.svg"
                    width={0}
                    height={0}
                    alt="logo tasklify"
                    priority={true}
                    className="m-auto w-[40px] h-auto md:block hidden"
                />
            </Link>
            <Link href="/dashboard/add" className={`${path === '/dashboard/add'? 'bg-black text-white' : 'bg-inherit text-black'} group hover:bg-black hover:text-white py-3 px-4 rounded md:mt-4`}>
                <div className="flex items-center">
                    <FaPlus className="w-8 h-8 inline-block"/>
                    <div className="text-lg hidden md:block w-24 ml-2">New</div>
                </div>
            </Link>
            <Link href="/dashboard/overview" className={`${path === '/dashboard/overview'? 'bg-black text-white' : 'bg-inherit text-black'} group hover:bg-black hover:text-white py-3 px-4 rounded md:mt-4`}>
                <div className="flex items-center">
                    <BsFillGridFill className="w-8 h-8 inline-block"/>
                    <div className="text-lg hidden md:block w-24 ml-2">Overview</div>
                </div>
            </Link>
            <Link href="/dashboard/task" className={`${path === '/dashboard/task'? 'bg-black text-white' : 'bg-inherit text-black'} group hover:bg-black hover:text-white py-3 px-4 rounded md:mt-4`}>
                <div className="flex items-center">
                    <FaList className="w-8 h-8 inline-block"/>
                    <div className="text-lg hidden md:block w-24 ml-2">Task</div>
                </div>
            </Link>
            <button onClick={handleClick} className={`group hover:bg-black py-3 px-4 rounded md:mt-4`}>
                <div className="flex items-center">
                    <FaRightFromBracket className="w-8 h-8 inline-block group-hover:text-white"/>
                    <div className="text-lg group-hover:text-white hidden md:block w-24 group-hover/nav:opacity-100">SignOut</div>
                </div>
            </button>
            <Link href="/dashboard/profile" className={`${path === '/dashboard/profile'? 'bg-black text-white' : 'bg-inherit text-black'} group hover:bg-black py-3 px-4 rounded md:mt-4`}>
                <div className="flex items-center">
                    <Image
                        src={session?.data?.user?.image||'/profile-default.jpg'}
                        width={50}
                        height={50}
                        alt="profile"
                        priority={true}
                        className="rounded-full border-black border-4 border-solid"
                    />
                    <div className="text-lg group-hover:text-white hidden md:block w-24 ml-2 truncate">{session?.data?.user?.name}</div>
                </div>
            </Link>
        </nav>
    )
}