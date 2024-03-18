const ATMDeposit = ({ onChange, isDeposit, isValid, isWarning }) => {
  const choice = ['Deposit Amount', 'Cash Back Amount'];
  const warningMsg = ['Insufficient Funds!',''];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
      <hr></hr>
      <h5> {warningMsg[Number(!isWarning)]}</h5>  
    </label>
  );
};

const Account = () => {
  // let deposit = 0; // state of this transaction
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [warningMsg, setWarningMsg] = React.useState(false);

  //isWarning = false;
  let status = `${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  console.log(`warning: ${warningMsg}`);
 
  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      (event.target.value) = 0;
      
      return setValidTransaction(false);
        
    }
    if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
      console.log("inssuficient");
      setWarningMsg(true);
    } else {
      setValidTransaction(true);
      setWarningMsg(false);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
  
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if (event.target.value === 'Deposit') {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <>
        <h2 id="total">Balance: $ {status}</h2>
        <hr />
        <hr />
        <label>Select an action below to continue: </label><br></br>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>
        <hr />
         
        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
            isWarning={warningMsg}>
          </ATMDeposit>
        )}
      </>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
