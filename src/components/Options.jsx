import { useSelected } from "../context/FormContext";

function Options() {
  const { setSelected } = useSelected();

  const handleSelected = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <div class="container">
        <div class="radio-tile-group">
          <div class="input-container">
            <input
              id="walk"
              class="radio-button"
              type="radio"
              name="radio"
              value="XS"
              onClick={(e) => handleSelected(e)}
            />
            <div class="radio-tile">
              <label for="walk" class="radio-tile-label">
                XS
              </label>
            </div>
          </div>

          <div class="input-container">
            <input
              id="bike"
              class="radio-button"
              type="radio"
              name="radio"
              value="S"
              onClick={(e) => handleSelected(e)}
            />
            <div class="radio-tile">
              <label for="bike" class="radio-tile-label">
                S
              </label>
            </div>
          </div>

          <div class="input-container">
            <input
              id="drive"
              class="radio-button"
              type="radio"
              name="radio"
              value="M"
              onClick={(e) => handleSelected(e)}
            />
            <div class="radio-tile">
              <label for="drive" class="radio-tile-label">
                M
              </label>
            </div>
          </div>

          <div class="input-container">
            <input
              id="drive"
              class="radio-button"
              type="radio"
              name="radio"
              value="L"
              onClick={(e) => handleSelected(e)}
            />
            <div class="radio-tile">
              <label for="drive" class="radio-tile-label">
                L
              </label>
            </div>
          </div>

          <div class="input-container">
            <input
              id="drive"
              class="radio-button"
              type="radio"
              name="radio"
              value="XL"
              onClick={(e) => handleSelected(e)}
            />
            <div class="radio-tile">
              <label for="drive" class="radio-tile-label">
                XL
              </label>
            </div>
          </div>
          <div class="input-container">
            <input
              id="drive"
              class="radio-button"
              type="radio"
              name="radio"
              value="XXL"
              onClick={(e) => handleSelected(e)}
            />
            <div class="radio-tile">
              <label for="drive" class="radio-tile-label">
                XXL
              </label>
            </div>
          </div>
          <div class="input-container">
            <input
              id="drive"
              class="radio-button"
              type="radio"
              name="radio"
              value=" XXXL"
              onClick={(e) => handleSelected(e)}
            />
            <div class="radio-tile">
              <label for="drive" class="radio-tile-label">
                XXXL
              </label>
            </div>
          </div>
          <div class="input-container">
            <input
              id="drive"
              class="radio-button"
              type="radio"
              name="radio"
              value="N/A"
              onClick={(e) => handleSelected(e)}
            />
            <div class="radio-tile">
              <label for="drive" class="radio-tile-label">
                NA
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
