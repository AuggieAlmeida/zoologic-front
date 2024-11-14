'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Main() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-[url('/images/background/background.jpg')] bg-cover bg-no-repeat flex items-center justify-center p-4 font-montserrat animate-fadeIn">
            {/* Logo */}
            <div className="absolute top-0 w-full flex items-center justify-center gap-2 bg-primary-green p-[10px]">
                <div className="w-12 h-12 relative">
                    <Image
                        src="/images/logo.png"
                        alt="ZooLogic Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="text-2xl font-semibold text-white font-lemon">ZooLogic</span>
            </div>
            <button
                onClick={() => router.push('/login')}
                className="px-10 py-5 rounded-full bg-primary-green text-white hover:bg-secondary-green transition-colors font-lemon text-xl"
            >
                Iniciar Sessão
            </button>
        </div>
    )
}