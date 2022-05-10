import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Productdetail from "../components/Productdetail";
import "./containers.scss";

const Offer = ({ token }) => {
    const params = useParams();
    // console.log(params.id);
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://lereacteur-vinted-api.herokuapp.com/offer/${params.id}`
                );
                // console.log(response.data.offers);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [params.id]);

    return isLoading ? (
        <span>En cours de chargement...</span>
    ) : (
        <div className="offer">
            <Productdetail data={data} token={token} />
        </div>
    );
};

export default Offer;
