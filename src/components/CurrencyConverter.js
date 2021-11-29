import {ExchangeRate} from './ExchangeRate'
import {useState} from 'react'
import axios from 'axios'




export const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('USD')
    const [amount, setAmount] = useState(1)
    const [result, setResult] = useState(0)


    const [exchangeData, setExchangeData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        ExchangeRate: 0
    })

    const chosenPrimaryCurrHandler = (e) => setChosenPrimaryCurrency(e.target.value)
    const chosenSecondaryCurrHandler = (e) => setChosenSecondaryCurrency(e.target.value)
    const changePrimaryInputHandler = (e) => setAmount(e.target.value)


    const convertHandler = () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
                from_currency: chosenPrimaryCurrency,
                function: 'CURRENCY_EXCHANGE_RATE',
                to_currency: chosenSecondaryCurrency
            },
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': process.env.RAPID_API_KEY || 'd69124657fmshb1f5e6efe393777p1c8c67jsnf79809a4ab2c'
            }
        }

        axios.request(options)
            .then(response => {
                console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
                // setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
                setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
                // setPrimaryCurrencyExchange(chosenPrimaryCurrency)
                // setSecondaryCurrencyExchange(chosenSecondaryCurrency)
                setExchangeData({
                    primaryCurrency: chosenPrimaryCurrency,
                    secondaryCurrency: chosenSecondaryCurrency,
                    exchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
                })
            })
            .catch(error => {
                console.error(error)
            })
    }


    return (
        <div className="currency-converter">
            <h2>CurrencyConverter</h2>

            <div className="input-box">
                <table>
                    <tbody>
                    <tr>
                        <td>Primary Currency:</td>
                        <td>
                            <input
                                type="number"
                                name={'currency-amount-1'}
                                value={amount}
                                onChange={changePrimaryInputHandler}
                            />
                        </td>
                        <td>
                            <select
                                className="currency-options"
                                value={chosenPrimaryCurrency}
                                name="currency-option-1"
                                onChange={chosenPrimaryCurrHandler}
                            >
                                {currencies.map((el, _index) => <option key={_index}>{el}</option>)}
                            </select>
                        </td>
                    </tr>


                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            <input
                                type="number"
                                name={'currency-amount-2'}
                                value={result}
                                disabled={true}
                            />
                        </td>
                        <td>
                            <select
                                className="currency-options"
                                value={chosenSecondaryCurrency}
                                name="currency-option-2"
                                onChange={chosenSecondaryCurrHandler}
                            >
                                {currencies.map((el, _index) => <option key={_index}>{el}</option>)}
                            </select>
                        </td>
                    </tr>

                    </tbody>
                </table>

                <button id="convert-button" onClick={convertHandler}>Convert</button>
            </div>

            <ExchangeRate
                exchangeData={exchangeData}
            />
        </div>
    )
}