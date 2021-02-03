import React from "react";
import styled from "styled-components";

const Copy = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  background: #4e9caf;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  color: white;
`;
const Redirect = styled.a`
  padding: 10px;
  border: none;
  text-decoration: none;
  background: #4e9caf;
  padding: 10px;
  margin: 0 10px;
  text-align: center;
  border-radius: 5px;
  color: white;
`;

const Dropdown = ({ results, handleCopy, cursor }) => {
  return (
    <div className="dropdown">
      {results.length > 0 ? (
        results.map((result, i) => (
          <div key={i} className={`dropList ${cursor === i ? "active" : null}`}>
            <img src={result.images.preview_gif.url} alt="gifImg" />
            <div className="listDesc">
              <h1>{result.title}</h1>
              <div>
                <Copy
                  type="button"
                  // ref={elRefs[i]}
                  onClick={() => handleCopy(result.url)}
                >
                  Copy
                </Copy>
                <Redirect href={result.url}>Redirect</Redirect>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ padding: "20px", color: "#fff" }}>No results found</div>
      )}
    </div>
  );
};
export default Dropdown;
