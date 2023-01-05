import React, { useEffect, useState } from "react";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [totalCount, setTotalCount] = useState(
    JSON.parse(localStorage.getItem("totalCount")) || 0
  );

  const checkUniqueRollNumber = (rollNumber) => {
    if (students.find((student) => student.rollNumber === rollNumber)) {
      setErrorMessage("Roll Number must be unique");
    } else {
      setErrorMessage("");
    }
  };

  const handleCheckIn = () => {
    if (!rollNumber || !name) {
      setErrorMessage1("Roll Number and Name are required");
      return;
    } else {
      setErrorMessage1("");
    }
    if (errorMessage) {
      return;
    }
    setStudents((prevStudents) => [
      ...prevStudents,
      { rollNumber, name, checkInTime: new Date().toLocaleString() },
    ]);
    setTotalCount(totalCount + 1);
    setRollNumber("");
    setName("");
  };

  const handleCheckOut = (index) => {
    setStudents((prevStudents) => {
      const newStudents = [...prevStudents];
      newStudents[index].checkOutTime = new Date().toLocaleString();
      return newStudents;
    });
    setTotalCount(totalCount - 1);
  };

  useEffect(() => {
    const data = localStorage.getItem("students");
    if (data !== null) {
      setStudents(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("totalCount", JSON.stringify(totalCount));
  }, [students]);

  return (
    <div>
      <p className="text-md font-semibold text-center my-[40px] text-red-600">
        {errorMessage1}
      </p>
      <div className="border border-gray-400 w-[400px] h-[400px] mx-auto my-[80px] rounded-[20px] xs:w-[350px]">
        <h1 className="text-2xl font-semibold text-center text-slate-900 my-[30px]">
          Attendance
        </h1>
        <div className="flex relative">
          <input
            type="number"
            placeholder="Enter RollNumber"
            value={rollNumber}
            onChange={(e) => {
              setRollNumber(e.target.value);
              checkUniqueRollNumber(e.target.value);
            }}
            className={`${
              errorMessage && rollNumber
                ? "xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[10px] border-red-700 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-red-700 mx-auto"
                : "xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[10px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600 mx-auto"
            }`}
          />
          {errorMessage && rollNumber ? (
            <span className="text-sm font-semibold text-red-700 absolute my-[60px] ml-[75px]">
              {errorMessage}
            </span>
          ) : (
            <span></span>
          )}
        </div>
        <div className="flex relative py-[35px]">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="xs:w-[300px] w-[350px] h-[45px] rounded-[10px] mt-[10px] indent-[10px] border-gray-400 border-[2px] placeholder:font-epilogue font-semibold outline-none focus:border-gray-600 mx-auto"
          />
        </div>
        <button
          onClick={handleCheckIn}
          className="hover:bg-blue-400 rounded-md bg-blue-500 text-white text-md font-medium shadow-sm w-[350px] xs:w-[300px] h-[45px] text-center ml-[25px] "
        >
          CheckIn
        </button>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-center text-slate-900 my-[30px]">
          Student Data
        </h1>
        <h1 className="text-md font-semibold text-center text-slate-900 my-[30px]">
          Total Student Count in School : {totalCount}
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm font-semibold text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  RollNumber
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  CheckInTime
                </th>
                <th scope="col" className="px-6 py-3">
                  CheckOutTime
                </th>
              </tr>
            </thead>
            {students ? (
              <tbody>
                {students.map((student, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    key={student.rollNumber}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {student.rollNumber}
                    </th>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.checkInTime}</td>
                    {student.checkOutTime ? (
                      <td className="px-6 py-4">{student.checkOutTime}</td>
                    ) : (
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleCheckOut(index)}
                          className="text-blue-500 text-md font-semibold"
                        >
                          checkout
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            ) : (
              ""
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
