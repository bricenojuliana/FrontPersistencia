import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'bootstrap/dist/css/bootstrap.min.css';
import { show_alerta } from '../functions';

const ShowEmployees = () => {
    const url = 'https://apiemployees.azurewebsites.net/api/employees';
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getEmployees();
      }, []); 

    const getEmployees = async () => {
        try {
          const response = await axios.get(url);
          setEmployees(response.data);
        } catch (error) {
          console.error(error);
        }
    }

    const openModal = (op, employeeId, firstName, lastName, role, salary) => {
        setEmployeeId('');
        setFirstName('');
        setLastName('');
        setRole('');
        setSalary('');
        setOperation(op);
        if (op === 1) {
            setTitle('Create Employee');
        } else if (op ===2) {
            setTitle('Update Employee');
            setEmployeeId(employeeId);
            setFirstName(firstName);
            setLastName(lastName);
            setRole(role);
            setSalary(salary);
        }
        window.setTimeout(function(){
            document.getElementById('firstName').focus();
        }, 500);
    }

    const validar = () => {
        var parametros;
        var metodo;
        if(firstName.trim() === ''){
            show_alerta('Escribe el nombre del empleado', 'warning');
        } else if(lastName.trim() === ''){
            show_alerta('Escribe el apellido del empleado', 'warning');
        } else if(role.trim() === ''){
            show_alerta('Escribe el rol del empleado', 'warning');
        } else if(salary.trim() === ''){
            show_alerta('Escribe el salario del empleado', 'warning');
        } else{
            if(operation === 1){
                parametros = {firstName:firstName.trim(), lastName:lastName.trim(), role:role.trim(), salary:salary.trim()};
                metodo='POST';
            }else {
                parametros = {employeeId:employeeId.trim(), firstName:firstName.trim(), lastName:lastName.trim(), role:role.trim(), salary:salary.trim()};
                metodo='PUT';
            }
            enviarSolicitud(metodo, parametros);
        }
    }

    const enviarSolicitud = async(metodo, parametros) => {
        await axios({ method:metodo, url:url, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alerta(msj, tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getEmployees();
            }
        })
        .catch(function(error){
            show_alerta('Error en la solicitud', 'error');
            console.log(error);
        });
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalEmployees'>
                                <i className='fa-solid fa-circle-plus'></i> Create
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-12'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Role</th><th>Salary</th></tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {employees.map((employee)=>(
                                        <tr key={employee.employeeId}>
                                            <td>{employee.employeeId}</td>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.role}</td>
                                            <td>${new Intl.NumberFormat('es-CO').format(employee.salary)}</td>     
                                            <td>
                                                <button onClick={() => openModal(2, employee.employeeId, employee.firstName, employee.lastName, employee.role, employee.salary)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalEmployees'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button className='btn btn-danger'>
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>                                       
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id='modalEmployees' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='mpdal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='employeeId'></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                                <input type='text' id='firstName' className='form-control' placeholder='First Name' value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                                <input type='text' id='lastName' className='form-control' placeholder='Last Name' value={lastName}
                                onChange={(e) => setLastName(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-briefcase'></i></span>
                                <input type='text' id='role' className='form-control' placeholder='Role' value={role}
                                onChange={(e) => setRole(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                                <input type='text' id='salary' className='form-control' placeholder='Salary' value={salary}
                                onChange={(e) => setSalary(e.target.value)}></input>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={() => validar()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i> Save
                                </button>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'> Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowEmployees
