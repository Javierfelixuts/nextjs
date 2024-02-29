"use client"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';

function Register() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const router = useRouter()
    const onSubmit = handleSubmit( async(data) => {

        if(data.password !== data.confirmPassword){
            alert("Password doesnt match")

            return;
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })

        
        if(res.ok){
            router.push('/auth/login')
        }
    })
    
    return (
        <div className="w-100 bg-slate-200 h-screen flex justify-center items-center">
           
            <form className="bg-white p-6 rounded shadow-sm	" onSubmit={onSubmit}>
           
                <label htmlFor="username" className="block text-slate-500 mb-2 text-sm">
                    Username <span className="text-red-700">*</span>:
                </label>
                <input type="text" 
                {...register("username", {
                    required: {
                        value: true,
                        message: 'Username is required'
                    }
                })}
                placeholder="nickname"

                className="p-2 rounded block mb-2 border-b-2"
                />
                {
                    errors.username && (
                        <span className="text-red-700 text-xs -mt-2 block">{errors.username.message}</span>
                    )
                }
                 <label htmlFor="email" className="text-slate-500 block mb-2 text-sm">
                    Email <span className="text-red-700">*</span>:
                </label>
                <input type="email" 
                {...register("email",{
                    required: {
                        value: true,
                        message: "Email is required"
                    }
                })}
                placeholder="user@gmail.com"

                className="p-2 rounded block mb-2 border-b-2"
                />
                {
                    errors.email && (
                        <span className="text-red-700 text-xs -mt-2 block">{errors.email.message}</span>
                    )
                }
                 <label htmlFor="password" className="text-slate-500 block mb-2 text-sm">
                    Password <span className="text-red-700">*</span>:
                </label>
                <input type="password" 
                {...register("password", {
                    required: {
                        value: true,
                        message: "Password is required"
                    }
                })}
                placeholder="********"
                className="p-2 rounded block mb-2 border-b-2"
                />
                {
                    errors.password && (
                        <span className="text-red-700 text-xs -mt-2 block">{errors.password.message}</span>
                    )
                }

                 <label htmlFor="confirmPassword" className="text-slate-500 block mb-2 text-sm">
                    Confirm password:
                </label>
                <input type="password" 
                {...register("confirmPassword", {
                    required: {
                        value: true,
                        message: "Confirm password is required"
                    }
                })}
                placeholder="********"
                className="p-2 rounded block mb-2 border-b-2"
                />  
                {
                    errors.confirmPassword && (
                        <span className="text-red-700 text-xs -mt-2 block">{errors.confirmPassword.message}</span>
                    )
                }

                <button className="px-3 py-1 mt-3 block rounded bg-slate-700 text-white"> Register </button>

                <div className="mt-5">
                    <span className="text-xs">Do you have an account?</span>
                    <a href="/auth/login" className="text-xs text-blue-400 underline"> Sign In</a>
                </div>
            </form>
            
        </div>
    )
}

export default Register