import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <Link href="/components/form">Go to form</Link>
    </div>
  )
}

export default page