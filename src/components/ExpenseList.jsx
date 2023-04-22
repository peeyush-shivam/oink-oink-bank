import { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

function ExpenseList({ expenses, setExpenses }) {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [categories, setCategories] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryWiseExpenses, setCategoryWiseExpenses] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const categories = [
      ...new Set(expenses.map((expense) => expense.category)),
    ];
    setCategories(categories);
    setFilteredExpenses(expenses);
  }, [expenses]);

  useEffect(() => {
    const total = expenses.reduce(
      (acc, expense) => acc + parseInt(expense.amount),
      0
    );
    setTotalExpenses(total);

    const categoryWise = {};
    filteredExpenses.forEach((expense) => {
      if (expense.category in categoryWise) {
        categoryWise[expense.category] += parseInt(expense.amount);
      } else {
        categoryWise[expense.category] = parseInt(expense.amount);
      }
    });
    setCategoryWiseExpenses(categoryWise);
  }, [filteredExpenses]);

  const handleFilter = (category) => {
    if (category === "All") {
      setFilteredExpenses(expenses);
    } else {
      const filtered = expenses.filter(
        (expense) => expense.category === category
      );
      setFilteredExpenses(filtered);
    }
    setCurrentPage(1); // reset page number when filter changes
  };

  const handleRemove = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
  };

  const formatMoney = (amount) => {
    return "€ " + Math.round(amount.toFixed(2));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExpenses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="view-expenses-container">
      <div className="filter-container">
        <label>Filter Expenses: </label>
        <select onChange={(e) => handleFilter(e.target.value)}>
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="table-responsive expense-table">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date.split("/").slice(0, 2).join("/")}</td>
                <td style={{ maxWidth: "200px" }}>{expense.label}</td>
                <td>{expense.category}</td>
                <td style={{ maxWidth: "200px" }}>{expense.description}</td>
                <td>{formatMoney(parseInt(expense.amount))}</td>
                <td>
                  <CancelIcon
                    onClick={() => handleRemove(expense.id)}
                    style={{ color: "var(--color-error)" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={prevPage}>Prev</button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
        <button onClick={nextPage}>Next</button>
      </div>
      <div className="expense-totals">
        <h3>
          Total Expenses: <span>{formatMoney(totalExpenses)}</span>
        </h3>
        <div className="d-flex align-items-center justify-content-center">
          <p>Expenses by Category</p>
          <button className="show-button" onClick={handleShow}>
            Show
          </button>
        </div>

        <div className="d-flex  gap-2 flex-wrap">
          {show &&
            Object.entries(categoryWiseExpenses).map(([category, amount]) => (
              <div className="expense-category" key={category}>
                {category}: <span>{formatMoney(amount)}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;
