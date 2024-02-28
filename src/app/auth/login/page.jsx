"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from "next/image";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter()
  const [error, setError] = useState(null)

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res)
    if (res.error) {
      setError(res.error)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  });

  return (
    <div className="w-100 bg-slate-200 h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-sm">

        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
        )}

        <Image
          alt="bankapp"
          className="mx-auto"
          src='/icon-192x192.png'
          height={50}
          width={50}
        />
        <h1 className="text-slate-200 font-bold text-4xl mb-4 text-center m-2">BANKAPP</h1>

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="p-2 rounded block mb-2 border-b-2 text-black"
          placeholder="user@email.com"
        />

        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="p-2 rounded block mb-2 border-b-2 text-black"
          placeholder="******"
        />

        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <button className="px-3 py-1 mt-3 block rounded bg-slate-700 text-white">
          Login
        </button>

        <div className="mt-5">
          <span className="text-xs">Do you have an account?</span>
          <a href="/auth/register" className="text-xs text-blue-400 underline"> register</a>
        </div>
      </form>




    </div>
  );
}
export default Login;