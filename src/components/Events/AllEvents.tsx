"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { Input } from "@nextui-org/input";

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
  // used to store the value of the active event in the delete modal
  const [activeEvent, setActiveEvent] = useState<event>({
    key: "",
    name: "",
    createdAt: "",
    state: "",
  });

  // used to store the value of the input name field in the delete modal
  const [confirmDelete, setConfirmDelete] = useState({
    name: "",
    state: false,
  });

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
    // @ts-ignore
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
            // @ts-ignore
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
                onClick={() => {
                  setActiveEvent(() => event);
                  onOpen();
                }}
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

  function DeleteEvent() {
    if (confirmDelete.name !== activeEvent?.name)
      setConfirmDelete({ ...confirmDelete, state: true });
    else {
      console.log("Deleting event", activeEvent);
      setConfirmDelete({ name: "", state: false });
      onOpenChange();
    }
  }

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
                <TableCell>{renderCell(item, columnKey as string)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        backdrop="opaque"
        shadow="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "z-999",
          wrapper: "z-9999",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                DELETE EVENT
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure want to delete this event? This action cannot be
                  undone !
                </p>
                <Input
                  value={confirmDelete.name}
                  onValueChange={(data) => {
                    setConfirmDelete({ ...confirmDelete, name: data });
                  }}
                  isInvalid={
                    confirmDelete.state &&
                    confirmDelete.name !== activeEvent?.name
                  }
                  errorMessage="Names do not match"
                  isClearable
                  classNames={{
                    input:
                      "placeholder:text-gray-400/80 dark:placeholder:text-white/20",
                  }}
                  type="name"
                  label={"Type ' " + activeEvent?.name + " ' to confirm"}
                  labelPlacement="outside"
                  startContent={
                    <svg
                      className="mr-2 fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M676 862c-16 0-28-13-28-29V691c0-16 12-28 28-28h142c16 0 29 12 29 28v142c0 16-13 29-29 29H676zm142-171H676v142h142V691zM960 96c35 0 64 29 64 64v800c0 35-29 64-64 64H64c-35 0-64-29-64-64V160c0-35 29-64 64-64h256V32c0-18 14-32 32-32s32 14 32 32v64h256V32c0-18 14-32 32-32s32 14 32 32v64h256zM64 960h896V160H704v32c0 18-14 32-32 32s-32-14-32-32v-32H384v32c0 18-14 32-32 32s-32-14-32-32v-32H64v800z"
                        ></path>
                      </g>
                    </svg>
                  }
                  variant="bordered"
                  placeholder={activeEvent?.name}
                  size={"lg"}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    DeleteEvent();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
