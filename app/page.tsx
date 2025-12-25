import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui"
import { FiPlus } from "react-icons/fi"
import AuthGuard from "@/guards/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <div>
          <h1>Welcome Message</h1>
          <Button variant="solid" size="lg">Click me</Button>
          <Button variant="outline" size="md" className="ml-3" icon={<FiPlus />}>
            Add New
          </Button>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
