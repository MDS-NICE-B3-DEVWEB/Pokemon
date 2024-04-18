import React, { useState } from 'react';
import './RegisterForm.css';
import { register } from '../../../api/RegisterPageApi';
import { useNavigate } from 'react-router-dom';
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card"
import { Button } from "../../ui/button"
import { Link } from 'react-router-dom';

function RegisterForm() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const user = { name, email, password };
            const response = await register(user);
            console.log(response);
            if (response.status_code === 201) {
                navigate('/');
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card className="shadow-lg rounded-xl p-5">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Inscription</CardTitle>
                <CardDescription className="text-gray-600">
                    🌍 Inscrivez-vous pour collaborer avec des artistes et des beatmakers du monde entier.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label className="block text-black-700 text-sm font-bold mb-2" htmlFor="name">Nom</Label>
                        <Input className="border border-gray-400 placeholder-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="name" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-black-700 text-sm font-bold mb-2" htmlFor="email">Email</Label>
                        <Input className="border border-gray-400 placeholder-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-black-700 text-sm font-bold mb-2" htmlFor="password">Mot de passe</Label>
                        <Input className="border border-gray-400 placeholder-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex flex-col items-center justify-center py-2">
                        <Button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                            type="submit"
                        >
                            S'inscrire
                        </Button>
                        <div className="text-center">
                            <span className="text-gray-700">Vous avez déjà un compte ? </span>
                            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                Connectez-vous
                            </Link>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default RegisterForm;
