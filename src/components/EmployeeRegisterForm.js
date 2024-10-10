import React, { useState, useEffect } from "react";
import "./EmployeeRegisterForm.css";

const EmployeeRegisterForm = ({ onAddEmployee, editEmployee }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    idNumber: "",
    photo: null,
    role: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editEmployee) {
      setFormData(editEmployee);
    }
  }, [editEmployee]);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validate = () => {
    const errors = {};
    const namePattern = /^[A-Z].*/; // Starts with a capital letter
    const idNumberPattern = /^\d{13}$/; // 13 digits
    const rolePattern = /^[A-Z].*/; // Starts with a capital letter

    if (!namePattern.test(formData.name)) errors.name = "Name must start with a capital letter";
    if (!namePattern.test(formData.surname)) errors.surname = "Surname must start with a capital letter";
    if (!idNumberPattern.test(formData.idNumber)) errors.idNumber = "ID Number must consist of 13 digits";
    if (!formData.age || formData.age < 18) errors.age = "Valid age is required (min 18)";
    if (!rolePattern.test(formData.role)) errors.role = "Role must start with a capital letter";
    if (!formData.photo) errors.photo = "Photo is required";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      onAddEmployee(formData);
      setFormData({
        name: "",
        surname: "",
        age: "",
        idNumber: "",
        photo: null,
        role: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="form-container">
      <div className="employee-form-container">
        <h2>Employee Registration Form</h2>
        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
            {errors.surname && <span className="error">{errors.surname}</span>}
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="18"
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>
          <div className="form-group">
            <label>ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
            />
            {errors.idNumber && <span className="error">{errors.idNumber}</span>}
          </div>
          <div className="form-group">
            <label>Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              required
            />
            {errors.photo && <span className="error">{errors.photo}</span>}
          </div>
          <div className="form-group">
            <label>Role in Company</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
            {errors.role && <span className="error">{errors.role}</span>}
          </div>
          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegisterForm;
