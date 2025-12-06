"use client";
import React, { useState } from "react";
import {
  Button,
  Alert,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  DashboardBreadcrumb,
  Drawer,
  Dropdown,
  FileUpload,
  Input,
  MessageBox,
  Modal,
  ModalTriggerButton,
  NotificationButton,
  Pagination,
  Scrollbar,
  Select,
  Skeleton,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  Textarea
} from "@/components/ui";
import { FiMoreVertical, FiEdit, FiTrash, FiHome, FiUser, FiSettings } from "react-icons/fi";

export default function TestPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-4">UI Component Library Test</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="solid" loading>Loading</Button>
          <NotificationButton count={3} />
          <ModalTriggerButton onOpen={() => setIsModalOpen(true)}>Open Modal</ModalTriggerButton>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Alerts</h2>
        <Alert variant="primary" title="Primary Alert">This is a primary alert.</Alert>
        <Alert variant="success" title="Success Alert">Operation completed successfully.</Alert>
        <Alert variant="warning" title="Warning Alert">Please check your inputs.</Alert>
        <Alert variant="danger" title="Danger Alert">Something went wrong.</Alert>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Badges</h2>
        <div className="flex gap-2">
          <Badge variant="solid" color="primary">Primary</Badge>
          <Badge variant="outline" color="secondary">Secondary</Badge>
          <Badge variant="soft" color="success">Success</Badge>
          <Badge variant="solid" color="danger">Danger</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><h3 className="font-semibold">Card Title</h3></CardHeader>
            <CardBody><p>This is the card body content.</p></CardBody>
            <CardFooter><Button size="sm">Action</Button></CardFooter>
          </Card>
          <Card noPadding className="flex items-center justify-center p-10 bg-zinc-50 dark:bg-zinc-900 border-dashed">
            <p className="text-zinc-500">Custom Content Card</p>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Username" placeholder="Enter username" />
          <Input label="Email" error="Invalid email" placeholder="Enter email" />
          <Select
            label="Role"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" }
            ]}
          />
          <Textarea label="Bio" placeholder="Tell us about yourself" />
          <Checkbox label="I agree to terms" />
          <FileUpload onFileSelect={(files) => console.log(files)} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Navigation & Overlay</h2>
        <div className="flex flex-col gap-4">
          <DashboardBreadcrumb items={[{ label: "Section", href: "#" }, { label: "Current Page" }]} />
          <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
          <Button onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Data Display</h2>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell><Badge variant="soft" color="success">Active</Badge></TableCell>
                <TableCell>
                  <Dropdown
                    trigger={<Button variant="ghost" size="sm" icon={<FiMoreVertical />} />}
                    items={[
                      { label: "Edit", icon: <FiEdit /> },
                      { label: "Delete", icon: <FiTrash />, color: "danger" }
                    ]}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Skeleton</h3>
            <Skeleton height="100px" />
            <Skeleton width="50%" />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Tabs</h3>
            <Tabs
              tabs={[
                { label: "Profile", icon: <FiUser />, content: <div className="p-4 bg-zinc-50 rounded">Profile Content</div> },
                { label: "Settings", icon: <FiSettings />, content: <div className="p-4 bg-zinc-50 rounded">Settings Content</div> }
              ]}
            />
          </div>

          <div className="space-y-2 max-w-md">
            <h3 className="text-sm font-medium">Messages</h3>
            <MessageBox sender="other" message="Hello there!" timestamp="10:00 AM" />
            <MessageBox sender="me" message="Hi! How can I help?" timestamp="10:01 AM" />
          </div>
        </div>
      </section>

      {/* Overlays */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Test Drawer">
        <div className="space-y-4">
          <p>Drawer content allows for side-panel interactions.</p>
        </div>
      </Drawer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Test Modal">
        <div className="space-y-4">
          <p>Modal content allows for focused interactions.</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}