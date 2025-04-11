import { defaultCategories } from "@/data/categories";
import { getUserAccounts } from "@/actions/dashboard";
import { getTransaction } from "@/actions/transaction";
import AddTransactionClient from "./client";

export default async function AddTransactionPage({ searchParams }) {
  const accounts = await getUserAccounts();

  const editId = searchParams?.edit || null;
  let initialData = null;

  if (editId) {
    initialData = await getTransaction(editId);
  }

  return (
    <AddTransactionClient
      accounts={accounts}
      initialData={initialData}
      editId={editId}
    />
  );
}
