import { Link, useLocation } from "react-router-dom";
import logovinted from "../../assets/logovinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Torange from "../Torange";
import "./Header.scss";

const Header = ({
    token,
    setUser,
    setSearchinput,
    values,
    setValues,
    sort,
    setSort,
}) => {
    // console.log(useLocation());
    const location = useLocation();

    return (
        <nav>
            <div className="nav-container">
                <div>
                    <Link to="/">
                        <img src={logovinted} alt="" />
                    </Link>
                </div>
                <div className="left-container">
                    <div className="search-bar-container2">
                        <span>
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass " />
                        </span>

                        <input
                            placeholder="Rechercher des articles"
                            type="text"
                            onChange={(e) => setSearchinput(e.target.value)}
                        />
                    </div>
                    {location.pathname === "/" && (
                        <div className="range-container">
                            <p style={{ marginRight: "0" }}>Trier par prix: </p>
                            {sort === "price-desc" ? (
                                <span
                                    onClick={() => setSort("price-asc")}
                                    className="btn-toogle"
                                >
                                    <FontAwesomeIcon icon="fa-solid fa-toggle-on" />
                                </span>
                            ) : (
                                <span
                                    onClick={() => setSort("price-desc")}
                                    className="btn-toogle"
                                >
                                    <FontAwesomeIcon icon="fa-solid fa-toggle-off" />
                                </span>
                            )}
                            <p>Prix entre: </p>
                            <div className="range">
                                <Torange
                                    values={values}
                                    setValues={setValues}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className=" btn-container">
                    {!token ? (
                        <div className="btn-connect">
                            <Link to="/signup">
                                <button className="btn-signup">
                                    S'inscrire
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="btn-signup">
                                    Se connecter
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <button
                                onClick={() => {
                                    setUser(null);
                                }}
                                className="btn-disconnect"
                            >
                                Se deconnecter
                            </button>
                        </div>
                    )}
                    <Link to="/publish">
                        <button className="btn-sold">
                            Vends tes arcticles
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
