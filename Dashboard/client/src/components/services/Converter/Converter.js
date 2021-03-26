import React, { useEffect, useState } from "react";

// class Converter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currencies: ["USD", "AUD", "SGD", "PHP", "EUR"],
//       base: "USD",
//       amount: "",
//       convertTo: "EUR",
//       result: "",
//     };
//   }

//   handleSelect = e => {
//     this.setState({
//         [e.target.name]: e.target.value,
//         // result: null
//       }, () => {
//         this.calculate();
//       }
//     );
//   };

//   handleInput = e => {
//     this.setState({
//         amount: e.target.value,
//         // result: null,
//       }, () => {
//         this.calculate();
//       }
//     );
//   };

//   calculate = () => {
//     const amount = this.state.amount;
//     if (amount === isNaN) {
//       return;
//     } else {
//       fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
//         .then(res => res.json())
//         .then(data => {
//           const result = (data.rates[this.state.convertTo] * amount).toFixed(2);
//           this.setState({
//             result,
//           });
//         });
//     }
//   };

//   render() {
//     const { currencies, base, amount, convertTo, result } = this.state;

//     return (
//       <div>
//         <div>
//           <input type="number" value={amount} onChange={this.handleInput} />
//           <select name="base" value={base} onChange={this.handleSelect}>
//             {currencies.map(currency => (
//               <option key={currency} value={currency}>
//                 {currency}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//         <input disabled={true} value={amount === "" ? "0" : result === null ? "..." : result} />
//         <select name="convertTo" value={convertTo} onChange={this.handleSelect}>
//           {currencies.map(currency => (
//             <option key={currency} value={currency}>
//               {currency}
//             </option>
//           ))}
//         </select>
//         </div>
//       </div>
//     );
//   }
// }

// export default Converter;

export default function Converter(props) {
  const currencies = ['USD', 'AUD', 'SGD', 'PHP', 'EUR'];

  const [base, setBase] = useState('USD');
  const [amount, setAmount] = useState('');
  const [convertTo, setConvertTo] = useState('EUR');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (amount === isNaN) {
      return;
    }
    if (base === convertTo) {
      setResult(amount);
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
      .then(res => res.json())
      .then(data => {
        setResult((data.rates[convertTo] * amount).toFixed(2));
      });
    }
  }, [base, amount, convertTo])
  
  return (
    <div>
      <h1>Converter</h1>
      <div>
        <input type="number" value={amount} onChange={e => {setAmount(e.target.value)}} />
        <select name="base" value={base} onChange={e => {setBase(e.target.value)}}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
      <input disabled={true} value={amount === "" ? "0" : result === null ? "..." : result} />
      <select name="convertTo" value={convertTo} onChange={e => {setConvertTo(e.target.value)}}>
        {currencies.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
}