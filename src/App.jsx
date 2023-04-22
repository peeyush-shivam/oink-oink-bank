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

  const dummyData = [
    {
      id: "36947",
      date: "2023-04-21",
      label: "Pizza Hut",
      amount: "25.50",
      description: "Dinner with friends",
      category: "food",
    },
    {
      id: "40164",
      date: "2023-04-20",
      label: "Uber",
      amount: "12.75",
      description: "Ride to the airport",
      category: "travel",
    },
    {
      id: "55780",
      date: "2023-04-19",
      label: "Hilton",
      amount: "150.00",
      description: "One night stay for business trip",
      category: "stay",
    },
    {
      id: "92809",
      date: "2023-04-18",
      label: "Starbucks",
      amount: "5.00",
      description: "Morning coffee",
      category: "food",
    },
    {
      id: "27901",
      date: "2023-04-17",
      label: "Delta",
      amount: "250.00",
      description: "Round-trip flight to New York",
      category: "travel",
    },
    {
      id: "72395",
      date: "2023-04-16",
      label: "Hyatt",
      amount: "300.00",
      description: "Two-night stay for vacation",
      category: "stay",
    },
    {
      id: "16020",
      date: "2023-04-15",
      label: "Chipotle",
      amount: "12.00",
      description: "Lunch with coworkers",
      category: "food",
    },
    {
      id: "67369",
      date: "2023-04-14",
      label: "Lyft",
      amount: "20.00",
      description: "Ride to the concert",
      category: "travel",
    },
    {
      id: "85463",
      date: "2023-04-13",
      label: "Marriott",
      amount: "200.00",
      description: "One-night stay for anniversary",
      category: "stay",
    },
    {
      id: "99838",
      date: "2023-04-12",
      label: "McDonalds",
      amount: "7.50",
      description: "Late night snack",
      category: "food",
    },
    {
      id: "13427",
      date: "2023-04-11",
      label: "Greyhound",
      amount: "50.00",
      description: "Bus ride to visit family",
      category: "travel",
    },
    {
      id: "40782",
      date: "2023-04-10",
      label: "Airbnb",
      amount: "100.00",
      description: "One-night stay for weekend trip",
      category: "stay",
    },
    {
      id: "59245",
      date: "2023-04-09",
      label: "Subway",
      amount: "6.00",
      description: "Quick lunch",
      category: "food",
    },
    {
      id: "91978",
      date: "2023-04-08",
      label: "Amtrak",
      amount: "150.00",
      description: "Train ride to visit friends",
      category: "travel",
    },
    {
      id: "90203",
      date: "2022-03-15",
      label: "Lunch",
      amount: "12.50",
      description: "Burger and fries",
      category: "food",
    },
    {
      id: "64897",
      date: "2022-03-17",
      label: "Hotel",
      amount: "150.00",
      description: "1-night stay at Hilton",
      category: "stay",
    },
    {
      id: "26138",
      date: "2022-03-18",
      label: "Dinner",
      amount: "35.75",
      description: "Pasta and wine",
      category: "food",
    },
    {
      id: "72642",
      date: "2022-03-20",
      label: "Airfare",
      amount: "450.00",
      description: "Round-trip flight to London",
      category: "travel",
    },
    {
      id: "89152",
      date: "2022-03-21",
      label: "Breakfast",
      amount: "8.99",
      description: "Coffee and croissant",
      category: "food",
    },
    {
      id: "31259",
      date: "2022-03-22",
      label: "Hotel",
      amount: "120.00",
      description: "2-night stay at Holiday Inn",
      category: "stay",
    },
    {
      id: "48463",
      date: "2022-03-24",
      label: "Dinner",
      amount: "45.25",
      description: "Steak and potatoes",
      category: "food",
    },
    {
      id: "77693",
      date: "2022-03-26",
      label: "Airfare",
      amount: "300.00",
      description: "One-way flight to Paris",
      category: "travel",
    },
    {
      id: "10641",
      date: "2022-03-27",
      label: "Lunch",
      amount: "10.99",
      description: "Sandwich and chips",
      category: "food",
    },
    {
      id: "52940",
      date: "2022-03-29",
      label: "Hotel",
      amount: "80.00",
      description: "1-night stay at Motel 6",
      category: "stay",
    },
    {
      id: "72486",
      date: "2022-04-02",
      label: "Dinner",
      amount: "20.50",
      description: "Pizza and soda",
      category: "food",
    },
    {
      id: "11852",
      date: "2022-04-05",
      label: "Airfare",
      amount: "600.00",
      description: "Round-trip flight to Tokyo",
      category: "travel",
    },
    {
      id: "85326",
      date: "2022-04-06",
      label: "Breakfast",
      amount: "12.99",
      description: "Eggs and bacon",
      category: "food",
    },
    {
      id: "40216",
      date: "2022-04-07",
      label: "Hotel",
      amount: "200.00",
      description: "2-night stay at Ritz Carlton",
      category: "stay",
    },
  ];

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
