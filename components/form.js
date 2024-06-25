'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from './button'
import Image from 'next/image'

export function Form({head, content}) {
    // transition
    const [isPending, setPending] = useState(false)
    // reducer data
    const [data, setData] = useState({})
    // reducer info
    const [info, setInfo] = useState('')
    // router
    const router = useRouter()
    // menangani input
    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setData(values => ({...values, [name] : value, provider : 'credentials'}))
    }
    // menangani submit
    async function handleSubmit(e) {
        e.preventDefault()
        setPending(true)
        // menangani input kosong
        const values = Object.values(data)
        let empty = false
        values.forEach(e => {
            if (e === '') empty = true
        })
        if (values.length < content.length || empty) {
            setInfo('Some fields are empty')
            setPending(false)
            return
        } 
        // menangani sign in
        if (head === 'Sign in') {
            // check benar
            const res = await fetch('api/signin', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'aplication/json'
                },
                body : JSON.stringify(data)
            })
            const user = await res.json()
            // jika benar
            if (user.correct) {
                const res = await signIn('credentials', {
                    redirect : false,
                    email : data.email,
                    password : data.password,
                })
                setPending(false)
                if (res.ok) {
                    setPending(false)
                    router.replace('/dashboard/overview')
                } else {
                    setPending(false)
                    setInfo('failed to sign in')
                }
            } else {
                setPending(false)
                setInfo('Email or Password Incorrect')
                e.target.reset()
            }
        } else if (head === 'Sign up') {
            // menangani sign up
            try {
                // cek user exist
                const res =  await fetch('api/userexist', {
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'aplication/json'
                        },
                        body : JSON.stringify(data)
                    })
                const user = await res.json()
                // jika user exist
                if (user.exist) {
                    setPending(false)
                    setInfo('User already exist')
                    return
                } else {
                    const res = await fetch('api/signup', {
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'aplication/json'
                        },
                        body : JSON.stringify(data)
                    })
                    setPending(false)
                    if (res.ok) {
                        router.push('/')
                    } else {
                        setInfo('failed to sign up')
                    }
                }
            } catch (error) {
                console.error('Sign up failed', error)
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Image
                    src="/logo-tasklify.svg"
                    width={0}
                    height={0}
                    alt="logo tasklify"
                    priority={false}
                    className="m-auto w-[70px] h-auto"
                />
                <h2 className='text-3xl my-10 text-center'>{`${head} to Tasklify`}</h2>
                {content.map(el => (
                    <div className='relative my-4' key={el.id}>
                        <div className='bg-black rounded-full -translate-x-1 translate-y-1 py-1 px-4 w-full'>el.name</div>
                        <input disabled={isPending} className='disabled:bg-white border-2 py-1 px-4 border-solid border-black rounded-full placeholder-black outline-none top-0 right-0 left-0 bottom-0 absolute' name={el.id} onChange={handleChange} placeholder={el.name} id={el.id} type={el.type}/>
                    </div>
                ))}
                <p className='text-sm mb-4'>{info}</p>
                <p href='' className='text-end text-sm mb-4 text-blue-700'><a href=''>forgot password?</a></p>
                <Button
                    name={head === 'Sign in' ? 'Sign in' : 'Sign up'}
                    bgColor="bg-[#56F35D]"
                    type="submit"
                    isPending={isPending}
                />
                <div className='w-full mt-4 mb-2 h-10 flex items-center justify-center'>
                    <div className='w-full h-[0.2rem] bg-black'></div>
                    <p className='bg-[#F5F5F5] px-2 w-fit absolute text-sm'>or continue with</p>
                </div>
                <Button
                    name="Google"
                    bgColor="bg-[#54CCFF]"
                    type="button"
                    isPending={isPending}
                />
                <p className='text-sm mt-6 text-center'>{ head === 'Sign in' ? "don't have an account? ": "already have an account? " }
                    <Link className='text-blue-700' href={head === 'Sign in' ? '/signup' : '/'}>{ head === 'Sign in' ? "Sign up ": "Sign in" }</Link>
                </p>
            </form>
        </div>
    )
}