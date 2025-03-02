import { useExpenseContext } from "../context/expenseContext";
import { useUserContext } from "../context/userContext";
import { useState } from "react";

const AddExpense = () => {
  const { addExpense } = useExpenseContext();
  const { user } = useUserContext();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    await addExpense({ description, amount: parseFloat(amount), category, user_id: user.id });
    setDescription("");
    setAmount("");
    


  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" required />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Transport</option>
        <option>Bills</option>
        <option>Entertainment</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;