import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class Header extends Component {
    active = {
        fontWeight: "bold",
        color: "red"
    };
    header = {
        display: "flex",
        justifyContent: "space-evenly",
        listStyle: "none"
    };
    render() {
        return (
            <div style={this.header}>
                <NavLink exact to="/" activeStyle={this.active}>
                    Home
                </NavLink>
                <NavLink to="/dashboard" activeStyle={this.active}>
                    Dashboard
                </NavLink>
                <NavLink to="/login" activeStyle={this.active}>
                    Login
                </NavLink>
            </div>
        );
    }
}
export default Header;