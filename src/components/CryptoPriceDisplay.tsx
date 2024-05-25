import { useMemo } from "react";
import { useCryptoStore } from "../store";
import Spinner from "./Spinner";

function CryptoPriceDisplay() {
  const result = useCryptoStore((state) => state.result);
  const loading = useCryptoStore((state) => state.loading);
  const hasResult = useMemo(() => Object.values(result).includes(""), [result]);
  const justNow = result.LASTUPDATE === "Just now" ? "Hace un momento" : "";

  return (
    <div className="result">
      {loading ? (
        <Spinner />
      ) : (
        !hasResult && (
          <>
            <h2 className="result-title">Cotización</h2>
            <div className="result-content">
              <div>
                <img
                  src={`https://cryptocompare.com${result.IMAGEURL}`}
                  alt="Imagen de criptomoneda"
                />
              </div>
              <div>
                <p>
                  Precio: <strong>{result.PRICE}</strong>
                </p>
                <p>
                  Precio mas alto del día: <strong>{result.HIGHDAY}</strong>
                </p>
                <p>
                  Precio mas bajo del día: <strong>{result.LOWDAY}</strong>
                </p>
                <p>
                  Variación últimas 24 horas:{" "}
                  <strong>{result.CHANGEPCT24HOUR}%</strong>
                </p>
                <p>
                  Última actualización: <strong>{justNow}</strong>
                </p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default CryptoPriceDisplay;
