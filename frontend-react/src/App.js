import React, { useState } from 'react';
import Formulario from './Componentes/Formulario'
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <header className="Container">
        <div className="row">
          <div className="col-sm-12">
              <img src="img/sigma-logo.png" className="logo"/>
              <h3 className="text-center  font-weight-bold ">Prueba de desarrollo Sigma</h3>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <p className="text-center text-descripcion">Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Cumque, laborum! Officiis ab ipsam molestias
                            inventore facere, veniam enim magni est! Sequi blanditiis corporis dicta molestias, iusto
                            consequatur sapiente est ullam.</p>
                    </div>
                </div>
          </div>

          <div className="col-sm-6">
                <img src="img/sigma-image.png" className="img-formulario"/>
          </div>

          <div className="col-sm-6">
            <div className="col-12 col-sm-2 col-md-10">
              
              <Route exact path="/" component={Formulario} />

            </div>
          </div>

        </div>
      </header>
    </Router>
  );
}

export default App;
