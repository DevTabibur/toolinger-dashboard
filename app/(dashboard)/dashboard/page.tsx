import { Button } from "@/components/ui"
import { FiPlus } from "react-icons/fi"

const page = () => {
  return (
    <div>
      <h1>Welcome Message</h1>
      <Button variant="solid" size="lg">Click me</Button>
      <Button variant="outline" size="md" className="ml-3" icon={<FiPlus />}>
        Add New
      </Button>
    </div>
  )
}

export default page