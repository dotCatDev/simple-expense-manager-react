import "../styles/main.scss";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { useExpenseContext } from "../context/expenseContext";  // Custom context hook


const Home: React.FC = () => {
  const { state } = useExpenseContext();
  const expenses = state.expenses;
  
  return (
    <div className="container-fluid">
      <h1 className="text-center mb-4">Expense Manager</h1>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};

export default Home;
