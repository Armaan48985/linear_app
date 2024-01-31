"use client";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
// import Sidebar from '@/pages/Sidebar'
import "../../globals.css";
import { FaDotCircle, FaRegStar } from "react-icons/fa";
// import {ComboBoxResponsive} from './filter't
import { FaAlignJustify } from "react-icons/fa6";
import { LuAlignVerticalJustifyCenter } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { MdFilterList } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoBellFill } from "react-icons/go";
import Sidebar from "@/components/Sidebar";
import { ComboBoxResponsive } from "@/components/ui/shadcn/filter";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { TbCircleDotted } from "react-icons/tb";
import { GoPlus } from "react-icons/go";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDataToFireStore, fetchDataFromFireStore } from "@/app/db";
import { ContextMenuDemo } from "./IssueEdit";
import { ContextMenuTrigger } from "@radix-ui/react-context-menu";
import { Timestamp } from "firebase/firestore";
import { FaRegCircle } from "react-icons/fa";
import { BiSolidCircleHalf } from "react-icons/bi";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import CreateIssue from "@/components/createIssue";
import { useDispatch } from "react-redux";
import { setIssues } from "@/app/GlobalReducer/action";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalReducer/store";

const index = () => {
  const Issues = useSelector((e: RootState) => e.issue);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromFireStore("naruto");
      setIssues(data);
    };

    fetchData();
  }, []);

  const createIssue = () => {
    const date = new Date();
    if (value.trim() !== "") {
      const newIssue = {
        id: value,
        name: value,
        type: "active",
        time: Timestamp.fromDate(date),
      };

      // Update local state
      setIssues((prevIssues: any) => [...prevIssues, newIssue]);

      // Update Firestore
      addDataToFireStore(newIssue.id, newIssue.name, "naruto", date)
        .then(() => {
          setValue(""); // Clear input value
        })
        .catch((error) => {
          console.error("Error updating Firestore:", error);
        });

      console.log("working");
    }
  };

  const changeStatus = (status: string) => {
    if (status === "backlog") {
      return <FaDotCircle />;
    } else if (status === "todo") {
      return <FaRegCircle />;
    } else if (status === "inProgress") {
      return <BiSolidCircleHalf />;
    } else if (status === "review") {
      return <BiSolidCircleThreeQuarter />;
    } else {
      return <FaCheckCircle />;
    }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen w-full bg-body"
    >
      <ResizablePanel defaultSize={35} className="max-w-[380px] min-w-[260px]">
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle className="text-gray" />
      <ResizablePanel defaultSize={65}>
        <div>
          <nav className="flex justify-between items-center border-b-2 border-slate-800 py-4 px-10">
            <div className="flex">
              <h2 className="flex text-md items-center gap-2 ">
                Active issues{" "}
                <span className="opacity-60 ml-2 bgHover-grey p-1 rounded-lg">
                  <FaRegStar />
                </span>
              </h2>
              <ComboBoxResponsive
                name={
                  <p className="flex items-center gap-2 border-2 border-dashed border-gray-800 rounded-[.5rem] ml-8 py-1 px-3">
                    <span className="opacity-60">
                      <MdFilterList />
                    </span>
                    Filter
                  </p>
                }
              />
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="default"
                        className="bg-grey rounded-lg px-3 h-7"
                      >
                        <FaAlignJustify />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-grey border-none outline-none rounded-md mt-2">
                      <p className="text-[13px]">
                        List
                        <span className="bg-lightgrey rounded-md ml-2 px-1">
                          Ctrl
                        </span>
                        <span className="bg-lightgrey rounded-md px-1">B</span>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="default"
                        className="bg-darkgrey rounded-lg px-3 h-7 icon-hover"
                      >
                        <LuAlignVerticalJustifyCenter />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-grey border-none outline-none rounded-md mt-2">
                      <p className="text-[13px]">
                        Board
                        <span className="bg-lightgrey rounded-md ml-2 px-1">
                          Ctrl
                        </span>
                        <span className="bg-lightgrey rounded-md px-1">B</span>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="bg-grey gap-2 py-0 h-8 px-3 text-[13px] hover:bg-grey rounded-lg ml-2"
                  >
                    <span className="rotate-90">
                      <GiSettingsKnobs />
                    </span>{" "}
                    Display
                    <MdKeyboardArrowDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[18rem] bg-[#282a39] border-none outline-none rounded-xl ml-4 py-2 px-4 mr-[11rem] mt-2">
                  <DropdownMenuGroup className="">
                    <DropdownMenuItem className="opacity-[.6] flex-between">
                      Grouping
                      <Select>
                        <SelectTrigger className="w-24 h-7 bg-lightgrey">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="border-none outline-none">
                          <SelectGroup className="bg-lightgrey border-none outline-none rounded-lg w-28 ml-[-1rem] gap-0">
                            {/* <SelectLabel>Fruits</SelectLabel> */}
                            <SelectItem value="Status">Status</SelectItem>
                            <SelectItem value="Asignee">Asignee</SelectItem>
                            <SelectItem value="Project">Project</SelectItem>
                            <SelectItem value="Priority">Priority</SelectItem>
                            <SelectItem value="Cycle">Cycle</SelectItem>
                            <SelectItem value="Label">Label</SelectItem>
                            <SelectItem value="No grouping">
                              No grouping
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="opacity-[.6] flex-between">
                      Ordering
                      <Select>
                        <SelectTrigger className="w-24 h-7 bg-lightgrey">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="border-none outline-none">
                          <SelectGroup className="bg-lightgrey border-none outline-none rounded-lg w-28 ml-[-1rem] gap-0">
                            {/* <SelectLabel>Fruits</SelectLabel> */}
                            <SelectItem value="Status">Status</SelectItem>
                            <SelectItem value="Asignee">Asignee</SelectItem>
                            <SelectItem value="Project">Project</SelectItem>
                            <SelectItem value="Priority">Priority</SelectItem>
                            <SelectItem value="Cycle">Cycle</SelectItem>
                            <SelectItem value="Label">Label</SelectItem>
                            <SelectItem value="No grouping">
                              No grouping
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gray-700 my-2 w-full mx-0" />
                    <DropdownMenuItem className="text-sm py-2 flex-between">
                      Showsubissues
                      <Switch />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700 my-2 w-full mx-0" />
                    <DropdownMenuItem className="text-sm py-2">
                      List options
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm py-2">
                      Display Properties
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm py-2">
                      /////////List//////////
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="bg-grey gap-2 py-0 h-8 px-3 text-[13px] hover:bg-grey mx-3"
                  >
                    <GoBellFill />
                    Notifications <MdKeyboardArrowDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto bg-grey mr-24 mt-2 border-none outline-none rounded-xl ml-4 py-2 px-4">
                  <DropdownMenuGroup className="w-auto">
                    <DropdownMenuLabel className="py-2 mt-1 text-sm">
                      Subscribe to notifications
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="text-smm opacity-50 flex justify-between gap-2">
                      An issue is added to active issues
                      <Checkbox id="terms" className="w-3 h-3" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-smm opacity-50 mb-2 flex justify-between gap-2">
                      An issue is marked completed or canceled
                      <Checkbox id="terms" className="w-3 h-3" />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="h-5 w-[2px] bg-gray-600 mr-3"></div>

              <span className="icon-hover font-extrabold text-md ml-3">
                <BsLayoutSidebarReverse />
              </span>
            </div>
          </nav>

          <div>
            <div className="bg-grey w-full h-12 flex-between px-6">
              <div className="flex items-center">
                <span className="text-xl mr-1">
                  <TbCircleDotted />
                </span>
                <p>No cycle</p>
                <span className="opacity-50 text-md ml-3">10</span>
              </div>
              <div className="text-xl bgHover-lightgrey p-1 rounded-md">
                <CreateIssue
                  trigger={<GoPlus />}
                  value={value}
                  setValue={setValue}
                  createIssue={createIssue}
                />
              </div>
            </div>
            {Issues.issues.map((e: any, i: number) => (
              <ContextMenuDemo
                clickEl={
                  <ContextMenuTrigger className="">
                    <div
                      key={i}
                      className="border-b-2 bgHover-darkgrey duration-75 border-gray-800 w-full h-16 flex items-center px-6 flex-between"
                    >
                      <div className="flex-center gap-2">
                        {changeStatus(e.status)}
                        <p>{e.name}</p>
                      </div>
                      <div className="flex-center gap-2">
                        <p>{e?.time?.toDate().getDate()}</p>
                        <p>
                          {e?.time
                            ?.toDate()
                            .toLocaleString("default", { month: "long" })
                            .slice(0, 3)}
                        </p>
                      </div>
                    </div>
                  </ContextMenuTrigger>
                }
                name={e.name}
                issues={e.issue}
                issueId={e.id}
              />
            ))}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default index;
