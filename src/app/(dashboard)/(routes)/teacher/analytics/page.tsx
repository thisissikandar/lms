import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getAnalytics } from "../../../../../../acttions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

export default async function page() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const { data, totalRevanue, totalSales } = await getAnalytics(userId);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revanue" value={totalRevanue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data}/>
    </div>
  );
}
