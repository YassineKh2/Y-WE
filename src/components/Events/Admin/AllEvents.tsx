"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import {
  ChevronDownIcon,
  DeleteIcon,
  EyeIcon,
  PlusFilledIcon,
  SearchIcon,
} from "@nextui-org/shared-icons";
import {
  capitalize,
  formatDateWithDays,
  formatDateWithMinutes,
  toCamelCase,
} from "@/lib/funcs";
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
import AlertError from "@/components/Alerts/AlertError";
import AlertSuccess from "@/components/Alerts/AlertSuccess";
import {
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { Pagination } from "@nextui-org/pagination";
import { Skeleton } from "@nextui-org/skeleton";
import { User } from "@nextui-org/user";
import "../../../../public/flipimg.css";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import { Select, SelectItem } from "@nextui-org/select";
import { Tab, Tabs } from "@nextui-org/tabs";
const columns = [
  {
    key: "ownerName",
    label: "OWNER",
    sortable: true,
  },
  {
    key: "name",
    label: "NAME",
    sortable: true,
  },
  {
    key: "createdAt",
    label: "SUBMITTED ON",
    sortable: true,
  },
  {
    key: "state",
    label: "STATE",
    sortable: true,
  },
  {
    key: "askedAmount",
    label: "ASKED AMOUNT ",
    sortable: true,
  },
  {
    key: "startDate",
    label: "STARTS ON ",
    sortable: true,
  },
  {
    key: "endDate",
    label: "ENDS ON",
    sortable: true,
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
const stateOptions = [
  { name: "Accepted", uid: "ACCEPTED" },
  { name: "Refused", uid: "REFUSED" },
  { name: "Pending", uid: "PENDING" },
];

type event = {
  ownerName: "";
  ownerEmail: "";
  ownerImage: "";
  key: "";
  name: "";
  createdAt: "";
  state: "";
  _id: "";
  askedAmount: "";
  startDate: "";
  endDate: "";
  type: "";
  location: "";
  estimatedAttendees: "";
  description: "";
  [key: string]: string;
};

const INITIAL_VISIBLE_COLUMNS = [
  "ownerName",
  "name",
  "createdAt",
  "state",
  "actions",
];

export function AllEvents() {
  const router = useRouter();
  const [events, setEvents] = useState<event[]>([]);
  const [companies, setCompanies] = useState<event[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const ShowEventModal = useDisclosure();
  // used to store the value of the active event in the delete modal
  const [activeEvent, setActiveEvent] = useState<event>({
    ownerName: "",
    ownerEmail: "",
    ownerImage: "",
    key: "",
    name: "",
    createdAt: "",
    state: "",
    _id: "",
    askedAmount: "",
    startDate: "",
    endDate: "",
    type: "",
    location: "",
    estimatedAttendees: "",
    description: "",
  });

  // used to store the value of the input name field in the delete modal
  const [confirmDelete, setConfirmDelete] = useState({
    name: "",
    state: false,
  });

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "createdAt",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const [errorToast, setErrorToast] = useState({
    state: false,
    message: "",
  });
  const [successToast, setSuccessToast] = useState({
    state: false,
    message: "",
  });

  // Get Events and Companies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/events/all");
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await fetch("/api/user/company");
        const data = await response.json();
        setCompanies(data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().then(() => setIsLoaded(true));
  }, [setEvents, setCompanies]);

  function ErrorToast(error: any) {
    setErrorToast({
      state: true,
      message: error,
    });
    setTimeout(() => {
      setErrorToast({
        state: false,
        message: "",
      });
    }, 5000);
  }

  function SuccessToast(success: any) {
    setSuccessToast({
      state: true,
      message: success,
    });
    setTimeout(() => {
      setSuccessToast({
        state: false,
        message: "",
      });
    }, 5000);
  }

  const renderCell = useCallback((event: event, columnKey: string) => {
    // @ts-ignore
    const cellValue = event[columnKey];

    switch (columnKey) {
      case "ownerName":
        return (
          <User
            avatarProps={{ radius: "lg", src: event.ownerImage }}
            description={event.ownerEmail}
            name={cellValue}
          >
            {event.ownerEmail}
          </User>
        );
      case "name":
        return event.name;
      case "startDate":
        return (
          <Tooltip
            placement="top-start"
            showArrow={true}
            content={"At :" + formatDateWithMinutes(event.startDate)}
          >
            {formatDateWithDays(event.startDate)}
          </Tooltip>
        );
      case "endDate":
        return (
          <Tooltip
            placement="top-start"
            showArrow={true}
            content={"At :" + formatDateWithMinutes(event.endDate)}
          >
            {formatDateWithDays(event.endDate)}
          </Tooltip>
        );
      case "askedAmount":
        return event.askedAmount + " " + "د.ت";
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
          <Button variant="light" disableRipple>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span
                  onClick={() => {
                    setActiveEvent(() => event);
                    ShowEventModal.onOpen();
                  }}
                  className="cursor-pointer text-lg text-default-400 active:opacity-50"
                >
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
          </Button>
        );
      default:
        return cellValue;
    }
  }, []);

  async function DeleteEvent() {
    if (confirmDelete.name !== activeEvent?.name) {
      setConfirmDelete({ ...confirmDelete, state: true });
      return;
    }

    const response = await fetch("/api/events/" + activeEvent?._id, {
      method: "DELETE",
    });

    const responseData = await response.json();

    if (!responseData.error) {
      SuccessToast(responseData.success);
      setConfirmDelete({ name: "", state: false });
      setEvents((prev) =>
        prev.filter((event) => event._id !== activeEvent?._id),
      );
      onOpenChange();
    }

    if (responseData.error) {
      ErrorToast(responseData.error);
    }
  }
  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const filteredItems = useMemo(() => {
    let filteredEvents = [...events];

    if (hasSearchFilter) {
      filteredEvents = filteredEvents.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== stateOptions.length
    ) {
      filteredEvents = filteredEvents.filter((event) =>
        Array.from(statusFilter).includes(event.state),
      );
    }

    return filteredEvents;
  }, [events, filterValue, statusFilter]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const headerColumns = useMemo(() => {
    if (visibleColumns.has("all")) return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key),
    );
  }, [visibleColumns]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 rounded-2xl bg-white px-4 py-6 dark:bg-[#161F30]">
        <div className="flex items-end justify-between gap-3">
          <Input
            variant="faded"
            color="primary"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter as any}
              >
                {stateOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns as any}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {toCamelCase(column.label)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              onClick={() => {
                router.push("/events/add");
              }}
              endContent={<PlusFilledIcon />}
            >
              Submit a New
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {events.length} events
          </span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    events.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-2 dark:bg-[#161F30]">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys.size === filteredItems.length
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      {!isLoaded ? (
        <Skeleton>
          <div className="w-full rounded-2xl bg-white py-50">Loading</div>
        </Skeleton>
      ) : (
        <>
          <Table
            aria-label="Event Table"
            topContent={topContent}
            selectedKeys={selectedKeys}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys as any}
            selectionMode="multiple"
            onSortChange={setSortDescriptor as any}
            sortDescriptor={sortDescriptor as any}
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn key={column.key} allowsSorting={column.sortable}>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No events found"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(item, columnKey as string)}
                    </TableCell>
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
                      Are you sure want to delete this event? This action cannot
                      be undone !
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
                    <Button color="danger" onPress={DeleteEvent}>
                      Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal
            backdrop="opaque"
            shadow="lg"
            isOpen={ShowEventModal.isOpen}
            onOpenChange={ShowEventModal.onOpenChange}
            classNames={{
              backdrop: "z-999",
              wrapper: "z-9999",
            }}
            size={"3xl"}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="mt-4 flex flex-row justify-between gap-1">
                    Event Details
                    <Tabs
                      variant="light"
                      aria-label="Tabs"
                      onSelectionChange={() => {
                        console.log();
                      }}
                    >
                      <Tab key="description" title="Description" />
                      <Tab key="dateandlocation" title="Date And Location" />
                      <Tab key="Details" title="Details" />
                    </Tabs>
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex items-start justify-between gap-2">
                      <User
                        avatarProps={{
                          radius: "lg",
                          src: activeEvent?.ownerImage,
                        }}
                        description={activeEvent?.ownerEmail}
                        name={activeEvent?.ownerName}
                      >
                        {activeEvent?.ownerEmail}
                      </User>
                      <Chip
                        className="capitalize"
                        //@ts-ignore
                        color={stateColorMap[activeEvent.state]}
                        size="sm"
                        variant="flat"
                      >
                        {activeEvent.state}
                      </Chip>
                    </div>
                    <p>{activeEvent?.description}</p>
                    <Divider className="my-4" />
                    <strong>Affected Company</strong>
                    <Select
                      aria-label="select"
                      items={companies}
                      labelPlacement="outside-left"
                      className="max-w-xs"
                      variant="bordered"
                      listboxProps={{
                        itemClasses: {
                          base: [
                            "rounded-md",
                            "text-default-500",
                            "transition-opacity",
                            "data-[hover=true]:text-foreground",
                            "data-[hover=true]:bg-default-100",
                            "dark:data-[hover=true]:bg-default-50",
                            "data-[selectable=true]:focus:bg-default-50",
                            "data-[pressed=true]:opacity-70",
                            "data-[focus-visible=true]:ring-default-500",
                          ],
                        },
                      }}
                      popoverProps={{
                        classNames: {
                          base: "before:bg-default-200",
                          content:
                            "p-0 border-small border-divider bg-background",
                        },
                      }}
                      renderValue={(items) => {
                        return items.map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center gap-2"
                          >
                            <Avatar
                              alt={item.data?.name}
                              className="flex-shrink-0"
                              size="sm"
                              src={item.data?.image}
                            />
                            <div className="flex flex-col">
                              <span>{item.data?.name}</span>
                            </div>
                          </div>
                        ));
                      }}
                    >
                      {(user) => (
                        <SelectItem key={user.id} textValue={user.name}>
                          <div className="flex items-center gap-2">
                            <Avatar
                              alt={user.name}
                              className="flex-shrink-0"
                              size="sm"
                              src={user.image}
                            />
                            <div className="flex flex-col">
                              <span className="text-small">{user.name}</span>
                              <span className="text-tiny text-default-400">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Select>

                    {/*<div className="mt-5 flex gap-2 font-bold">*/}
                    {/*  <span>{formatDateWithDays(activeEvent?.startDate)}</span>*/}
                    {/*  <span className="text-default-400">To </span>*/}
                    {/*  <span>{formatDateWithDays(activeEvent?.endDate)}</span>*/}
                    {/*</div>*/}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={ShowEventModal.onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}

      {errorToast.state && <AlertError error={errorToast.message} />}
      {successToast.state && <AlertSuccess message={successToast.message} />}
    </>
  );
}
