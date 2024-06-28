'use client'
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Overview } from "@/components/overview";
import { New } from "@/components/new";
import { Task } from "@/components/task";




export default function Home() {
  const [hash, setHash] = useState('');
  const pathName = usePathname();
  const [data, setData] = useState()
  const [task, setTask] = useState()
  

  useEffect(() => {
    setHash(pathName)
  }, [pathName]);

  const session = useSession()
  async function fetchData() {
    if (session?.data?.user) {
      // fetch user
      const res = await fetch('/api/getdata', {
        method : 'POST',
        headers : {
            'Content-Type' : 'aplication/json'
        },
        body : JSON.stringify(session.data.user)
      })
      if (res.ok) {
        const user = await res.json();
        setData(user)
      } else {
        console.error('Failed to fetch data');
      }
    }
  }
  async function fetchTask() {
    if (data) {
      const res = await fetch('/api/getTask', {
        method : 'POST',
        headers : {
            'Content-Type' : 'aplication/json'
        },
        body : JSON.stringify({user_id : data?._id})
      })
      if (res.ok) {
        const task = await res.json();
        setTask(task)
      } else {
        console.error('Failed to fetch data');
      }
    }
  }
  useEffect(()=>{
    fetchData()
  },[session])
  useEffect(()=>{
    fetchTask()
  },[data])

  // Determine which component to render based on the hash value
  const renderContent = () => {
    switch (hash) {
      case '/dashboard/overview':
        return <Overview tasks={task}/>;
      case '/dashboard/add':
        return <New user={data}/>;
      case '/dashboard/task':
        return <Task tasks={task}/>;
    }
  };
  return (
    <div className="px-6 w-full md:px-0 md:w-9/12 mx-auto mt-7">
      {renderContent()}
    </div>

  );
}
