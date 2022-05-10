import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./container scss/Signup.scss";

const Signup = ({ setUser }) => {
    const navigate = useNavigate(); //! is used for redirection (Cf Line 32)

    //***************************** STATES ******************************/
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [newsletter, setNewsletter] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //********************* REQUEST SIGN UP ************************/

    const response = async () => {
        try {
            //! la constante user prendra en valeurs les valeurs des inputs correspondants
            const user = {
                email: email,
                username: username,
                password: password,
                newsletter: newsletter,
            };
            //! requete envoyé en post avec la constante user après la virgule (Cf line25-26)
            const response = await axios.post(
                `https://lereacteur-vinted-api.herokuapp.com/user/signup`,
                user
            );

            setUser(response.data.token);
            navigate("/");
        } catch (error) {
            if (error.response.status === 400) {
                setErrorMessage(error.response.statusText);
                console.log(errorMessage);
            }
            console.log(error.response);
        }
    };

    //******************** NEED THIS FUNCTIONS ************************/
    const handleSubmit = (e) => {
        //! Permet de ne pas rafraichir la page par defaut
        e.preventDefault();
        //! Appeler la requete pour sign up(Cf line 16)
        response();
    };

    //*********************END************************* */

    return (
        <div className="container-signup">
            <div className="form-signup">
                <h1>S'inscrire</h1>
                <form className="form-container" onSubmit={handleSubmit}>
                    <input
                        className="input-text"
                        placeholder="Nom d'utilisateur"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="input-text"
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input-text"
                        placeholder="Mot de passe"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="signup-bottom-container">
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                className="btn-checkbox"
                                onChange={(e) =>
                                    setNewsletter(e.target.checked)
                                }
                            />
                            <span>S'inscrire a la newsletter</span>
                        </div>

                        <p>
                            En m'inscrivant je confirme avoir lu et accepté les
                            Termes & Conditions et Politique de Confidentialité
                            de Vinted. Je confirme avoir au moins 18 ans.
                        </p>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "red" }}>
                        {errorMessage}
                    </span>
                    <input
                        type="submit"
                        value="S'inscrire"
                        className="btn-submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default Signup;
