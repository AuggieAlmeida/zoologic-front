'use client'
import { useState } from 'react'
import Image from 'next/image'
import { API_BASE_URL } from '@/services/api'

export default function Login() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signupEmail, setSignupEmail] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('zoologic_token', data.token)
                window.location.href = '/dashboard'
            } else {
                const error = await response.json().catch(() => ({}))
                setMessage(error.error || 'E-mail ou senha inválidos.')
            }
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Não foi possível conectar ao servidor.')
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: signupEmail,
                    password: signupPassword,
                }),
            })

            const data = await response.json().catch(() => ({}))

            if (!response.ok) {
                throw new Error(data.error || 'Não foi possível criar a conta')
            }

            setEmail(signupEmail)
            setPassword(signupPassword)
            setMessage('Conta criada com sucesso. Faça login para continuar.')
            setIsSignUp(false)
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Não foi possível criar a conta')
        }
    }

    return (
        <div className="min-h-screen bg-[url('/images/background/background.jpg')] bg-cover bg-no-repeat flex items-center justify-center p-4 font-montserrat animate-fadeIn">
            {/* Logo */}
            <div className="absolute top-0 w-full flex items-center justify-center gap-2 bg-primary-green p-[10px]">
                <div className="w-12 h-12 relative">
                    <Image
                        src="/logo.png"
                        alt="ZooLogic Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="text-2xl font-semibold text-white font-lemon">ZooLogic</span>
            </div>

                <div className={`relative opacity-95 w-full overflow-hidden max-w-[850px] min-h-[500px] bg-white rounded-2xl shadow-2xl transition-all duration-700 ${isSignUp ? 'sign-up-mode' : ''}`}>
                    {/* Sign Up Form */}
                    <div className="absolute top-0 left-0 w-1/2 h-full opacity-0 z-1 transition-all duration-700 sign-up-form">
                        <form onSubmit={handleRegister} className="h-full flex flex-col items-center justify-center p-8 text-center">
                            <h1 className="text-3xl mb-4 font-lemon">Criar Conta</h1>
                            <span className="text-sm mb-4">Use seu e-mail para criar o acesso</span>
                            <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required className="w-full max-w-[280px] h-12 mb-4 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green" />
                            <input type="password" placeholder="Senha" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required minLength={6} className="w-full max-w-[280px] h-12 mb-6 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green" />
                            {message && <p className="mb-4 text-sm text-primary-green">{message}</p>}
                            <button className="px-8 py-2 rounded-full bg-primary-green text-white hover:bg-secondary-green transition-colors font-lemon">
                                Cadastrar
                            </button>
                        </form>
                    </div>

                    {/* Sign In Form */}
                    <div className="absolute top-0 left-0 w-1/2 h-full transition-all duration-700 z-2 sign-in-form">

                        <form onSubmit={handleSubmit} className="h-full flex flex-col items-center justify-center p-8 text-center">
                            <h1 className="text-3xl mb-4 font-lemon">Entrar</h1>
                            {message && <p className="mb-4 text-sm text-primary-green">{message}</p>}
                            <span className="text-sm mb-4">Acesse com seu e-mail e senha</span>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full max-w-[280px] h-12 mb-4 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full max-w-[280px] h-12 mb-6 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                            />
                                                        <button className="px-8 py-2 rounded-full bg-primary-green text-white hover:bg-secondary-green transition-colors font-lemon">
                                Entrar
                            </button>
                        </form>
                    </div>

                    {/* Overlay */}
                    <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 z-100 overlay-container z-[200]">
                        <div className="bg-gradient-to-r from-primary-green to-secondary-green relative -left-full h-full w-[200%] transform translate-x-0 transition-transform duration-700">
                            <div className="absolute top-0 left-0 h-full w-1/2 flex flex-col items-center justify-center px-8 text-center text-white transform translate-x-0 transition-transform duration-700">
                                <h1 className="text-3xl mb-4 font-lemon">{isSignUp ? 'Olá, Amigo!' : 'Bem vindo de volta!'}</h1>
                                <p className="mb-6">
                                    {isSignUp
                                        ? 'Já possui uma conta? Entre agora para acessar nossa plataforma'
                                        : 'Para se manter conectado, faça login com suas informações pessoais'
                                    }
                                </p>
                                <button
                                    onClick={() => setIsSignUp(false)}
                                    className="px-8 py-2 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary-green transition-colors font-lemon"
                                >
                                    {isSignUp ? 'Login' : 'Entrar'}
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 h-full w-1/2 flex flex-col items-center justify-center px-8 text-center text-white transform translate-x-0 transition-transform duration-700">
                                <h1 className="text-3xl mb-4 font-lemon">{isSignUp ? 'Bem vindo!' : 'Olá, Amigo!'}</h1>
                                <p className="mb-6">
                                    {isSignUp
                                        ? 'Continue seu cadastro preenchendo suas informações pessoais'
                                        : 'Insira seus dados pessoais e comece sua jornada conosco'
                                    }
                                </p>
                                <button
                                    onClick={() => setIsSignUp(!isSignUp)}
                                    className="px-8 py-2 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary-green transition-colors font-lemon"
                                >
                                    {isSignUp ? 'Login' : 'Cadastrar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
