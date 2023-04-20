import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Expense from "./components/Expense";
import Categories from "./components/Categories";
import ExpenseList from "./components/ExpenseList";

function App() {
  const getExpensesFromLS = () => {
    const data = localStorage.getItem("Expenses");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const getCategoriesFromLS = () => {
    const data = localStorage.getItem("Categories");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [expenses, setExpenses] = useState(getExpensesFromLS());

  const [categories, setCategories] = useState(getCategoriesFromLS());

  const now = new Date();

  const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

  const [expense, setExpense] = useState({
    id: `${(Math.random() * 99999).toFixed(0)}`,
    date: `${date}`,
    label: "",
    amount: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    localStorage.setItem("Expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("Categories", JSON.stringify(categories));
  }, [categories]);

  console.log("All Expenses: ", expenses);

  console.log("All Categories: ", categories);

  return (
    <Router>
      <div className="app-container">
        <div className="navigation-container">
          <button className="navigation-button">
            <Link
              style={{
                textDecoration: "none",
                fontFamily: "Josefin Sans, sans-serif",
                fontSize: "16px",
                fontWeight: "600",
                color: "var(--primary-font-color)",
              }}
              to="/"
            >
              Add Expenses
            </Link>
          </button>
          <button className="navigation-button">
            <Link
              style={{
                textDecoration: "none",
                fontFamily: "Josefin Sans, sans-serif",
                fontSize: "16px",
                fontWeight: "600",
                color: "var(--primary-font-color)",
                alignItems: "center",
              }}
              to="/expenses"
            >
              View Expenses
            </Link>
          </button>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Expense
                  setExpenses={setExpenses}
                  expenses={expenses}
                  expense={expense}
                  setExpense={setExpense}
                  date={date}
                />
                <Categories
                  setCategories={setCategories}
                  categories={categories}
                  expense={expense}
                  setExpense={setExpense}
                />
              </>
            }
          ></Route>
          <Route
            path="/expenses"
            element={
              <ExpenseList expenses={expenses} setExpenses={setExpenses} />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
