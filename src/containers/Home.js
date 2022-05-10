import "./container scss/Home.scss";
import { Link } from "react-router-dom";

const Home = ({
    data,
    isLoading,
    token,
    setLimit,
    switchPage,
    setSwitchPage,
}) => {
    const options = [
        { label: "10", value: 10 },
        { label: "25", value: 25 },
        { label: "50", value: 50 },
    ];
    return isLoading ? (
        <span>Very slow...</span>
    ) : (
        <div>
            <div className="banner">
                <div className="square-banner">
                    <p>Prêts à faire du tri dans vos placards ?</p>
                    {token ? (
                        <Link to="/publish">
                            <button>Commencer à vendre</button>
                        </Link>
                    ) : (
                        <Link to="/signup">
                            <button>Commencer à vendre</button>
                        </Link>
                    )}
                </div>
            </div>
            <div className="limit-container">
                <span style={{ marginRight: "1rem" }}>Offres par page</span>
                <select
                    name="limit-page"
                    onChange={(event) => {
                        setLimit(event.target.value);
                    }}
                >
                    {options.map((option, index) => {
                        return (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        );
                    })}
                </select>
                <div>
                    {switchPage > 1 && (
                        <button
                            className="btn-switch"
                            onClick={() => {
                                setSwitchPage(switchPage - 1);
                            }}
                        >
                            Previous Page
                        </button>
                    )}

                    {data.count / switchPage > switchPage && (
                        <button
                            className="btn-switch"
                            onClick={() => {
                                setSwitchPage(switchPage + 1);
                            }}
                        >
                            Next Page
                        </button>
                    )}
                </div>
            </div>
            <div className="main-container">
                {data.offers.map((element, index) => {
                    // console.log(element._id);
                    return (
                        <div className="card-product" key={index}>
                            <div className="seller">
                                {element.owner.account.avatar && (
                                    <img
                                        className="avatar"
                                        src={
                                            element.owner.account.avatar
                                                .secure_url
                                        }
                                        alt="user avatar"
                                    />
                                )}
                                {element.owner.account.username}
                            </div>
                            <Link to={`/offer/${element._id}`}>
                                <img
                                    src={element.product_image.secure_url}
                                    alt="element"
                                />
                            </Link>
                            <div className="info-product">
                                <p>{element.product_price} €</p>
                                {element.product_details.map(
                                    (detail, index) => {
                                        return (
                                            <div key={index}>
                                                {detail.TAILLE ? (
                                                    <span>{detail.TAILLE}</span>
                                                ) : null}
                                                {detail.MARQUE ? (
                                                    <span>{detail.MARQUE}</span>
                                                ) : null}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
