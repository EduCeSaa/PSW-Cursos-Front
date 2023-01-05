import React, { Component } from 'react'
export default class SignUp extends Component {

  //usuarios api para registrarlos
  render() {
    return (
      <form>
        <h3>Registrate</h3>
        <div className="mb-3">
          <label>Usuario</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa Tu Usuario"
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Ingresa Tu Contraseña"
          />
        </div>
        <div className="mb-3">
          <label>Confirma Tu Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Ingresa Tu Contraseña"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
        </div>
        <p className="forgot-password text-right">
          Ya Estas Registrado ? <a href="/sign-in">Ingresa</a>
        </p>
      </form>
    )
  }
}