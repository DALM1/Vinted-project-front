import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./container scss/Publish.scss";

export default function Publish({ token }) {
    //**************************STATES *********************** */

    const [picture, setPicture] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState();
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(null);

    const navigate = useNavigate();
    //******************** NEED THIS FUNCTIONS ************************/

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const formData = new FormData();
            formData.append("picture", picture);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("price", price);

            const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            if (response.data._id) {
                //!Navigate to the current offer
                navigate(`/offer/${response.data._id}`);
            }
        } catch (error) {
            if (error.response.status === 400) {
                setError(error.response.statusText);
            }
            console.log(error.response.status);
        }
    };

    //******************** END ************************/
    return token ? (
        <div id="gray">
            <form className="publish-container" onSubmit={handleSubmit}>
                <h1>Vends ton article</h1>
                <div className="img-container">
                    <input
                        type="file"
                        onChange={(event) => {
                            setPicture(event.target.files[0]);
                            setPreview(
                                URL.createObjectURL(event.target.files[0])
                            );
                        }}
                    />
                    <img src={preview} style={{ width: "200px" }} alt="" />
                </div>
                <div className="description-container">
                    <div className="title-container">
                        <h2>Titre</h2>
                        <input
                            type="text"
                            placeholder="ex: Chemise de Beaugosse"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
                    <div className="description">
                        <h2>Décris ton article</h2>
                        <textarea
                            type="text"
                            placeholder="ex: L / 40 / 20"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />
                    </div>
                </div>

                <div className="details-container">
                    <div className="line">
                        <h2>Marque</h2>
                        <input
                            type="text"
                            placeholder="ex: Gucci"
                            value={brand}
                            onChange={(event) => setBrand(event.target.value)}
                        />
                    </div>

                    <div className="line">
                        <h2>Taille</h2>

                        <input
                            type="text"
                            placeholder="ex: L/ 40/ 22"
                            value={size}
                            onChange={(event) => setSize(event.target.value)}
                        />
                    </div>

                    <div className="line">
                        <h2>Couleur</h2>
                        <input
                            type="text"
                            placeholder="ex : Fushia"
                            value={color}
                            onChange={(event) => setColor(event.target.value)}
                        />
                    </div>
                    <div className="line">
                        <h2>Etat</h2>
                        <input
                            type="text"
                            placeholder="condition"
                            value={condition}
                            onChange={(event) =>
                                setCondition(event.target.value)
                            }
                        />
                    </div>
                    <div className="line">
                        <h2>Lieu</h2>
                        <input
                            type="text"
                            placeholder="city"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                        />
                    </div>
                </div>
                <div className="price-container">
                    <h2>Prix en €</h2>
                    <div className="price">
                        <input
                            type="number"
                            placeholder="€"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </div>
                </div>
                <span style={{ color: "red" }}>{error}</span>
                <div className="btn-publish-container">
                    <input className="btn-publish" type="submit" />
                </div>
            </form>
        </div>
    ) : (
        <Navigate to="/login" />
    );
}
