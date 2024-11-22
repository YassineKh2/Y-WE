"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  ChevronDownIcon,
  EditIcon,
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
import { PUT } from "@/app/api/user/[id]/route";
const columns = [
  {
    key: "user",
    label: "USER",
    sortable: true,
  },
  {
    key: "phonenumber",
    label: "PHONE NUMBER",
    sortable: true,
  },
  {
    key: "createdAt",
    label: "JOINED ON",
    sortable: true,
  },
  {
    key: "status",
    label: "STATUS",
    sortable: true,
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];
const stateColorMap = {
  ACTIVE: "success",
  BANNED: "danger",
  SUSPENDED: "warning",
};
const stateOptions = [
  { name: "Accepted", uid: "ACCEPTED" },
  { name: "Refused", uid: "REFUSED" },
  { name: "Pending", uid: "PENDING" },
];

type user = {
  name: "";
  image: "";
  email: "";
  phonenumber: "";
  createdAt: "";
  status: "ACTIVE" | "BANNED" | "SUSPENDED" | "";
  [key: string]: string;
};

const INITIAL_VISIBLE_COLUMNS = ["user", "phonenumber", "createdAt", "actions"];

export function AllUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<user[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const PardonUser = useDisclosure();
  const ShowUserModal = useDisclosure();
  // used to store the value of the active user in the delete modal
  const [activeUser, setActiveUser] = useState<user>({
    name: "",
    image: "",
    email: "",
    phonenumber: "",
    createdAt: "",
    status: "",
  });

  // used to store the value of the input name field in the delete modal
  const [confirmBan, setConfirmBan] = useState({
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData().then(() => setIsLoaded(true));
  }, [setUsers]);

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

  const renderCell = useCallback((user: user, columnKey: string) => {
    // @ts-ignore
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "user":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.image }}
            name={user.name}
            description={user.email}
          />
        );
      case "name":
        return user.name;

      case "phonenumber":
        return user.phonenumber;
      case "createdAt":
        return (
          <Tooltip
            placement="top-start"
            showArrow={true}
            content={formatDateWithMinutes(user.createdAt)}
          >
            {formatDateWithDays(user.createdAt)}
          </Tooltip>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            // @ts-ignore
            color={stateColorMap[user.status]}
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
                    setActiveUser(() => user);
                    ShowUserModal.onOpen();
                  }}
                  className="cursor-pointer text-lg text-default-400 active:opacity-50"
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              {user.status === "ACTIVE" ? (
                <Tooltip color="danger" content="Ban user">
                  <span
                    onClick={() => {
                      setActiveUser(() => user);
                      onOpen();
                    }}
                    className="cursor-pointer text-lg text-danger active:opacity-50"
                  >
                    <svg
                      className="fill-current"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <defs>
                          <style>
                            {`.cls-1{fill:none;stroke:#F31360;stroke-miterlimit:10;stroke-width:1.91px;}`}
                          </style>
                        </defs>
                        <circle
                          className="cls-1"
                          cx="12"
                          cy="12"
                          r="10.5"
                        ></circle>
                        <path
                          className="cls-1"
                          d="M15.19,6.12,6.12,15.19A6.7,6.7,0,0,1,12,5.32,6.59,6.59,0,0,1,15.19,6.12Z"
                        ></path>
                        <path
                          className="cls-1"
                          d="M18.68,12A6.68,6.68,0,0,1,12,18.68a6.59,6.59,0,0,1-3.19-.8l9.07-9.07A6.59,6.59,0,0,1,18.68,12Z"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </Tooltip>
              ) : (
                <Tooltip color="success" content="Pardon user">
                  <span
                    onClick={() => {
                      setActiveUser(() => user);
                      PardonUser.onOpen();
                    }}
                    className="cursor-pointer text-lg text-danger active:opacity-50"
                  >
                    <svg
                      className="fill-current"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.63604 18.364C9.15076 21.8787 14.8492 21.8787 18.364 18.364C21.8787 14.8492 21.8787 9.15076 18.364 5.63604C14.8492 2.12132 9.15076 2.12132 5.63604 5.63604C2.12132 9.15076 2.12132 14.8492 5.63604 18.364ZM7.80749 17.6067C10.5493 19.6623 14.4562 19.4433 16.9497 16.9497C19.4433 14.4562 19.6623 10.5493 17.6067 7.80749L14.8284 10.5858C14.4379 10.9763 13.8047 10.9763 13.4142 10.5858C13.0237 10.1953 13.0237 9.5621 13.4142 9.17157L16.1925 6.39327C13.4507 4.33767 9.54384 4.55666 7.05025 7.05025C4.55666 9.54384 4.33767 13.4507 6.39327 16.1925L9.17157 13.4142C9.5621 13.0237 10.1953 13.0237 10.5858 13.4142C10.9763 13.8047 10.9763 14.4379 10.5858 14.8284L7.80749 17.6067Z"
                          fill="#16C964"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                </Tooltip>
              )}
            </div>
          </Button>
        );
      default:
        return cellValue;
    }
  }, []);

  async function BanUser() {
    if (confirmBan.name !== activeUser?.name) {
      setConfirmBan({ ...confirmBan, state: true });
      return;
    }

    const response = await fetch("/api/user/" + activeUser?._id, {
      method: "PUT",
    });

    const responseData = await response.json();

    if (!responseData.error) {
      SuccessToast(responseData.success);
      setConfirmBan({ name: "", state: false });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === activeUser._id ? { ...user, status: "BANNED" } : user,
        ),
      );
      onOpenChange();
    }

    if (responseData.error) {
      ErrorToast(responseData.error);
    }
  }

  async function pardonUser() {
    if (confirmBan.name !== activeUser?.name) {
      setConfirmBan({ ...confirmBan, state: true });
      return;
    }

    const response = await fetch("/api/user/" + activeUser?._id, {
      method: "PUT",
    });

    const responseData = await response.json();

    if (!responseData.error) {
      SuccessToast(responseData.success);
      setConfirmBan({ name: "", state: false });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === activeUser._id ? { ...user, status: "ACTIVE" } : user,
        ),
      );
      PardonUser.onOpenChange();
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
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== stateOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.state),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

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
                router.push("/users/add");
              }}
              endContent={<PlusFilledIcon />}
            >
              Submit a New
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {users.length} users
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
    users.length,
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
            aria-label="User Table"
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
            <TableBody emptyContent={"No users found"} items={sortedItems}>
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

          {/*Ban Modal*/}
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
                    BAN ACCOUNT
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Are you sure want to ban this user? This action cannot be
                      undone !
                    </p>
                    <Input
                      value={confirmBan.name}
                      onValueChange={(data) => {
                        setConfirmBan({
                          ...confirmBan,
                          name: data,
                        });
                      }}
                      isInvalid={
                        confirmBan.state && confirmBan.name !== activeUser?.name
                      }
                      errorMessage="Names do not match"
                      isClearable
                      classNames={{
                        input:
                          "placeholder:text-gray-400/80 dark:placeholder:text-white/20",
                      }}
                      type="name"
                      label={"Type ' " + activeUser?.name + " ' to confirm"}
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
                      placeholder={activeUser?.name}
                      size={"lg"}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="danger" onPress={BanUser}>
                      Ban
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {/*Pardon Modal*/}
          <Modal
            backdrop="opaque"
            shadow="lg"
            isOpen={PardonUser.isOpen}
            onOpenChange={PardonUser.onOpenChange}
            classNames={{
              backdrop: "z-999",
              wrapper: "z-9999",
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    PARDON ACCOUNT
                  </ModalHeader>
                  <ModalBody>
                    <p>Are you sure want to pardon this user?</p>
                    <Input
                      value={confirmBan.name}
                      onValueChange={(data) => {
                        setConfirmBan({
                          ...confirmBan,
                          name: data,
                        });
                      }}
                      isInvalid={
                        confirmBan.state && confirmBan.name !== activeUser?.name
                      }
                      errorMessage="Names do not match"
                      isClearable
                      classNames={{
                        input:
                          "placeholder:text-gray-400/80 dark:placeholder:text-white/20",
                      }}
                      type="name"
                      label={"Type ' " + activeUser?.name + " ' to confirm"}
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
                      placeholder={activeUser?.name}
                      size={"lg"}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="success"
                      onPress={pardonUser}
                      className="text-white"
                    >
                      Pardon
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {/*Details Modal*/}
          <Modal
            backdrop="opaque"
            shadow="lg"
            isOpen={ShowUserModal.isOpen}
            onOpenChange={ShowUserModal.onOpenChange}
            classNames={{
              backdrop: "z-999",
              wrapper: "z-9999",
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="mt-4 flex flex-row justify-between gap-1">
                    User Details
                  </ModalHeader>
                  <ModalBody>
                    <h1>User Details</h1>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={ShowUserModal.onClose}>
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
