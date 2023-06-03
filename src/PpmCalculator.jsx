import React, { useState } from 'react';
import './App.css'

function PpmCalculator() {
  const [accNum, setAccNum] = useState('');
  const [tariff, setTariff] = useState('');
  const [last, setLast] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [day, setDay] = useState('');
  const [preload, setPreload] = useState(0);
  const [finalBill, setFinalBill] = useState(0);

  const calculate = (e) => {
    e.preventDefault();

    let unitsValue = 0;

    // Remove commas from the input values
  const cleanedLast = last.replace(/,/g, '');
  const cleanedSecond = second.replace(/,/g, '');
  const cleanedThird = third.replace(/,/g, '');

    // Check the first 5 digits of the account number and update the units value accordingly
    if (accNum.startsWith('25114')) {
      unitsValue = 10;
    } else if (accNum.startsWith('251133') || accNum.startsWith('251134') || accNum.startsWith('251138') || accNum.startsWith('251139') || accNum.startsWith('95300') || accNum.startsWith('012400')) {
      unitsValue = 20;
    } 
    else if (accNum.startsWith('01711000') || accNum.startsWith('0179000185183')) {
      unitsValue = 25;
    } 
    else if (accNum.startsWith('25700') || accNum.startsWith('01372001') || accNum.startsWith('01372002')) {
      unitsValue = 40;
    } 
    else if (accNum.startsWith('0171300') || accNum.startsWith('01710001')) {
      unitsValue = 50;
    }
     else if (accNum.startsWith('01372003') || accNum.startsWith('01372004') || accNum.startsWith('013721') || accNum.startsWith('01632')) {
      unitsValue = 80;
    }
    else if (accNum.startsWith('0179000')) {
      unitsValue = 25;
    }
    else if (accNum.startsWith('251124')) {
      unitsValue = 20;
    }
    // Calculate the PPM
  const ppm = unitsValue * parseFloat(tariff) * 1.075;

  // Parse input values with commas and calculate the final bill
  const finalCal = (((parseFloat(cleanedLast.replace(/,/g, '')) + parseFloat(cleanedSecond.replace(/,/g, '')) + parseFloat(cleanedThird.replace(/,/g, ''))) / 3) / 30) * parseInt(day);

    // Update the preload and final bill values in the state
    setPreload(ppm.toFixed(2));
    setFinalBill(finalCal.toFixed(2));
  };

  return (
    <div className="gen">
    
      <div className="wrapper">
        <div className="pre">
          <h1>Preload Calculation</h1>
          <p id="preload" className="res">{`PRELOAD = ${preload}`}</p>
          <label htmlFor="accNum">Account/ Meter number</label>
          <input
            type="text"
            placeholder="Account/ Meter Number"
            id="accNum"
            value={accNum}
            onChange={(e) => setAccNum(e.target.value)}
          />

          <label htmlFor="myinput">Select/Enter Tariff Index</label>
          <input
            type="text"
            placeholder='double click to get present rates'
            id="myinput"
            list="mylist"
            value={tariff}
            onChange={(e) => setTariff(e.target.value)}
          />
          <datalist id="mylist">
            <option value="39.44" />
            <option value="39.67" />
            <option value="55.43" />
            <option value="56.38" />
            <option value="68.96" />
            <option value="71.62" />
            <option value="72.67" />
          </datalist>

          <button id="button" onClick={calculate}>Calculate</button>
        </div>

        <div className="final">
          <h1>Final Bill Calculation</h1>
          <p id="finalBill" className="res">{`FINAL BILL = ${finalBill}`}</p>
          <label htmlFor="last">Enter Last Billed Amount</label>
          <input
            type="text"
            placeholder="Enter the last bill"
            id="last"
            value={last}
            onChange={(e) => setLast(e.target.value)}
          />

          <label htmlFor="second">Enter second Last Billed Amount</label>
          <input
            type="text"
            placeholder="Enter the second last bill"
            id="second"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
          />

          <label htmlFor="third">Enter third Last Billed Amount</label>
          <input
            type="text"
            placeholder="Enter the third last bill"
            id="third"
            value={third}
            onChange={(e) => setThird(e.target.value)}
          />
          <label htmlFor="day">Enter Day meter was connected</label>
          <input
            type="text"
            placeholder="Day meter was connected"
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <button id="button" onClick={calculate}>Calculate</button>
        </div>
      </div>
    </div>
  );
}

export default PpmCalculator;
