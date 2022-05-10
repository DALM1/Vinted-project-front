import { Link } from "react-router-dom";

import "../containers/containers.scss";

const Productdetail = ({ data, token }) => {
    const details = data.product_details;
    console.log(data);
    return (
        <div className="product-container">
            <div className="img-product">
                <img src={data.product_image.secure_url} alt="" />
            </div>
            <div className="product-detail-top">
                <h2>{data.product_price} €</h2>
                <div className="details">
                    {details.map((item, index) => {
                        const keys = Object.keys(item);
                        return (
                            <div className="line-details" key={index}>
                                <div className="line-details-left">
                                    <span>{keys[0]}</span>
                                </div>
                                <div className="line-details-right">
                                    <div className="bold">{item[keys[0]]}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="product-detail-down">
                    <h3 className="product-title">{data.product_name}</h3>
                    <p>{data.product_description}</p>
                    <div className="owner-info">
                        {data.owner.account.avatar && (
                            <span>
                                <img
                                    src={data.owner.account.avatar.secure_url}
                                    alt=""
                                />
                            </span>
                        )}

                        <span>{data.owner.account.username}</span>
                    </div>
                </div>
                {token ? (
                    <Link
                        to="/payment"
                        state={{
                            title: data.product_name,
                            price: data.product_price,
                        }}
                    >
                        <button className="btn-offer-pay">Acheter</button>
                    </Link>
                ) : (
                    <Link to="/login">
                        <button className="btn-login-before">
                            Connectez-vous avant d'acheter
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};
export default Productdetail;
