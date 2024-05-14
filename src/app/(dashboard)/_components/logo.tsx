import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div>
        <Image height={130}
        width={130}
         src="  /logo.svg" 
         alt='logo'
         />
    </div>
  )
}
