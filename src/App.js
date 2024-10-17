import './App.css';
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState(0);
  const [interest, setInterest] = useState(0);
  const [mortgageType, setMortgageType] = useState('repayment');
  const [result, setResult] = useState(null);

  // Calculate mortgage repayment
  const calculatePayment = (e) => {
    e.preventDefault();

    const loanAmount = parseFloat(amount);
    const loanTerm = parseFloat(term);
    const annualInterest = parseFloat(interest) / 100;
    const monthlyInterest = annualInterest / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment;

    if (mortgageType === 'repayment') {
      // Repayment Mortgage Calculation (Principal + Interest)
      monthlyPayment = loanAmount * (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) / (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);
    } else {
      // Interest-Only Mortgage Calculation (Interest only)
      monthlyPayment = loanAmount * monthlyInterest;
    }

    setResult(monthlyPayment.toFixed(2)); // Set the result with two decimal places
  };

  const clearAll = () => {
    setAmount(0);
    setTerm(0);
    setInterest(0);
    setMortgageType('repayment');
    setResult(null);
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className='form-container'>
          <div className='form-left'>
            <div className='title'>
              <p className='title-left'>Mortgage Calculator</p>
              <p className='title-right' onClick={clearAll}>Clear All</p>
            </div>
            
            <form onSubmit={calculatePayment}>
              <label htmlFor="amount">Mortgage Amount</label> <br /><br />
              <input 
                type="number" 
                id="amount" 
                name="amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
              /> <br /><br />
              
              <div className='flex-container'>
                <div className='flex-left'>
                  <label htmlFor="term">Mortgage Term (Years)</label> <br /><br />
                  <input 
                    type="number" 
                    id="term" 
                    name="term" 
                    value={term} 
                    onChange={(e) => setTerm(e.target.value)} 
                  />
                </div>
                <div className='flex-right'>
                  <label htmlFor="interest">Interest Rate (%)</label> <br /><br />
                  <input 
                    type="number" 
                    id="interest" 
                    name="interest" 
                    value={interest} 
                    onChange={(e) => setInterest(e.target.value)} 
                  />
                </div>
              </div>
              
              <br />
              <label htmlFor='type'>Mortgage Type</label> <br /><br />
              <div className="radio-container">
                <input 
                  type='radio' 
                  id='repayment' 
                  name='type' 
                  value='repayment' 
                  checked={mortgageType === 'repayment'}
                  onChange={(e) => setMortgageType(e.target.value)} 
                />
                <label htmlFor="repayment">Repayment</label>
              </div>
              <div className="radio-container">
                <input 
                  type='radio' 
                  id='interest' 
                  name='type' 
                  value='interest' 
                  checked={mortgageType === 'interest'}
                  onChange={(e) => setMortgageType(e.target.value)} 
                />
                <label htmlFor="interest">Interest Only</label>
              </div>

              <br /> 
              <button type="submit">
                <i className='bx bxs-calculator'></i>
                Calculate Repayments
              </button>
            </form>
          </div>

          <div className='form-right'>
            <img src='./calculator.png' alt="calculator" />
            <p className='result-title'> Results shown here</p>
            <p className='result-desc'>
              {result ? `Your estimated monthly payment is $${result}` : 'Complete the form and click "Calculate Repayments" to see your monthly payment'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
