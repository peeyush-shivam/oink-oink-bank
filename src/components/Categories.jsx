import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

function Categories({ setCategories, categories, setExpense, expense }) {
  const [cat, setCat] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const handleToggle = () => {
    setRemoveCat(false);
    setAddCategory(!addCategory);
  };
  const [removeCat, setRemoveCat] = useState(false);

  console.log("cat", cat);

  console.log("Add Category: ", addCategory, "Remove Category: ", removeCat);

  const handleAddCategories = (event) => {
    setCat(event.target.value);
  };

  const handleCategorySubmit = (event) => {
    event.preventDefault();
    setCategories([...categories, cat]);
    setCat("");
  };

  const handleRemoveCategories = () => {
    setAddCategory(false);
    console.log("Remove Categories Clicked");
    setRemoveCat(!removeCat);
    console.log("Categories to remove", removeCat);
  };

  const handleCategoryChange = (event) => {
    setExpense({ ...expense, category: event.target.value });
  };

  const renderedOptions = () => {
    return categories.map((category) => {
      return (
        <>
          <option key={Math.random() * 99999} value={`${category}`}>
            {category}
          </option>
        </>
      );
    });
  };

  const renderedCategories = () =>
    categories.map((category, index) => (
      <div className="each-category">
        <div>{category}</div>{" "}
        <CancelIcon
          onClick={() => removeCategory(index)}
          style={{ color: "var(--color-error)" }}
        />
      </div>
    ));

  const removeCategory = (index) => {
    console.log("Index of category", index);
    const tempCategories = [...categories];
    console.log("Temporary categories", tempCategories);
    tempCategories.splice(index, 1);
    setCategories(tempCategories);
  };

  return (
    <div className="categories-container">
      <form>
        <label>Select a Category: </label>
        <select
          // defaultValue="Select"
          value="Select"
          onChange={handleCategoryChange}
        >
          <option key={"default"} hidden disabled value="Select">
            Select
          </option>
          {renderedOptions()}
        </select>
        <br />
      </form>

      <p
        style={{
          display: "flex",
          color: "var(--primary-font-color)",
          fontSize: "18px",
          fontWeight: "500",
          // padding: "",
          marginTop: "10px",
        }}
      >
        Add/Remove a Category
      </p>

      {addCategory && (
        <div className="add-category-container">
          <form onSubmit={handleCategorySubmit}>
            <input
              value={cat}
              required
              type="text"
              onChange={handleAddCategories}
            />
            <button type="submit">Done</button>
          </form>
        </div>
      )}
      <div className="button-container">
        <button
          type="button"
          // className="navigation-button"
          onClick={() => handleToggle()}
        >
          Add
        </button>
        <button
          type="button"
          // className="navigation-button"
          onClick={() => handleRemoveCategories()}
        >
          Remove
        </button>
      </div>

      <div className="remove-categories">
        {removeCat && renderedCategories()}
      </div>
    </div>
  );
}

export default Categories;
