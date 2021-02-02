import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import config from "../../config";
import useDebounce from "../helpers/customHooks";
import Search from "../components/svgComponents/search";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.div`
  position: relative;
  background: transparent;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    width: 100%;
  }
  .search {
    display: flex;
    position: relative;
    width: 55%;
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
    .searchTopBefore {
      position: absolute;
      bottom: 47px;
      left: -62px;
      right: 0;
      margin: 0 auto;
      z-index: 3;
    }
    input {
      font-size: 1rem;
      width: 100%;
      padding: 15px;
      padding-left: 40px;
      outline: none;
      color: #92abcf;
      background: transparent;
      border: 1px solid #92abcf;
    }
    svg {
      position: absolute;
      top: 14px;
      left: 14px;
      fill: #92abcf;
    }
  }
  .dropdown {
    position: absolute;
    top: 57px;
    left: 0;
    width: 100%;
    max-height: 365px;
    overflow-y: scroll;
    .dropList {
      display: flex;
      padding: 15px;
      background-color: #24364e;
      color: #92abcf;
      width: 100%;

      img {
        margin-right: 20px;
        max-width: 60px;
      }
      .listDesc {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        h1 {
          font-size: 1rem;
          margin: 0 0 8px 0;
        }
      }
    }
  }
`;
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

const Toast = styled.div`
  display: none;
  position: fixed;
  padding: 10px;
  background: #1a1a1a;
  color: #fff;
  left: 0;
  right: 0;
  bottom: 15px;
  border-radius: 4px;
  width: 90%;
  margin: 0 auto;
`;
const BounceBall = styled.div`
  .bounceball {
    display: inline-block;
    height: 37px;
    width: 15px;
    position: absolute;
    left: 15px;
    top: 15px;
  }
  .bounceball:before {
    position: absolute;
    content: "";
    display: block;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ea4c89;
    transform-origin: 50%;
    animation: bounce 500ms alternate infinite ease;
  }
  @keyframes bounce {
    0% {
      top: 20px;
      height: 5px;
      border-radius: 60px 60px 20px 20px;
      transform: scaleX(2);
    }
    35% {
      height: 15px;
      border-radius: 50%;
      transform: scaleX(1);
    }
    100% {
      top: 0;
    }
  }
`;

const MainSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDrop, toggleDrop] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchError, setSearchError] = useState("");
  const toastRef = useRef();

  const getGifs = async (query) => {
    let url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${config.apikey}&limit=5`;
    let res = await fetch(url);
    const json = await res.json();
    if (json.meta.status === 200) {
      setResults(json.data);
      setIsSearching(false);
      toggleDrop(true);
    } else {
      setSearchError(json.error);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      getGifs(debouncedSearchTerm);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  const handleCopy = (url) => {
    const el = document.createElement("textarea");
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    toastRef.current.style.display = "block";
    document.body.removeChild(el);
    setTimeout(() => {
      toastRef.current.style.display = "none";
    }, 1000);
  };

  return (
    <Wrapper>
      <SearchBar>
        <div className="search">
          <form>
            <label htmlFor="search">
              <input
                placeholder="Search Gif's"
                name="search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </form>
          {isSearching ? (
            <BounceBall>
              <div className="bounceball" />
            </BounceBall>
          ) : (
            <Search width="20px" height="20px" />
          )}

          {showDrop && (
            <div className="dropdown">
              {results.length > 0 ? (
                results.map((result, i) => (
                  <div className="dropList" key={i}>
                    <img
                      src={result.images.preview_gif.url}
                      alt="superheroList"
                    />
                    <div className="listDesc">
                      <h1>{result.title}</h1>
                      <div>
                        <Copy onClick={() => handleCopy(result.url)}>Copy</Copy>
                        <Redirect type="button" href={result.url}>
                          Redirect
                        </Redirect>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "20px", color: "#fff" }}>
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      </SearchBar>
      <Toast ref={toastRef}>Url Copied to Clipboard</Toast>
    </Wrapper>
  );
};
export default MainSection;