import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserTerminal.scss';


const UserTerminal = (props) => {

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [emailAxios, setEmailAxios] = useState('');
    const [passwordAxios, setPasswordAxios] = useState('');
    const [output, setOutput] = useState([]);
    const [isEmailInputFocused, setIsEmailInputFocused] = useState(false);
    const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
    const navigate = useNavigate();

    const handleEmailInputChange = (e) => {
        setEmailInput(e.target.value);
        setEmailAxios(e.target.value);
        setIsEmailInputFocused(true)
    };

    const handlePasswordInputChange = (e) => {
        setPasswordInput(e.target.value);
        setPasswordAxios(e.target.value);
        setIsPasswordInputFocused(true)
    };

    const authenticateUser = async (emailData, passwordData) => {

        const authData = {
            email: emailData,
            password: passwordData
        }

        try {

            const response = await axios.post('http://localhost:8080/api/users/', authData)
            if (response.status === 200) {
                navigate('/home');
            } else {
                alert("user not found: ", response);
            }

        } catch (err) {
            alert("failed to authenticate: ", err)
        }
    }

    const handleEmailEnter = (e) => {
        if (e.key === 'Enter') {
          
            console.log(emailInput)
            setEmailAxios(emailInput)
            setEmailInput(Array(emailInput.length + 1).join('*'))
    
        }
        if (emailInput === 'clear') {
          setOutput(Array(emailInput.length + 1).join('*'));
        }
        setIsEmailInputFocused(false);
    };

    const handlePasswordEnter = (e) => {
        if (e.key === 'Enter') {
            console.log(passwordInput)
            setPasswordAxios(emailInput)
            setPasswordInput(Array(passwordInput.length + 1).join('*'));

            authenticateUser(emailAxios, passwordAxios);
            console.log("the relevant data" [emailAxios, passwordAxios])

        }
        if (emailInput === 'clear') {
          setOutput(['']);
        }
        setIsPasswordInputFocused(false);
    };

    const handleLogout = () => {
        navigate('/login')
    }

  return (
    <div className="user-terminal">
        <h1 className='user-terminal__title'>$HapiCapi</h1>
        <div className="user-terminal__inputs-container">
            <div className='user-terminal__input-container'>
                <span className="user-terminal__prompt">Email:{isEmailInputFocused ? '>' : '$'}</span>
                <input
                    className=''
                    type="text"
                    name="search"
                    value={emailInput}
                    onChange={handleEmailInputChange}
                    onKeyPress={handleEmailEnter}
                    onFocus={() => setIsEmailInputFocused(false)}
                    onBlur={() => setIsEmailInputFocused(false)}
                />
            </div>
            <div className='user-terminal__input-container'>
                <span className="user-terminal__prompt">Username:{isPasswordInputFocused ? '>' : '$'}</span>
                <input
                    className='user-terminal__input'
                    type="text"
                    name="search"
                    value={passwordInput}
                    onChange={handlePasswordInputChange}
                    onKeyPress={handlePasswordEnter}
                    onFocus={() => setIsPasswordInputFocused(false)}
                    onBlur={() => setIsPasswordInputFocused(false)}
                />
            </div>
            <div className='user-terminal__input-container'>
                <span className="user-terminal__prompt">Password:{isPasswordInputFocused ? '>' : '$'}</span>
                <input
                    className='user-terminal__input'
                    type="text"
                    name="search"
                    value={passwordInput}
                    onChange={handlePasswordInputChange}
                    onKeyPress={handlePasswordEnter}
                    onFocus={() => setIsPasswordInputFocused(false)}
                    onBlur={() => setIsPasswordInputFocused(false)}
                />
            </div>
            <div className='user-terminal__input-container'>
                <span className="user-terminal__prompt">Password Confirm:{isPasswordInputFocused ? '>' : '$'}</span>
                <input
                    className='user-terminal__input'
                    type="text"
                    name="search"
                    value={passwordInput}
                    onChange={handlePasswordInputChange}
                    onKeyPress={handlePasswordEnter}
                    onFocus={() => setIsPasswordInputFocused(false)}
                    onBlur={() => setIsPasswordInputFocused(false)}
                />
            </div>
        </div>
        <div className='user-terminal__button-box'>
            <p>$Delete</p>
            <p onClick={handleLogout}>$Logout</p>
        </div>
    </div>
  );
};

export default UserTerminal;