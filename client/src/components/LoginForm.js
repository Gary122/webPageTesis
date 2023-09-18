import React, { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    user: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu archivo db.js para la conexión a la base de datos.
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="user">Usuario:</label>
        <input
          type="text"
          id="user"
          name="user"
          value={formData.user}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default LoginForm;
