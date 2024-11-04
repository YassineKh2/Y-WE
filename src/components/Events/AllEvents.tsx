"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { DeleteIcon, EditIcon, EyeIcon } from "@nextui-org/shared-icons";
import { formatDateWithDays, formatDateWithMinutes } from "@/lib/funcs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "createdAt",
    label: "SUBMITTED ON",
  },
  {
    key: "state",
    label: "STATE",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];
const stateColorMap = {
  ACCEPTED: "success",
  REFUSED: "danger",
  PENDING: "warning",
};

type event = {
  key: "";
  name: "";
  createdAt: "";
  state: "";
};

export function AllEvents() {
  const [events, setEvents] = useState<event[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setEvents]);

  const renderCell = useCallback((event: event, columnKey: string) => {
    const cellValue = event[columnKey];

    switch (columnKey) {
      case "name":
        return event.name;
      case "createdAt":
        return (
          <Tooltip
            placement="top-start"
            showArrow={true}
            content={formatDateWithMinutes(event.createdAt)}
          >
            {formatDateWithDays(event.createdAt)}
          </Tooltip>
        );
      case "state":
        return (
          <Chip
            className="capitalize"
            color={stateColorMap[event.state]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete event">
              <span
                onClick={onOpen}
                className="cursor-pointer text-lg text-danger active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={events}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-b from-zinc-900 to-zinc-900/10 backdrop-opacity-20 absolute",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
