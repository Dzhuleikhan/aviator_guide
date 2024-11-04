import { countryCurrencyData } from "../public/data";

export function settingBonusValueAndAmount(countryCode) {
  try {
    const detectedCountry = countryCode.toUpperCase();

    // Find the matching entry in countryCurrencyData
    const matchingCurrencyData = countryCurrencyData.find((currency) =>
      currency.countries.includes(detectedCountry),
    );

    if (matchingCurrencyData) {
      const bonusCurrency = document.querySelectorAll(".bonus-currency");
      const bonusValue = document.querySelectorAll(".bonus-value");

      // Update the bonus amount and currency on the page
      bonusValue.forEach((amount) => {
        amount.innerHTML = matchingCurrencyData.amount;
      });
      bonusCurrency.forEach((cur) => {
        cur.innerHTML = matchingCurrencyData.countryCurrencySymbol;
      });
    } else {
      console.log("No matching country found in the data.");
    }
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }
}
