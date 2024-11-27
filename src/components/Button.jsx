import React from 'react';
import './Button.css';

// Componente que representa cada botão de cor
const Button = ({ color, onClick }) => {
  return (
    <div
      className={`color-btn ${color}`}
      id={color}
      onClick={() => onClick(color)}
    ></div>
  );
};

export default Button;
