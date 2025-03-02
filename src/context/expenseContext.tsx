import { createContext, useReducer, useContext, useEffect } from "react";
import { useUserContext } from "../context/userContext"; // Assuming you have userContext
import expenseService from "../services/expenseService";

// Define types for expense and the state
export type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
  user_id: string;
};

type ExpenseState = {
  expenses: Expense[];
  categories: string[];
};

type ExpenseAction =
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "REMOVE_EXPENSE"; payload: number }
  | { type: "SET_EXPENSES"; payload: Expense[] };

const initialState: ExpenseState = {
  expenses: [],
  categories: ["Food", "Transport", "Bills", "Entertainment"],
};

const expenseReducer = (state: ExpenseState, action: ExpenseAction): ExpenseState => {
  switch (action.type) {
    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "REMOVE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    default:
      return state;
  }
};

const ExpenseContext = createContext<{ state: ExpenseState; dispatch: React.Dispatch<ExpenseAction> } | undefined>(undefined);

export const ExpenseProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const { user } = useUserContext(); // Get user from UserContext

  // Fetch expenses from Supabase for the current user
  useEffect(() => {
    const fetchExpenses = async () => {
      if (user?.id) {
        const { data, error } = await expenseService.fetchExpenses(user.id); // Pass user.id
        if (error) {
          console.error("Error fetching expenses:", error.message);
        } else if (data) {
          dispatch({ type: "SET_EXPENSES", payload: data });
        }
      }
    };

    fetchExpenses();
  }, [user]); // Re-run when user changes

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }

  const { state, dispatch } = context;

  // Add Expense
  const addExpense = async (expense: Omit<Expense, "id">) => {
    if (!expense.user_id) {
      console.error("User ID is required");
      return;
    }

    const { data, error } = await expenseService.addExpense(expense, expense.user_id);
    if (error) {
      console.error("Error adding expense:", error.message);
    } else {
      dispatch({ type: "ADD_EXPENSE", payload: data });
    }
  };

  // Remove Expense
  const removeExpense = async (id: number, user_id: string) => {
    const { error } = await expenseService.removeExpense(id, user_id);
    if (error) {
      console.error("Error deleting expense:", error.message);
    } else {
      dispatch({ type: "REMOVE_EXPENSE", payload: id });
    }
  };

  return { state, addExpense, removeExpense };
};
