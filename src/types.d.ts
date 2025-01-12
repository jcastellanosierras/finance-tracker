declare namespace ExpenseTracker {
  interface Category {
    id: string;
    user_id: string;
    name: string;
    created_at: string;
  }

  interface Expense {
    id: string;
    user_id: string;
    category_id: string;
    amount: number;
    description: string;
    date: string;
    created_at: string;
    category: {
      name: string;
    };
  }
}

