import React, { useState, useEffect } from "react";
import { FaArrowsAltH } from "react-icons/fa";
import axios from "axios";
import Select from 'react-select';

const Home = () => {
  const [symbols, setSymbols] = useState([""]);
  const [fromcurrency, setFromcurrency] = useState("USD");
  const [tocurrency, setTocurrency] = useState("EUR");
  const [amount, setAmount] = useState(0);
  const [convertionresult, setConvertionresult] = useState(0);
  const [convertionrate, setConvertionrate] = useState(0);
  const [convertiontime, setConvertiontime] = useState("");

// restyle the font size of the select options 
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: '12px', // Adjust the font size as needed
    }),
  };
  //get symbols for drobdown list

  useEffect(() => {
    axios
      .get(
        "http://data.fixer.io/api/symbols?access_key=1cf1dddd2eb7465ea4c6c046c5384963"
      )
        //getting an opject of the currencies
      .then((response) => {
        const symbols = response.data.symbols;
        setSymbols(symbols);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //get the converted amount

  const handlexchange = () => {
    axios
      .get(
        ` https://v6.exchangerate-api.com/v6/64f645311446f41b5de65974/pair/${fromcurrency}/${tocurrency}/${amount}`
      )

      .then((response) => {
        const convertion = response.data;
        setConvertionresult(convertion.conversion_result);
        setConvertionrate(convertion.conversion_rate);
        setConvertiontime(convertion.time_last_update_utc);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 style={{ marginLeft: "7px" }}>Currency Exchanger تحويل عملات</h1>

      <div className="container1">
        <div className="process-container">
          <div className="child">
            <div style={{ display: "block" }}>
              <label htmlFor="amount">Amount المبلغ</label>
              <br />
              <input
                type="number"
                id="amount"
                name="amount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <br />
            </div>
          </div>

          <div className="child important">
            <div style={{ display: "flex", flex: 1 }}>
              <div className="div1">
                <label htmlFor="fromcurrency">from:</label>
                <br />
             
                <Select
                options={Object.entries(symbols).map(([key, value]) => ({
                  value: key,
                  label: `(${key})-${value}`,
                }))}
                onChange={(selectedOption) => setFromcurrency(selectedOption.value)}
                placeholder="اختر العمله"
                styles={customStyles}
                />
              
                 
              
              </div>

              <div className="div2 arrow">
                <FaArrowsAltH />
              </div>
              <div className="div3">
                <label htmlFor="tocurrency">to:</label>
                <br />
                <Select
                options={Object.entries(symbols).map(([key, value]) => ({
                  value: key,
                  label: `(${key})-${value}`,
                }))}
                onChange={(selectedOption) => setTocurrency(selectedOption.value)}
                placeholder="اختر العمله"
                styles={customStyles}
                />
              </div>
            </div>

            <div className="div4">
              <button
                style={{ width: "100%", height: "25px" }}
                onClick={handlexchange}
              >
                Convert تحويل
              </button>
            </div>
          </div>
        </div>

        <div className="result-container">
          <div className="child">
            <div className="results">
              <label htmlFor="conversion rate">conversion rate سعر الصرف</label>
              <br />
              <input
                type="number"
                id="convertionrate"
                name="convertionrate"
                value={convertionrate}
              />
            </div>
          </div>
          <div className="child last">
            <div className="results">
              <label htmlFor="converted amount">Converted Amount المبلغ المحول</label>
              <br />
              <input
                type="number"
                id="convertionresult"
                name="convertionresult"
                value={convertionresult}
              />
            </div>
            <div className="results ">
              <label htmlFor="convertion Time">Date تاريخ اليوم:</label>
              <div> {convertiontime}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
