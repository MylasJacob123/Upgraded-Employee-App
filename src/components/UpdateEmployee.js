import React, { useState } from "react";
import "./UpdateEmployee.css";

const UpdateEmployee = ({ employeeData, onUpdateEmployee, onCancel }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState(employeeData.employee);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setUpdatedEmployee({ ...updatedEmployee, [name]: files[0] });
    } else {
      setUpdatedEmployee({ ...updatedEmployee, [name]: value });
    }
  };

  const validate = () => {
    const errors = {};
    const namePattern = /^[A-Z].*/; // Starts with a capital letter
    const idNumberPattern = /^\d{13}$/; // 13 digits
    const rolePattern = /^[A-Z].*/; // Starts with a capital letter

    if (!namePattern.test(updatedEmployee.name)) errors.name = "Name must start with a capital letter";
    if (!namePattern.test(updatedEmployee.surname)) errors.surname = "Surname must start with a capital letter";
    if (!idNumberPattern.test(updatedEmployee.idNumber)) errors.idNumber = "ID Number must consist of 13 digits";
    if (!updatedEmployee.age || updatedEmployee.age < 18) errors.age = "Valid age is required (min 18)";
    if (!rolePattern.test(updatedEmployee.role)) errors.role = "Role must start with a capital letter";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onUpdateEmployee(employeeData.index, updatedEmployee);
    }
  };

  return (
    <div className="update-employee-modal">
      <div className="update-employee-container">
        <h2>Update Employee</h2>
        <form onSubmit={handleSubmit} className="update-employee-form">
          <label>Photo</label>
          <input type="file" name="photo" onChange={handleChange} />
          {updatedEmployee.photo && (
            <img
              src={URL.createObjectURL(updatedEmployee.photo)}
              alt={updatedEmployee.name}
              className="update-employee-photo-preview"
            />
          )}
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={updatedEmployee.name}
            onChange={handleChange}
          />
          {errors.name && <span className="update-component-error">{errors.name}</span>}
          <label>Surname</label>
          <input
            type="text"
            name="surname"
            value={updatedEmployee.surname}
            onChange={handleChange}
          />
          {errors.surname && <span className="update-component-error">{errors.surname}</span>}
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={updatedEmployee.age}
            onChange={handleChange}
          />
          {errors.age && <span className="update-component-error">{errors.age}</span>}
          <label>ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={updatedEmployee.idNumber}
            onChange={handleChange}
          />
          {errors.idNumber && <span className="update-component-error">{errors.idNumber}</span>}
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={updatedEmployee.role}
            onChange={handleChange}
          />
          {errors.role && <span className="update-component-error">{errors.role}</span>}
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
