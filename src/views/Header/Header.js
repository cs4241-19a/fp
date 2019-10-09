import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
library.add(faDatabase);
class Header extends Component {
    active = {
        fontWeight: "bold",
        color: "white",
        textDecoration: "underline"
    };
    header = {
        display: "flex",
        justifyContent: "space-evenly left",
        listStyle: "none",
        marginBottom: "5px",
        marginLeft: "20px",
    };
    render() {
        return (
            <section className="hero is-dark">
                <div style={this.header}>
                    <div className="hero-head">
                        <header className="navbar">
                            <div className="container">
                                <div className="navbar-brand">
                                    <div className="navbar-item">
                                        <FontAwesomeIcon icon="database"
                                            size="3x"
                                            color= '#E62020'
                                        ></FontAwesomeIcon>
                                    </div>
                                    <span className="navbar-burger burger" data-target="navbarMenuHeroC">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                </div>
                                <div className="center">
                                    <h1 className="is-huge">Admin Tools</h1>
                                </div>
                                <div id="navbarMenuHeroC" className="navbar-menu">
                                    <div className="navbar-end">
                                        <div className="navbar-item is-active">
                                            <NavLink exact to="/" className="inactive" activeStyle={this.active}>
                                                Home
                                        </NavLink>
                                        </div>
                                        <div className="navbar-item">
                                            <NavLink to="/dashboard" className="inactive" activeStyle={this.active}>
                                                Dashboard
                                        </NavLink>
                                        </div>
                                        <div className="navbar-item">
                                            <NavLink to="/login" className="inactive" activeStyle={this.active}>
                                                Login
                                        </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                </div>
            </section>
        );
    }
}
export default Header;