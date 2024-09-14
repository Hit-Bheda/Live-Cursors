import { useRef } from "react"
import useStore  from "../../store/store"
import { useNavigate } from "react-router-dom"

function Login() {
    const input = useRef<HTMLInputElement>(null)
    const { setUsername } = useStore()
    const navigate = useNavigate()

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        const inputText = input.current?.value
        if(inputText) setUsername(inputText)
        navigate("/cursors")
    }
  return (
    <div className ="login-page">
        <form onSubmit={handleSubmit} className="m-4">
            <h1 className="text-5xl">Login</h1>
            <p className="text-2xl mt-3 mb-3 ">What Can I Call You ?</p>
            <input type="text" placeholder="Enter Username" ref={input} className="border-2 border-black p-1 rounded-md"/>
            <button className="bg-black text-white px-4 py-1 ml-2 rounded-md">Login</button>
        </form>
    </div>
  )
}

export default Login