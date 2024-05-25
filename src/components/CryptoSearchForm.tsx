import { ChangeEvent, FormEvent, useState } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

function CriptoSearchForm() {
  const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);
  const fetchData = useCryptoStore((state) => state.fetchData);
  const [pairs, setPairs] = useState<Pair>({
    currency: "",
    cryptocurrency: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPairs({
      ...pairs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pairs.currency.trim() === "" || pairs.cryptocurrency.trim() === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");
    // Get the data from the API
    fetchData(pairs);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="form-field">
        <label htmlFor="currency">Moneda</label>
        <select
          name="currency"
          id="currency"
          onChange={handleChange}
          value={pairs.currency}
        >
          <option value="" disabled>
            - Seleccione -
          </option>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="cryptocurrency">Criptomoneda</label>
        <select
          name="cryptocurrency"
          id="cryptocurrency"
          onChange={handleChange}
          value={pairs.cryptocurrency}
        >
          <option value="" disabled>
            - Seleccione -
          </option>
          {cryptocurrencies.map((crypto) => (
            <option key={crypto.CoinInfo.Id} value={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Cotizar</button>
    </form>
  );
}

export default CriptoSearchForm;
