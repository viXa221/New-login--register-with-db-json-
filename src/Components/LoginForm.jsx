// src/Components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
 import 'react-toastify/dist/ReactToastify.css';
import './LoginForm.css';


const LoginForm = () => {//компонента LoginForm
    const [formData, setFormData] = useState({//държи имейла и паролата
        email: "",//стойности
        password: "",
    });
    const navigate = useNavigate();//пренасочва при успешен вход

    function handleChange(event) {//обнпвява formData при писане 
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value, //обнпвява стойностите по име на полето
            };
        });
    }

    const validate = () => { //проверява дали полетата са попълнени
        let result = true;//ако и двете полета са попълнени
        if (formData.email === "" || formData.email === null) {
            result = false;
            toast.warn("Моля, въведете имейл");
        }
        if (formData.password === "" || formData.password === null) {
            result = false;
            toast.warn("Моля, въведете парола");
        }
        return result;
    };

    const proceedLogin = (e) => {//изпраща заявка и проверява потребителпят и неговата парола
        e.preventDefault();//спира презареждането на формата
        if (validate()) { //ако валидацията е успешна се прави заявка
            fetch(`http://localhost:3001/users?email=${formData.email}`) 
            //това е get заявка, която търси потребител по email
                .then((res) => {
                    if (!res.ok) {
                        // Ако сървърът върне грешка (напр. 404, 500), изписва грешка
                        return res.json().then(errData => {
                            throw new Error(errData.message || "Грешка от сървъра");
                        });
                    }
                    return res.json();
                })
                .then((users) => {
                    // console.log("Users fetched:", users); // За дебъгване
                    if (users.length === 0) {//ако няма такъв потребител
                        toast.error("Невалиден имейл или потребителят не съществува");
                    } else {//ако има потребител и проверка на паролата
                        const user = users[0]; // взима първия потребител от масива
                        if (user.password === formData.password) {//проверява дали паролата е същата с тази, въведена от потребителя
                            toast.success("Успешен вход!");
                            sessionStorage.setItem("userEmail", formData.email); //тук се записва
                            navigate("/"); //пренасочва го към началната страница
                        } else {//дава грешка, ако паролата не съвпада със запаметената 
                            toast.error("Невалидна парола");
                        }
                    }
                })
                .catch((err) => {//при грешка дава това
                    toast.error("Входът неуспешен: " + err.message);
                });
        }
    };

    return (
  <section className="login-container">
    <h2>Log in</h2>
    <form onSubmit={proceedLogin}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>

      <button type="submit">Log in</button>
    </form>
    <p className="forgot">
      Forgot password? <a href="#">Click here</a>
    </p>
  </section>
);
};

export default LoginForm;