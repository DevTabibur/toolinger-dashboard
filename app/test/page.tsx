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
  Textarea,
  // New Components
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AspectRatio,
  Avatar,
  ButtonGroup,
  Carousel,
  DatePicker,
  Field,
  Kbd,
  Label,
  Progress,
  Separator,
  Slider,
  Spinner,
  Switch,
  Toggle,
  Tooltip,
  Typography
} from "@/components/ui";
import { FiMoreVertical, FiEdit, FiTrash, FiHome, FiUser, FiSettings, FiBold, FiItalic, FiUnderline } from "react-icons/fi";

export default function TestPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date>();
  const [switchVal, setSwitchVal] = useState(false);
  const [togglePressed, setTogglePressed] = useState(false);

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <Typography variant="h2" className="mb-6">UI Component Library Test</Typography>

      {/* --- Batch 1 Components --- */}
      <section className="space-y-4">
        <Typography variant="h3">Basic Elements</Typography>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="solid" loading>Loading</Button>
          <NotificationButton count={3} />
        </div>
        <div className="flex gap-2">
          <Badge variant="solid" color="primary">Primary</Badge>
          <Badge variant="outline" color="secondary">Secondary</Badge>
          <Badge variant="soft" color="success">Success</Badge>
          <Badge variant="solid" color="danger">Danger</Badge>
        </div>
        <Alert variant="primary" title="Primary Alert">This is a primary alert.</Alert>
      </section>

      {/* --- Batch 2 Components --- */}
      <section className="space-y-6">
        <Typography variant="h3">Extended Components (Batch 2)</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Typography & Kbd */}
          <Card>
            <CardHeader><Typography variant="h4">Typography & Kbd</Typography></CardHeader>
            <CardBody className="space-y-2">
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="lead">Lead text for main descriptions.</Typography>
              <Typography variant="p">Standard paragraph text.</Typography>
              <Typography variant="muted">Muted text.</Typography>
              <div className="mt-4">
                <Typography variant="small">Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search</Typography>
              </div>
            </CardBody>
          </Card>

          {/* Forms Extended */}
          <Card>
            <CardHeader><Typography variant="h4">Extended Forms</Typography></CardHeader>
            <CardBody className="space-y-4">
              <Field label="Switch Toggle">
                <div className="flex items-center gap-2">
                  <Switch checked={switchVal} onChange={setSwitchVal} />
                  <Label>Enable Notifications</Label>
                </div>
              </Field>
              <DatePicker label="Pick a Date" value={date} onChange={setDate} />
              <Field label="Volume Slider">
                <Slider min={0} max={100} step={5} value={50} />
              </Field>
              <div className="flex gap-2">
                <Toggle pressed={togglePressed} onPressedChange={setTogglePressed}><FiBold /></Toggle>
                <Toggle><FiItalic /></Toggle>
                <ButtonGroup>
                  <Button variant="outline" size="sm">Left</Button>
                  <Button variant="outline" size="sm">Center</Button>
                  <Button variant="outline" size="sm">Right</Button>
                </ButtonGroup>
              </div>
            </CardBody>
          </Card>

          {/* Data Display */}
          <Card>
            <CardHeader><Typography variant="h4">Data Display</Typography></CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar src="https://github.com/shadcn.png" fallback="CN" />
                <Avatar fallback="JD" className="bg-blue-100 text-blue-600" />
                <Tooltip content="This is a tooltip">
                  <Button variant="outline" size="sm">Hover Me</Button>
                </Tooltip>
              </div>
              <Separator />
              <Progress value={60} label />
              <Separator />
              <Spinner size="lg" />
            </CardBody>
          </Card>

          {/* Accordion & Carousel */}
          <Card>
            <CardHeader><Typography variant="h4">Interactive</Typography></CardHeader>
            <CardBody className="space-y-4">
              <Accordion>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Accordion Item 1</AccordionTrigger>
                  <AccordionContent>Content for item 1.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Accordion Item 2</AccordionTrigger>
                  <AccordionContent>Content for item 2.</AccordionContent>
                </AccordionItem>
              </Accordion>

              <Carousel height="h-32" className="bg-zinc-100 dark:bg-zinc-800">
                <div className="flex items-center justify-center h-full">Slide 1</div>
                <div className="flex items-center justify-center h-full bg-zinc-200 dark:bg-zinc-700">Slide 2</div>
                <div className="flex items-center justify-center h-full">Slide 3</div>
              </Carousel>
            </CardBody>
          </Card>

          {/* Aspect Ratio */}
          <Card>
            <CardHeader><Typography variant="h4">Aspect Ratio (16/9)</Typography></CardHeader>
            <CardBody>
              <AspectRatio ratio={16 / 9} className="bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center justify-center">
                <Typography variant="muted">Image Placeholder</Typography>
              </AspectRatio>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="flex gap-4">
        <Button onClick={() => setIsAlertOpen(true)} variant="solid" className="bg-red-600 hover:bg-red-700 text-white">Trigger Alert Dialog</Button>
        <Button onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
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
        </div>
      </Modal>

      <AlertDialog isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setIsAlertOpen(false)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}