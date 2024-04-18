import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import { login } from '../../../api/LoginPageApi';
import { useNavigate } from 'react-router-dom';


function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const user = { email, password };
            const response = await login(user);
            console.log(response);
            if (response.status_code === 201) {
                navigate('/');
            } else {
                setErrorMessage(response.message);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <form style={styles.container}>
        
        <label style={styles.label}>Email</label>
        <input
            type='email'
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
        />
        <label style={styles.label}>Mot de passe</label>
        <input
            type='password'
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
        />
          
            <button style={styles.buttonLogin} onClick={handleSubmit}>
                Se connecter
            </button>
            <div style={styles.registerMessage}>
                <span>Vous n'avez pas de compte ? </span>
            </div>
        </form>
    );
}
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80vw',
        paddingTop: 100,
        paddingBottom: 100,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        width: '80%',
    },
    input: {
        height: 40,
        borderColor: 'rgba(0, 0, 255, 0.2)',
        borderBottomWidth: 2,
        marginBottom: 36,
        width: '80%',
        backgroundColor: '#f7f7f7',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginTop: 5,
    },
    buttonLogin: {
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: 'blue',
        borderRadius: 25,
        width: '50%',
    },
    registerButtonText: {
        color: 'white',
        padding: 10,
        textAlign: 'center',
    },
    registerMessage: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
    },
    registerLink: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
};

export default RegisterForm;