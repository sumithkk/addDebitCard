import React, { useEffect, useRef } from "react";
import Card from "../components/card";
import { formatCreditCardNumber, formatCVV } from "./cardUtils";
import Dropdown from "../components/dropdown";
import Loading from "./loader";

const PaymentInputs = ({ showToast, setErr }) => {
  const [cardNumber, setCardNumber] = React.useState("");
  const [name, setName] = React.useState("");
  const [expiryM, setExpiryM] = React.useState("");
  const [expiryY, setExpiryY] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [focused, setFocus] = React.useState("");
  const [isloading, setLoading] = React.useState(false);

  //Handle Input changes
  const handleInputChange = (field, e) => {
    const inputData = e.target.value;

    switch (field) {
      case "cardNumber":
        const d = formatCreditCardNumber(inputData);
        setFocus("number");
        setCardNumber(d);
        break;
      case "name":
        setFocus("name");
        setName(inputData);
        break;
      case "cvv":
        setFocus("cvc");
        setCvv(formatCVV(inputData));
        break;
      default:
        break;
    }
  };

  //Handle Dropdown
  const handleDropdown = (field, e) => {
    if (field === "expiryM") {
      setExpiryM(e);
    } else {
      setExpiryY(e);
    }
  };
  useEffect(() => {
    if (expiryM !== "" && expiryY !== "") {
      const expDate = expiryM + expiryY;
      setFocus("expiry");
      setExpiry(expDate);
    }
  }, [expiryM, expiryY]);

  //Handle Submit
  const onSubmit = () => {
    setFocus("number");
    let cardNum = cardNumber.replace(/\D+/g, "");
    if (cardNum.length <= 15) {
      setErr(true);
      showToast("Invalid Card Number !");
      return;
    } else if (cvv.length <= 2) {
      setErr(true);
      showToast("Invalid CVV !");
      return;
    }
    setLoading(true);
    let data = {
      card_number: cardNumber,
      name: name,
      expiry: expiry,
      cvv: cvv,
    };
    console.log(data);

    setTimeout(() => {
      setLoading(false);
      showToast(
        "Form Successfully Submited" + " " + "Data : " + JSON.stringify(data)
      );
      setCardNumber("");
      setName("");
      setExpiryM("");
      setExpiryY("");
      setCvv("");
    }, 3000);
  };

  return (
    <div style={{ width: "100%" }}>
      <form>
        <Card
          number={cardNumber || ""}
          name={name || ""}
          expiry={expiry || ""}
          cvc={cvv || ""}
          locale={{ valid: "Expires" }}
          placeholders={{ name: "Card Holder" }}
          focused={focused}
        />
        <div style={{ position: "relative" }}>
          {isloading && <Loading />}

          <div style={{ marginTop: "20px" }} className="labelWrap">
            <label htmlFor="number">Card Number</label>
            <input
              name="number"
              id="number"
              component="input"
              type="text"
              value={cardNumber}
              pattern="[\d| ]{16,22}"
              style={{ width: "100%" }}
              onFocus={() => setFocus("number")}
              onChange={(e) => handleInputChange("cardNumber", e)}
            />
          </div>
          <div className="labelWrap">
            <label htmlFor="name">Card Holder Name</label>
            <input
              name="name"
              id="name"
              component="input"
              value={name}
              onFocus={() => setFocus("name")}
              onChange={(e) => handleInputChange("name", e)}
              type="text"
              style={{ width: "100%" }}
            />
          </div>
          <div className="labelWrapBtm">
            <div>
              <label htmlFor="expiry">Expires</label>
              <div style={{ display: "flex", margin: "5px 0" }}>
                <Dropdown
                  header={expiryM || "MM"}
                  handleInputChange={handleDropdown}
                  list={[
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                  ]}
                />
                <Dropdown
                  header={expiryY || "YY"}
                  handleInputChange={handleDropdown}
                  list={["2021", "2022", "2023", "2024", "2025", "2026"]}
                />
              </div>
            </div>
            <div className="">
              <div className="label" htmlFor="name">
                CVV
              </div>
              <input
                name="cvc"
                component="input"
                type="text"
                value={cvv}
                pattern="\d{3,4}"
                style={{ width: "120px" }}
                onFocus={() => setFocus("cvc")}
                onChange={(e) => handleInputChange("cvv", e)}
              />
            </div>
          </div>
          <div className="buttons">
            <button
              className="buttonPrimary"
              type="button"
              onClick={(e) => onSubmit(e)}
              disabled={
                cardNumber === "" ||
                name === "" ||
                expiryM === "" ||
                expiryY === "" ||
                cvv === ""
              }
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentInputs;
