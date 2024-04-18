import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import "./App.css"

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Tabs defaultValue="register" className="w-10/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto mt-10">
        <TabsList className="flex justify-around border-b-2 border-blue-500 py-2">
          <TabsTrigger id="register-tab" className="text-blue-500 hover:text-blue-700 cursor-pointer !shadow-none" value="register">Inscription</TabsTrigger>
          <TabsTrigger id="login-tab" className="text-blue-500 hover:text-blue-700 cursor-pointer" value="login">Connexion</TabsTrigger>
        </TabsList>
        <TabsContent className="py-5" value="register">
          <RegisterPage />
        </TabsContent>
        <TabsContent value="login">
          <LoginPage />
        </TabsContent>
      </Tabs>
    </Router>
  )
}
export default App