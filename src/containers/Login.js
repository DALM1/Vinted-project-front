import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./container scss/Login.scss";

const Login = ({ setUser, setUserName, userName }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
    };
    const fetchData = async () => {
        try {
            const user = {
                email: email,
                password: password,
            };

            const response = await axios.post(
                `https://lereacteur-vinted-api.herokuapp.com/user/login`,
                user
            );

            setUser(response.data.token);
            navigate("/");
        } catch (error) {
            if (error.response.status === 400) {
                setErrorMessage("Email ou mot de passe incorrect");
            }
            console.log(error.response);
        }
    };
    return (
        <div className="container-login">
            <div className="form-login">
                <h1>Se connecter</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input-text"
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input
                        className="input-text"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <span style={{ fontSize: "0.8rem", color: "red" }}>
                        {errorMessage}
                    </span>
                    <input
                        className="btn-submit-login"
                        type="submit"
                        value="Se connecter"
                    />
                    <Link to="/signup">
                        <div>Pas encore de compte? Inscris-toi !</div>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
