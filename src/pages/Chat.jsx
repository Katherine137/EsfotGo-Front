import { useEffect, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { io } from 'socket.io-client'
import { toast, ToastContainer } from "react-toastify"

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const [username, setUsername] = useState("")
    const [usersOnline, setUsersOnline] = useState(0)
    const messagesEndRef = useRef(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    // Auto scroll a los nuevos mensajes
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Configuración de Socket.io
    useEffect(() => {
        const newSocket = io("http://localhost:3000")
        setSocket(newSocket)

        newSocket.on("connect", () => {
            toast.success("Conectado al servidor")
        })

        newSocket.on("disconnect", () => {
            toast.error("Desconectado del servidor")
        })

        newSocket.on("mensaje-recibido", (payload) => {
            setMessages((prev) => [...prev, { ...payload, isOwn: false }])
        })

        newSocket.on("usuarios-online", (count) => {
            setUsersOnline(count)
        })

        newSocket.on("usuario-conectado", (data) => {
            toast.info(`${data.username} se unió al chat`)
        })

        newSocket.on("usuario-desconectado", (data) => {
            toast.warning(`${data.username} abandonó el chat`)
        })

        return () => newSocket.disconnect()
    }, [])

    // Manejar entrada al chat
    const handleJoinChat = (data) => {
        if (!socket || !socket.connected) {
            toast.error("No hay conexión con el servidor")
            return
        }

        setUsername(data.username)
        setIsConnected(true)
        socket.emit("usuario-conectado", { username: data.username })
        toast.success(`¡Bienvenido ${data.username}!`)
    }

    // Manejar envío de mensajes
    const handleSendMessage = (data) => {
        if (!socket || !socket.connected) {
            toast.error("No hay conexión con el servidor")
            return
        }

        if (!data.message.trim()) return

        const newMessage = {
            text: data.message,
            from: username,
            timestamp: new Date().toLocaleTimeString(),
            isOwn: true
        }

        socket.emit("enviar-mensaje", { 
            text: data.message, 
            from: username,
            timestamp: newMessage.timestamp
        })
        
        setMessages((prev) => [...prev, newMessage])
        reset({ message: "" })
    }

    // Pantalla de inicio de sesión
    if (!isConnected) {
        return (
            <>
                <ToastContainer position="top-right" autoClose={3000} />
                
                <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">
                        <div className="text-center mb-8">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-3">ESFOTgo Chat</h1>
                            <p className="text-gray-600 text-lg">Conéctate con la comunidad ESFOT</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-bold mb-3 text-lg">
                                    ¿Cuál es tu nombre?
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ingresa tu nombre de usuario"
                                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-lg"
                                    {...register("username", { 
                                        required: "El nombre de usuario es obligatorio",
                                        minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                        maxLength: { value: 20, message: "Máximo 20 caracteres" }
                                    })}
                                />
                                {errors.username && (
                                    <p className="text-red-600 text-sm mt-2 font-semibold">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={handleSubmit(handleJoinChat)}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
                            >
                                Entrar al Chat
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm">
                                Al entrar aceptas las normas de la comunidad
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // Pantalla principal del chat
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* Header del chat */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg px-6 py-5">
                    <div className="flex justify-between items-center max-w-6xl mx-auto">
                        <div className="flex items-center gap-4">
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                            </div>
                            <div className="text-white">
                                <h1 className="text-2xl font-bold">ESFOTgo Chat</h1>
                                <p className="text-sm text-indigo-100 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    {usersOnline} usuario(s) en línea
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-sm px-5 py-3 rounded-full">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-white font-bold hidden sm:block">{username}</span>
                        </div>
                    </div>
                </div>

                {/* Área de mensajes */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-6xl mx-auto w-full">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-400 mt-20">
                            <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-xl font-semibold">No hay mensajes aún</p>
                            <p className="text-sm mt-2">¡Sé el primero en enviar un mensaje!</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
                            >
                                <div className={`max-w-md ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                                    {!msg.isOwn && (
                                        <div className="flex items-center gap-2 mb-2 ml-2">
                                            <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                                                {msg.from?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">{msg.from}</span>
                                        </div>
                                    )}
                                    
                                    <div
                                        className={`px-5 py-3 rounded-2xl shadow-md ${
                                            msg.isOwn
                                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                                        }`}
                                    >
                                        <p className="break-words text-base leading-relaxed">{msg.text}</p>
                                        <span className={`text-xs block mt-2 ${msg.isOwn ? 'text-indigo-100' : 'text-gray-500'}`}>
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input de mensaje */}
                <div className="bg-white border-t-2 border-gray-200 px-6 py-5 shadow-lg">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Escribe tu mensaje aquí..."
                                className="flex-1 px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-base"
                                {...register("message", { 
                                    required: "El mensaje no puede estar vacío",
                                    maxLength: { value: 500, message: "Máximo 500 caracteres" }
                                })}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleSubmit(handleSendMessage)()
                                    }
                                }}
                            />
                            <button
                                onClick={handleSubmit(handleSendMessage)}
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 flex items-center gap-2"
                            >
                                <span className="hidden sm:inline">Enviar</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                        {errors.message && (
                            <p className="text-red-600 text-sm mt-2 font-semibold">
                                {errors.message.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat