import React, { useState, useEffect } from "react";
import EmployeeRegisterForm from "./components/EmployeeRegisterForm";
import EmployeeRegister from "./components/EmployeeRegister";
import SearchEmployee from "./components/SearchEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [view, setView] = useState("Registration Form");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState("Login");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
    setFilteredEmployees(storedEmployees); 

    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  const addEmployee = (employeeData) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = [...prevEmployees, employeeData];
      setFilteredEmployees(updatedEmployees);
      
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      return updatedEmployees;
    });
  };

  const deleteEmployee = (index) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = prevEmployees.filter((_, i) => i !== index);
      setFilteredEmployees(updatedEmployees);
      
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      return updatedEmployees;
    });
  };

  const updateEmployee = (index, updatedEmployee) => {
    setEmployees((prevEmployees) => {
      const newEmployees = [...prevEmployees];
      newEmployees[index] = updatedEmployee;
      setFilteredEmployees(newEmployees);
      
      localStorage.setItem("employees", JSON.stringify(newEmployees));
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
    setEmployeeToEdit({ employee: employees[index], index });
  };

  const handleLogin = (email, password) => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      setAuthView(null);
      setView("Registration Form");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    setView("Login");
    setAuthView("Login"); 
  };

  const handleRegister = (newUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); 
      return updatedUsers;
    });
    handleLogin(newUser.email, newUser.password); 
  };

  const renderAuthView = () => {
    switch (authView) {
      case "Login":
        return <Login onLogin={handleLogin} />;
      case "Register":
        return <Register onRegister={handleRegister} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>Employee Registration App</h1>
      <div className="App-container">
        <aside className="sidebar">
          {!isLoggedIn ? (
            <>
              <button
                className={`Login-button ${authView === "Login" ? "active" : ""}`}
                onClick={() => setAuthView("Login")}
              >
                Login
              </button>
              <button
                className={`Register-button ${authView === "Register" ? "active" : ""}`}
                onClick={() => setAuthView("Register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
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
              <button className="sign-out-button" onClick={handleSignOut}>
                Logout
              </button>
            </>
          )}
        </aside>

        <main className="content">
          {!isLoggedIn ? (
            renderAuthView()
          ) : (
            <>
              {view === "Registration Form" && (
                <EmployeeRegisterForm onAddEmployee={addEmployee} />
              )}
              {view === "Employee Register" && (
                <>
                  <SearchEmployee onSearch={handleSearch} />
                  <EmployeeRegister
                    employees={filteredEmployees}
                    onDeleteEmployee={deleteEmployee}
                    onEditEmployee={handleEditEmployee}
                  />
                </>
              )}
            </>
          )}
        </main>

        {employeeToEdit && (
          <UpdateEmployee
            employeeData={employeeToEdit}
            onUpdateEmployee={updateEmployee}
            onCancel={() => setEmployeeToEdit(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
