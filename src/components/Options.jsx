import React from "react";

function Options() {
  return (
    <div>
      <div className="mydict">
        <div>
          <label>
            <input type="radio" name="radio" checked="" />
            <span>Women</span>
          </label>
          <label>
            <input type="radio" name="radio" />
            <span>Men</span>
          </label>
          <label>
            <input type="radio" name="radio" />
            <span>Divided</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Options;
