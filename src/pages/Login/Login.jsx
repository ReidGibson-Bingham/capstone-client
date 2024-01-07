import React, { useEffect, useRef, useState } from 'react';
import LoginTerminal from './../../components/LoginTerminal/LoginTerminal'
import './Login.scss';

const Login = () => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let angle = 0;
        let requestId;

        const renderMoneyCharacters = () => {
        const fontSize = 30;
        const radius = 100;
        const speed = 0.02;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.fillStyle = 'green';
        ctx.clearRect(0, 0, canvas.width * 2, canvas.height);
        ctx.font = `${fontSize}px Arial`;

        for (let i = 0; i < 360; i += 10) {
            const x = centerX + Math.cos(angle + i) * radius - 8;
            const y = centerY + Math.sin(angle + i * 1) * radius * 0.65 + 10;
            ctx.fillText('$', x, y);
        }

        angle += speed;
        requestId = requestAnimationFrame(renderMoneyCharacters);
        };

        renderMoneyCharacters();

        return () => cancelAnimationFrame(requestId);

    }, []);

    return (
        <>
        <main className="login">
            <canvas ref={canvasRef} className="login__canvas"></canvas>
            <LoginTerminal className="login-terminal" ></LoginTerminal>
        </main>
        </>
        
    )
}

export default Login;