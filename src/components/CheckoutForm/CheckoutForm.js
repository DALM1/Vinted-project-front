import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import "./CheckoutForm.scss";

import axios from "axios";

const CheckoutForm = ({ title, price }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [completed, setCompleted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        //! cardElement servira a stocker les données bancaires de l'user
        const cardElement = elements.getElement(CardElement);

        //! Demande de création d'un token via l'API Stripe
        //! On envoie les données bancaires dans la requête
        const stripeResponse = await stripe.createToken(cardElement, {
            name: "User",
        });
        console.log(stripeResponse); //! le console.log() nous permet de voir comment recuperer le token.id necessaire dans la requete
        const stripeToken = stripeResponse.token.id;

        //! Envoie de la requete avec la forme defini en back end (par exemple ici cf:Ligne 32,33,34 Voir coté Back end )
        const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/payment",
            {
                token: stripeToken,
                title: title,
                amount: price,
            }
        );
        console.log(response.data);
        //!Condition pour savoir si la transaction a eu lieu
        if (response.data.status === "succeeded") {
            setCompleted(true);
        }
    };

    return (
        <>
            {!completed ? (
                <form onSubmit={handleSubmit} className="pay-container">
                    <div className="line-pay">
                        <h3>Résumé de la commande </h3>
                        <div>
                            <div className="detail-line-pay">
                                <span>Commande</span>
                                <span>{price} €</span>
                            </div>
                            <div className="detail-line-pay">
                                <span>Frais protection acheteur</span>
                                <span>1.00 €</span>
                            </div>
                            <div className="detail-line-pay">
                                <span>Frais de port</span>
                                <span>2.00 €</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="line-pay-bottom">
                            <div className="detail-line-pay">
                                <h2>Total</h2>
                                <p>{price + 3} €</p>
                            </div>

                            <div className="description-pay">
                                <p>
                                    Il ne vous reste plus qu'un étape pour vous
                                    offrir <span>{title}</span>. Vous allez
                                    payer <span>{price + 3} €</span>
                                    (frais de protection et frais de port
                                    inclus).
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card-container">
                        <CardElement />
                    </div>
                    <button className="btn-pay" type="submit">
                        Confirmer le paiement
                    </button>
                </form>
            ) : (
                <div>
                    <div>Paiement effectué ! </div>
                    <Link to="/">
                        <button>Retourner a la page d'accueil</button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default CheckoutForm;
