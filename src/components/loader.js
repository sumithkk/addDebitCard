import React from "react";
import styled from "styled-components";

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #ffffff9c;
  z-index: 1;
`;
const Loading = () => {
  return (
    <Loader>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </Loader>
  );
};

export default Loading;
