import React, { useState } from "react";
import Arrow from "../components/svgComponents/up-arrow";

const Dropdown = (props) => {
  let list = props.list;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [header, setHeader] = useState(props.header);
  const items = listToMapWithProperties(list, header);

  // Function to make a Map with properties: selected, item and id from List
  function listToMapWithProperties(list, header) {
    let items = [];
    for (let i = 0; i < list.length; i++) {
      var newItem = new Object();

      if (header === list[i]) {
        newItem.selected = true;
      } else {
        newItem.selected = false;
      }
      newItem.item = list[i];
      newItem.id = i;

      items.push(newItem);
    }
    return items;
  }

  const toggleList = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const selectItem = (item) => {
    setHeader(item.item);
    setIsMenuOpen(!isMenuOpen);
    if (props.header === "MM") {
      props.handleInputChange("expiryM", item.item);
    } else {
      props.handleInputChange("expiryY", item.item);
    }
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-menu">
        <button type="button" className="dropdown-header" onClick={toggleList}>
          <div className="dropdown-title">{header}</div>
          <Arrow className={!isMenuOpen ? "arrow-up" : ""} />
        </button>
        {isMenuOpen && (
          <div className="dropdown-menu-items">
            {items.map((item) => (
              <button
                type="button"
                className={`dropdown-menu-item ${
                  item.id % 2 ? "" : "grey-background"
                }`}
                key={item.id}
                onClick={() => selectItem(item)}
              >
                {item.item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
