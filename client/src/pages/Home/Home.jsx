import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./Home.css";
const Home = () => {
  const [formData, setFormData] = useState([]);
  const [steps, setSteps] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/", formData);
      const result = Object.entries(data.data).map(([key, value]) => [
        key,
        value.carryString,
        value.sumString,
      ]);
      setSteps(result);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <h1>Step Addition</h1>
      </div>
      <div className="container">
        <div className="user-input">
          <label htmlFor="num1">First Number:</label>
          <input
            className="input-num1"
            type="number"
            name="num1"
            onChange={handleChange}
          />
        </div>
        <div className="user-input">
          <label htmlFor="num2">Second Number:</label>
          <input
            className="input-num2"
            type="number"
            name="num2"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit}>Generate Steps</button>
        <div className="json-outline">
          <div className="json-inner">
            <p className="brace">{"{"}</p>
            {steps?.map((step, i) => (
              <div key={i} className="steps">
                <p className="step-key">{`"${step[0]}"`} </p>
                <p style={{ color: "yellow" }}>: {`{"carryString": `}</p>
                <p style={{ color: "#ffa654" }}>{`"${step[1]}", `}</p>
                <p style={{ color: "yellow" }}>: {`"sumString": `}</p>
                <p style={{ color: "#ffa654" }}>{`"${step[2]}" `}</p>
                <p style={{ color: "yellow" }}>{"},"}</p>
              </div>
            ))}
            <p className="brace" style={{ marginTop: "-1rem" }}>
              {"}"}
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
