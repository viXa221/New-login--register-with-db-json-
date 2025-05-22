import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import './RegistrationForm.css';

const RegistrationForm = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  const proceedRegistration = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        toast.success("Регистрацията е успешна!");
        navigate('/login');
      })
      .catch((err) => {
        toast.error("Неуспешна регистрация: " + err.message);
      });
  };

  return (
    <section className="registration-form">
      <div className="form-container">
        <p className="form-title">Регистрация</p>
        <form onSubmit={proceedRegistration} className="form">
          <div className="form-group">
            <label htmlFor="firstName">Име:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Име"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Фамилия:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Фамилия"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Имейл:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Имейл"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Парола:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Парола"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <button type="submit" className="form-button">
            Регистрирай се
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default RegistrationForm;
