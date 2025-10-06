import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header page="dashboard" />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
