import { supabase } from "../lib/supabase"; // Import Supabase client


// Fetch all expenses from Supabase
const fetchExpenses = async (userId: string) => {
    const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId); // Filter by user_id field
    return { data, error };
};

// Add an expense to Supabase
const addExpense = async (
    expense: { description: string; amount: number; category: string },
    userId: string
  ) => {
    const { data, error } = await supabase
      .from("expenses")
      .insert([{ ...expense, user_id: userId }]) // Include user_id in the insert
      .select()
      .single();
    return { data, error };
  };

// Remove an expense from Supabase
const removeExpense = async (expenseId: number, userId: string) => {
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", expenseId) // Match by expense ID
      .eq("user_id", userId); // Ensure the user is deleting their own expense
    return { error };
  };

export default { fetchExpenses, addExpense, removeExpense };
