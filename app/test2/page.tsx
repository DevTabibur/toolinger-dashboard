"use client"
import { Input } from '@/components/ui'
import React from 'react'
import { FiSearch } from 'react-icons/fi'

const page = () => {
    return (
        <div>
            <Input className="m-4" label="Email" placeholder="Enter your email" type="email" required onClick={(e: any) => console.log("clicked", e.target.value)} />
            <Input className="m-4" leftIcon={<FiSearch />} placeholder="Search..." />
            <Input className="m-4" label="Password" type="password" placeholder="Enter password" />
            <Input className="m-4" label="Error Example" error="This field is required" />
        </div>
    )
}

export default page