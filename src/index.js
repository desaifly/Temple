import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './layout/MainLayout';
import '../src/Resources/CSS/main.css'



ReactDOM.render(<MainLayout url={window.location.href} />, document.getElementById("root"));