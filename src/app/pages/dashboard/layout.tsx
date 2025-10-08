import Header from "@/components/Header";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header page="dashboard" />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </AuthGuard>
  );
}
