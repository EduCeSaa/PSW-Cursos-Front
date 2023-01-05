import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Login = ({setToken}) => {
	const location = useLocation ();
	const navigate = useNavigate ();
	
	const LOGIN_ENDPOINT_BASEPATH = process.env.REACT_APP_LOGIN_ENDPOINT_BASEPATH;
	const LOGIN_ENDPOINT_AUTHENTICATE = process.env.REACT_APP_LOGIN_ENDPOINT_AUTHENTICATE;
    
    const [estado, guardarEstado] = useState (
		{
			Usuario: '',
			Contraseña: '',
			error: false,
			prev: location.state.from
		}
	); 

    const doLogin = () => {
		let endpoint = LOGIN_ENDPOINT_BASEPATH + LOGIN_ENDPOINT_AUTHENTICATE;
		let payload = {
			username: estado.Usuario,
			password: estado.Contraseña
		};

		axios.post (endpoint, payload,
		{
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).then (
			(response) => {
				if (response.status === 200) {
					const json = response.data;

					if (json.token === '') {
						guardarEstado (prevState => {
							return (
								{
									...prevState,
									error: true
								}
							)
						}); 
					}

					setToken (json.token);
					navigate (estado.prev);
				}

				if (response.status === 401 || response.status === 204) {
					guardarEstado (prevState =>
						{
							return (
								{
									...prevState,
									error: true
								}	
							)
						}
					);
				}
			},
			(error) => {
				if (error.response.status === 400 || error.response.status === 401) {
					guardarEstado (prevState =>
						{
							return (
								{
									...prevState,
									error: true
								}	
							)
						}
					);
				}
				
				//console.log("Exception " + error);
			}
		).catch (error => {
			//console.log (error);
		});
	}

	const handleChange = (e) => {
		const name = e.target.name;
		const val = e.target.value;

		guardarEstado (prevState =>
			{
				return (
					{
						...prevState,
						[name]: val
					}
				);
			}
		);
	}
    return (
      <form>
        <h3>Ingresar</h3>
        <div className="mb-3">
          <label>Usuario</label>
          <input
            type="text"
            name="Usuario"
            onChange={handleChange} value={estado.UserName}
            className="form-control"
            placeholder="Ingresa Tu Nombre De Usuario"
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            name="Contraseña"
            onChange={handleChange} value={estado.namePassword}
            className="form-control"
            placeholder="Ingresa Tu Contraseña"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Recordarme
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={doLogin}>
            Enviar
          </button>
        </div>
        <p className="forgot-password text-right">
          No Estas Registrado ? <a href="/sign-up">Registrate</a>
        </p>
      </form>
    )
  }

export default Login;

