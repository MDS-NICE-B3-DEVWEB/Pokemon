"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ClientLayout from '@/components/ClientLay';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("https://api.kolectors.live/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log("Login successful:", data);
      setMessage("Login successful!");
      router.push("/");
    } else {
      setMessage("Login failed: Invalid email or password.");
    }
  };

  return (
    <ClientLayout>
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #171925, #e73343)' }}>
        <div className="relative w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
          <img src="https://i.gifer.com/4OKl.gif" alt="GIF" className="absolute top-0 right-0 w-16 h-16 rounded-tr-lg" />
          <h1 className="text-2xl font-bold text-gray-900 text-center">Kollector's</h1>
          <h2 className="text-xl font-bold text-gray-700">Connectez vous</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Votre Adresse Mail</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Votre mot de passe</label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Mot de passe"
                required
              />
              <div className="absolute inset-y-center right-0 pr-3 flex items-center cursor-pointer">
                {passwordVisible ? (
                  <AiFillEyeInvisible size={24} className="text-gray-500" onClick={() => setPasswordVisible(false)} />
                ) : (
                  <AiFillEye size={24} className="text-gray-500" onClick={() => setPasswordVisible(true)} />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Se Souvenir du MDP</label>
                </div>
              </div>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
            {message && <p className="mt-2 text-center text-sm text-red-600">{message}</p>}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <a href="register" className="font-medium text-indigo-600 hover:underline">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </ClientLayout>
  );
}
