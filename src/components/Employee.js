import React, { useEffect, useState } from "react";

export default function Employee({
  editIndex,
  isEdit,
  data,
  hideModal,
  saveEmployeeData,
}) {
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [desi, setDesi] = useState("");

  useEffect(() => {
    setAge(data.age);
    setName(data.name);
    setDate(data.date);
    setDept(data.dept);
    setDesi(data.desi);
    setGender(data.gender);
  }, [data]);
  const saveEmployee = () => {
    if (!name) {
      alert("All field are required");
      return;
    } else if (!age) {
      alert("All field are required");

      return;
    } else if (!date) {
      alert("All field are required");

      return;
    } else if (!dept) {
      alert("All field are required");

      return;
    } else if (!desi) {
      alert("All field are required");

      return;
    } else if (!gender) {
      alert("All field are required");

      return;
    } else {
    }
    let newObj = {};
    newObj.name = name;
    newObj.dept = dept;
    newObj.gender = gender;
    newObj.date = date;
    newObj.age = age;
    newObj.desi = desi;
    newObj.available = false;
    if (isEdit) {
      saveEmployeeData(newObj, editIndex);
    } else {
      saveEmployeeData(newObj);
    }
    hideModal();
  };

  return (
    <>
      <div
        className="modal show fade"
        style={{ display: "block" }}
        id="addEmployeeModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addEmployeeModal"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header pt-3 pb-2">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Add Employee
              </h5>
              <button type="button" className="close" onClick={hideModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-row ">
                  <div className="form-group col-md-6">
                    <label htmlFor="name" className="mb-1">
                      Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="" className="mb-1">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      className="form-control"
                      id="Select"
                    >
                      <option value="select">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="age" className="mb-1">
                      Age
                    </label>
                    <input
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      type="text"
                      className="form-control"
                      id="age"
                      placeholder="Age"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="desi" className="mb-1">
                      Designation
                    </label>
                    <input
                      value={desi}
                      onChange={(e) => setDesi(e.target.value)}
                      type="text"
                      className="form-control"
                      id="desi"
                      placeholder="Designation"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="dept" className="mb-1">
                      Department
                    </label>
                    <input
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                      type="text"
                      className="form-control"
                      id="dept"
                      placeholder="Department"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="date" className="mb-1">
                      Joining Date
                    </label>
                    <input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      type="date"
                      className="form-control"
                      id="date"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={hideModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={saveEmployee}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
