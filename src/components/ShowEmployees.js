import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'bootstrap/dist/css/bootstrap.min.css';
import { show_alerta } from '../functions';

const ShowEmployees = () => {
    const url = 'http://localhost:8080/api/employees';
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setFsetRolee] = useState('');
    const [salary, setSalary] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    useEffect( () => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        const respuesta = await axios.get(url);
        setEmployees(respuesta.data);
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalEmployees'>
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
                                    {employees.map((employee, i)=>(
                                        <tr key={employee.employeeId}>
                                            <td>{(i+1)}</td>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.role}</td>
                                            <td>${new Intl.NumberFormat('es-CO', {
                                                style: 'currency',
                                                currency: 'COP',
                                            }).format(parseFloat(employee.salary))}</td>     
                                            <td>
                                                <button className='btn btn-warning'>
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
          <div className='modal fade' id='modalEmployees'>
            
          </div>
        </div>
    )
}

export default ShowEmployees
