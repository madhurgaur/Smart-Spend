"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AddTransactionForm } from "../_components/transaction-form";
import { defaultCategories } from "@/data/categories";
import { getUserAccounts } from "@/actions/dashboard";
import { getTransaction } from "@/actions/transaction";

export default function AddTransactionClient() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [accounts, setAccounts] = useState([]);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const acc = await getUserAccounts();
      setAccounts(acc);

      if (editId) {
        const tx = await getTransaction(editId);
        setInitialData(tx);
      }
    }

    fetchData();
  }, [editId]);

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title">Add Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}
