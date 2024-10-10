import React from "react";
import "./EmployeeRegister.css";

const EmployeeRegister = ({
  employees,
  onDeleteEmployee,
  onEditEmployee, // Use the correct prop for editing employees
}) => {
  return (
    <div className="employee-register-container">
      <h2>Registered Employees</h2>
      {employees.length === 0 ? (
        <p>No employees registered yet.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>ID Number</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={URL.createObjectURL(employee.photo)}
                    alt={employee.name}
                    className="employee-photo"
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.surname}</td>
                <td>{employee.age}</td>
                <td>{employee.idNumber}</td>
                <td>{employee.role}</td>
                <td className="action-btn-container">
                  <button
                    className="update-btn"
                    onClick={() => onEditEmployee(index)} // Correct function for editing
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteEmployee(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeRegister;
