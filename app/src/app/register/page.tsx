"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ClientLayout from '@/components/ClientLay';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch("https://api.kolectors.live/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Inscription réussie:", data);
        setMessage("Inscription réussie !");
        router.push("/login");
      } else {
        const errorData = await response.json();
        let errorMessage = `Échec de l'inscription : ${errorData.message}`;
        if (errorData.errorsList) {
          const errorsList = errorData.errorsList as Record<string, string[]>;
          errorMessage += ": " + Object.values(errorsList).map(error => error.join(', ')).join('. ');
        }
        setMessage(errorMessage);
      }
    } catch (error) {
      setMessage("Une erreur s'est produite. Veuillez réessayer.");
      console.error("Erreur d'inscription:", error);
    }
  };

  return (
    <ClientLayout>
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #171925, #e73343)' }}>
        <div className="relative w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
          <img src="https://i.gifer.com/4OKl.gif" alt="GIF" className="absolute top-0 right-0 w-16 h-16 rounded-tr-lg" />
          <h1 className="text-2xl font-bold text-gray-900 text-center">Kollector's</h1>
          <h2 className="text-xl font-bold text-gray-700">Créez un nouveau compte</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Votre nom</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Votre email</label>
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
            <div className="relative">
              <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-700">Répétez le mot de passe</label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="repeat-password"
                id="repeat-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirmez le mot de passe"
                required
              />
              <div className="absolute inset-y-center right-0 pr-3 flex items-center cursor-pointer">
                {confirmPasswordVisible ? (
                  <AiFillEyeInvisible size={24} className="text-gray-500" onClick={() => setConfirmPasswordVisible(false)} />
                ) : (
                  <AiFillEye size={24} className="text-gray-500" onClick={() => setConfirmPasswordVisible(true)} />
                )}
              </div>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Créer un nouveau compte
            </button>
            {message && <p className="mt-2 text-center text-sm text-red-600">{message}</p>}
          </form>
        </div>
      </div>
    </ClientLayout>
  );
}
