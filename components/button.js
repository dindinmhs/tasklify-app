import { signIn } from "next-auth/react"

export function Button({type, bgColor, name, isPending, px}) {
    function handleClick(name) {
        if (name == 'Google' && type == 'button') {
            signIn("google",{callbackUrl:'/dashboard/overview'})
        } else {
            console.log('tes')
        }
    }
    return(
        <div className="relative">
            <div className={`${px} text-black bg-black rounded-full py-1 w-full -translate-x-1 translate-y-1`}>{name}</div>
            <button onClick={()=>handleClick(name)} disabled={isPending} className={`${bgColor} absolute top-0 right-0 left-0 py-[2px] rounded-full border-solid border-2 border-black active:-translate-x-1 active:translate-y-1 duration-200`} type={type}>{name}</button>
        </div>
    )
}