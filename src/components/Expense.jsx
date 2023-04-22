function Expense({
  setExpenses,
  expenses,
  expense,
  setExpense,
  date,
  split,
  setSplit,
}) {
  const handleLabelChange = (event) => {
    // console.log(event);
    setExpense({ ...expense, label: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setExpense({ ...expense, description: event.target.value });
  };

  const handleAmountChange = (event) => {
    setExpense({ ...expense, amount: event.target.value });
  };

  const handleSplitChange = (event) => {
    setExpense({ ...expense, splitCount: event.target.value });
  };

  const handleExpenses = (event) => {
    event.preventDefault();
    console.log("Add Expense clicked.");
    setExpenses([...expenses, expense]);
    setExpense({
      id: `${(Math.random() * 99999).toFixed(0)}`,
      label: "",
      date: `${date}`,
      amount: "",
      description: "",
      category: "",
    });
  };

  return (
    <div className="expenses-container">
      <p>Add an Expense</p>
      <form onSubmit={handleExpenses}>
        <label>Label: </label>
        <input
          required
          type="text"
          value={expense.label}
          placeholder="Ex: I nom you 💋"
          onChange={handleLabelChange}
        />{" "}
        <br />
        <br />
        <label>Description: </label>
        <input
          required
          type="text"
          value={expense.description}
          placeholder="Ex: Ju a bad bitch!! 🥵"
          onChange={handleDescriptionChange}
          style={{ height: "3rem", wordWrap: "normal" }}
        />{" "}
        <br />
        <br />
        <label> Amount: </label>
        <input
          required
          type="number"
          placeholder="Ex: It is priceless ✨"
          value={expense.amount}
          onChange={handleAmountChange}
        />
        <br />
        <br />
        <div className="d-flex" style={{ width: "80%" }}>
          <button
            type="submit"
            className="navigation-button"
            // style={{ marginTop: "10px" }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default Expense;
