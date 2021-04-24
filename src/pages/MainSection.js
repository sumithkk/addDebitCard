import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSound from "use-sound";
import PaymentInputs from "../components/paymentInputs";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  padding: 135px 50px 50px;
  margin: 0 auto;
  margin-top: 230px;

  @media only screen and (min-width: 600px) {
    width: 28%;
  }
`;

const Toast = styled.div`
  position: fixed;
  padding: 20px;
  background: #3e3e3e;
  color: #fff;
  left: 0;
  right: 0;
  font-weight: bold;
  bottom: 15px;
  border-radius: 4px;
  width: 90%;
  transition: 2s all ease;
  margin: 0 auto;
  max-width: 600px;
  &.error {
    background: #b00020;
  }
`;

const MainSection = () => {
  const [toast, setToast] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);

  const showToast = (message) => {
    setMsg(message);
    setToast(true);
    setTimeout(() => {
      setToast(false);
      setErr(false);
    }, 2000);
  };
  return (
    <Wrapper>
      <PaymentInputs showToast={showToast} setErr={setErr} />
      {toast && <Toast className={err ? "error" : ""}>{msg}</Toast>}
    </Wrapper>
  );
};
export default MainSection;
