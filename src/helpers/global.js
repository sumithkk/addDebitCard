import styled, { css, createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

#root {
  max-width: 100%;
  margin: 0 auto;
}
html {
  font-family: Tahoma, Sans-Serif;
}

body{
  background-color: #D4EBFD;
}

h1 {
  line-height: 1.4;
}
p {
  line-height: 1.3;
}
input {
  margin: 5px 0;
  padding: 12px;
  color: #444;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1rem;
  outline: none;
}
label, .label {
  font-size: .8rem;
  color: #666;
}
.buttonPrimary {
  margin-top: 30px;
  background: #EE7310;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  font-weight: 700;
}
button:disabled,
button[disabled]{
  opacity: .5;
  cursor: not-allowed;
}
.labelWrap {
  margin: 10px 0;
}
.labelWrapBtm {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.dropdown-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.dropdown-menu {
  position: relative;
  border: #ccc solid thin;
  border-radius: 5px;
  margin-right: 20px;
  button {
    border: none;
    justify-content: space-between;
    color: #444;
    svg {
      height: 15px;
      transition: .2s all ease;
    }
    .arrow-up {
      transform: rotate(180deg);
      
    }
  }
}

.dropdown-header {
  background-color: #fff;
  padding: 12px 15px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 120px;
}

.dropdown-menu-items {
  position: absolute;
}

.dropdown-menu-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #fff;
  padding: 5px 15px;
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  position: relative;
  z-index: 100;
  font-weight: 600;
}

.grey-icons {
  color: grey;
  margin-left: 5px;
}

.grey-background {
  background-color: rgb(224, 224, 224);
}


//Loader Icon 

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #f18a32;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}


`;
