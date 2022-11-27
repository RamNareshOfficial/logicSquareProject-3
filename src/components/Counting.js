import React, { useEffect, useState } from "react";
import EmployeeModal from "./Employee";

export default function Counting(props) {
  const [showModel, setShowModel] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [allData, setAllData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [availableCount, setAvailableCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [unavail, setUnavail] = useState(0);
  const [editIndex, setEditIndex] = useState();
  const [filterdata, setFilterData] = useState([]);
  const [searchedText, setSearchedText] = useState("");

  useEffect(() => {
    let sortedArray = props.data.sort(function (x, y) {
      return x === y ? 0 : x ? -1 : 1;
    });
    setAllData(sortedArray);
    setFilterData(sortedArray);
    let availableCoun = props.data.filter((item) => item.available) || 0;
    console.log("log", props.data.length, availableCoun.length);
    setTotalCount(props.data.length || 0);
    setAvailableCount(availableCoun.length);
    setUnavail(props.data.length - availableCoun.length);
  }, [props.data]);

  const showHideModel = (value, indx) => {
    if (value) {
      let modalData = allData.filter((item, index) => index === indx);
      setModalData(modalData[0]);
      setEditIndex(indx);
      setShowModel(true);
      setIsEdit(true);
    } else {
      setShowModel(true);
      setIsEdit(false);
    }
  };
  const hideModal = () => {
    console.log("hidemodal");
    setModalData({});
    setShowModel(false);
  };

  const setCheckBox = (e, index) => {
    let allDat = JSON.parse(JSON.stringify(allData));
    allDat[index].available = e.target.checked;

    setAllData(allDat);
    setFilterData(allDat);
    localStorage.setItem("data", JSON.stringify(allDat));
  };
  const filterData = (e) => {
    setSearchedText(e.target.value);
    let tableData = JSON.parse(JSON.stringify(allData));

    let filer = tableData.filter((item) => {
      return (
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.dept.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFilterData(filer);

  };

  const deleteItem = (index) => {
    let allDat = JSON.parse(JSON.stringify(allData));

    let filterData = allDat.filter((value, inde) => inde !== index);
    setAllData(filterData);
    setFilterData(filterData);
    localStorage.setItem("data", JSON.stringify(filterData));
  };
  return (
    <>
      <div className="mx-5 mt-4">
        <input
          placeholder="Enter text to search..."
          type="text"
          className="form-control"
          value={searchedText}
          onChange={(e) => {
            filterData(e);
          }}
        />
      </div>
      {showModel && (
        <EmployeeModal
          editIndex={editIndex}
          isEdit={isEdit}
          data={modalData}
          hideModal={hideModal}
          saveEmployeeData={props.saveEmployeeData}
        />
      )}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="question-dashboard">
              <div className="card mt-4 mb-3 mb-md-4">
                <div className="card-body p-3">
                  <h5 className="text-secondary mb-2">
                    Available:{" "}
                    <span className="font-weight-bold ml-1 text-dark">
                      {availableCount}
                    </span>
                  </h5>
                  <h5 className="text-secondary mb-2">
                    Not available:{" "}
                    <span className="font-weight-bold ml-1 text-dark">
                      {unavail}
                    </span>
                  </h5>
                  <h5 className="text-secondary">
                    Total:{" "}
                    <span className="font-weight-bold ml-1 text-dark">
                      {totalCount}
                    </span>
                  </h5>

                  <button
                    className="btn btn-primary mt-4"
                    onClick={() => {
                      showHideModel(false, -1);
                    }}
                  >
                    <i className="fa fa-plus"></i>&nbsp; Add Employee
                  </button>
                </div>
              </div>

              <div className="table-responsive mt-3 mt-md-4 mb-2">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Available</th>
                      <th>View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterdata.length > 0 &&
                      filterdata.map((item, index) => {
                        return (
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.dept}</td>
                            <td>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  checked={item.available}
                                  onChange={(e) => {
                                    setCheckBox(e, index);
                                  }}
                                  className="custom-control-input"
                                  id={`customCheck${index}`}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`customCheck${index}`}
                                ></label>
                              </div>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-info btn-sm mx-4"
                                onClick={() => showHideModel(true, index)}
                              >
                                <i className="fa fa-edit"></i>&nbsp; Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                  deleteItem(index);
                                }}
                              >
                                <i className="fa fa-trash"></i>&nbsp; Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {filterdata.length === 0 && (
                  <div style={{ textAlign: "center" }}>
                    <h4>No employee data found !</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
