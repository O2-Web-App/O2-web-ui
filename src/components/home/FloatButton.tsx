"use client";

import React from 'react'
import { Button } from '../ui/button'
import { Download } from 'lucide-react'
import { useRouter } from 'next/navigation'


const FloatButton = () => {
    const router = useRouter()
  return (
    <div>
      <Button onClick={()=>router.push(`/pwa`)} className='absolute right-5 bottom-5 fixed z-50 bg-primary p-3.5 w-18 h-18 text-white rounded-full'><Download className="h-[30px] w-[30px] font-semibold" /></Button>
    </div>
  )
}

export default FloatButton
