import React, { useState } from "react";
import EmployeeRegisterForm from "./components/EmployeeRegisterForm";
import EmployeeRegister from "./components/EmployeeRegister";
import SearchEmployee from "./components/SearchEmployee";
import UpdateEmployee from "./components/UpdateEmployee"; 
import "./App.css";

function App() {
  const [view, setView] = useState("Registration Form");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [employeeToEdit, setEmployeeToEdit] = useState(null); 
  
  const addEmployee = (employeeData) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = [...prevEmployees, employeeData];
      setFilteredEmployees(updatedEmployees); 
      return updatedEmployees;
    });
  };

  const deleteEmployee = (index) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = prevEmployees.filter((_, i) => i !== index);
      setFilteredEmployees(updatedEmployees); 
      return updatedEmployees;
    });
  };

  const updateEmployee = (index, updatedEmployee) => {
    setEmployees((prevEmployees) => {
      const newEmployees = [...prevEmployees];
      newEmployees[index] = updatedEmployee;
      setFilteredEmployees(newEmployees);
      return newEmployees;
    });
    setEmployeeToEdit(null); 
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = employees.filter((employee) =>
        employee.idNumber && employee.idNumber.includes(searchTerm)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees); 
    }
  };

  const handleEditEmployee = (index) => {
    setEmployeeToEdit({ employee: employees[index], index }); // Set employee to edit
  };

  return (
    <div className="App">
      <h1>Employee Registration App</h1>
      <div className="App-container">
        <aside className="sidebar">
          <button
            className={`registration-button ${view === "Registration Form" ? "active" : ""}`}
            onClick={() => setView("Registration Form")}
          >
            Employee Registration
          </button>
          <button
            className={`view-employees-button ${view === "Employee Register" ? "active" : ""}`}
            onClick={() => setView("Employee Register")}
          >
            View Employees
          </button>
        </aside>

        <main className="content">
          {view === "Registration Form" && (
            <EmployeeRegisterForm onAddEmployee={addEmployee} />
          )}
          {view === "Employee Register" && (
            <>
              <SearchEmployee onSearch={handleSearch} />
              <EmployeeRegister
                employees={filteredEmployees}
                onDeleteEmployee={deleteEmployee}
                onEditEmployee={handleEditEmployee} // Pass edit function
              />
            </>
          )}
        </main>

        {employeeToEdit && (
          <UpdateEmployee
            employeeData={employeeToEdit}
            onUpdateEmployee={updateEmployee}
            onCancel={() => setEmployeeToEdit(null)} // Close form on cancel
          />
        )}
      </div>
    </div>
  );
}

export default App;
