// src/components/ExpenseList.tsx
import { useExpenseContext, Expense } from "../context/expenseContext";

interface ExpenseListProps {
    expenses: Expense[];
  }


const ExpenseList = () => {
    const { state, removeExpense } = useExpenseContext();
  
    return (
      <div>
        <h2>Expenses</h2>
        <ul>
          {state.expenses.map((expense) => (
            <li key={expense.id}>
              {expense.description} - ${expense.amount}
              <button onClick={() => removeExpense(expense.id, expense.user_id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
export default ExpenseList;
