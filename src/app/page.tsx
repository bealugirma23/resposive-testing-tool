"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

import Tabletcanva from "../components/canva/tabletcanva";
import Mobilecanva from "../components/canva/mobilecanva";
import Desktopcanva from "../components/canva/desktopcanva";

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div  className="flex items-center gap-2">
      <button
        onClick={() => zoomIn()}
        className="inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
        type="button"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
      <button
        onClick={() => zoomOut()}
        className="inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
        type="button"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default function Home() {
  const [url, setUrl] = useState("");

  const loadURL = () => {
    const inputElement = document.getElementById("urlInput") as HTMLInputElement;
    if (inputElement) {
        const inputUrl = inputElement.value;
        setUrl(inputUrl);
    } else {
        console.error('Element with ID "urlInput" not found');
    }
  };

  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showTabletDropdown, setShowTabletDropdown] = useState(false);
  const [showDesktopDropdown, setShowDesktopDropdown] = useState(false);

  const toggleDropdown = (setter: any) => () => {
    setter((prevState: any) => !prevState);
  };
  const [zoom, setZoom] = useState(100); // Default zoom level is 100%

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 10, 200)); // Limit max zoom to 200%
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 10, 50)); // Limit min zoom to 50%
  };

  return (
    <>
      <main className="bg-white dark:bg-black">
        <div className="App p-5  text-center">
          <input
            type="text"
            id="urlInput"
            placeholder="Enter URL"
            className="border rounded text-black p-2 mr-2"
          />
          <Button onClick={loadURL}>load Url</Button>
        </div>{" "}
        <div className="flex flex-col md:flex-row h-screen w-full">
          {/* Mobile */}
          <div className="flex-1 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Mobile</h2>

              <div className="relative inline-block text-left">
                <button
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={toggleDropdown(setShowTabletDropdown)}
                  className="inline-flex w-full justify-between rounded-md border  px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  id="menu-button"
                  type="button"
                >
                  <div className="flex items-center">
                    <SmartphoneIcon className="h-4 w-4 mr-2" />
                    iPhone 12
                    <ChevronDownIcon className="h-4 w-4 ml-2" />
                  </div>
                </button>
                {/* drop down */}
                <div
                  aria-labelledby="menu-button"
                  aria-orientation="vertical"
                  className="absolute  right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
                  role="menu"
                  tabIndex={-1}
                >
                  {showTabletDropdown && (
                    <div className="py-1" role="none">
                      <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
                        Devices
                      </div>

                      <div>
                        <div className="border-t border-gray-200 dark:border-gray-600" />
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                          href="#"
                          id="menu-item-0"
                          role="menuitem"
                          tabIndex={-1}
                        >
                          <div className="flex items-center">
                            <SmartphoneIcon className="h-4 w-4 mr-2" />
                            iPhone 12
                          </div>
                        </a>
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                          href="#"
                          id="menu-item-2"
                          role="menuitem"
                          tabIndex={-1}
                        >
                          <div className="flex items-center">
                            <SmartphoneIcon className="h-4 w-4 mr-2" />
                            Galaxy S21
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* container */}
            <div className="relative w-full h-full overflow-hidden ">
              <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <Mobilecanva URL={url} />
            </div>
            {/* lower zooming  */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                  type="button"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium">75%</span>
                <button
                  className="inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                  type="button"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                  type="button"
                >
                  <Maximize2Icon className="h-4 w-4" />
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                  type="button"
                >
                  <MinimizeIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          {/* Tablet */}
          <div className="flex-1 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Tablet</h2>
              <div className="relative inline-block text-left">
                <button
                  aria-expanded="true"
                  aria-haspopup="true"
                  className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  id="menu-button"
                  type="button"
                >
                  <div className="flex items-center">
                    <TabletIcon className="h-4 w-4 mr-2" />
                    iPad Air
                    <ChevronDownIcon className="h-4 w-4 ml-2" />
                  </div>
                </button>
                <div
                  aria-labelledby="menu-button"
                  aria-orientation="vertical"
                  className="absolute hidden right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
                  role="menu"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
                      Devices
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600" />
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      href="#"
                      id="menu-item-1"
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <div className="flex items-center">
                        <TabletIcon className="h-4 w-4 mr-2" />
                        iPad Air
                      </div>
                    </a>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      href="#"
                      id="menu-item-3"
                      role="menuitem"
                      tabIndex={-1}
                    >
                      <div className="flex items-center">
                        <TabletIcon className="h-4 w-4 mr-2" />
                        Nexus 7
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative  bg-blue-500 w-full h-full overflow-hidden ">
              <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <Tabletcanva URL={url} />
            </div>
            {/* <div className="flex-1 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <iframe
                title="tablet-view"
                className="frame border"
                width="1024"
                height="768"
                src={url}
              ></iframe>
            </div> */}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                  type="button"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium">75%</span>
                <button
                  className="inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                  type="button"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                  type="button"
                >
                  <Maximize2Icon className="h-4 w-4" />
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                  type="button"
                >
                  <MinimizeIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Desktop */}
        <div className="flex-1 border-t h-screen border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Desktop</h2>
            <div className="relative inline-block text-left">
              <button
                aria-expanded="true"
                aria-haspopup="true"
                className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                id="menu-button"
                type="button"
              >
                <div className="flex items-center">
                  <ComputerIcon className="h-4 w-4 mr-2" />
                  1920 x 1080
                  <ChevronDownIcon className="h-4 w-4 ml-2" />
                </div>
              </button>
              {/* dropdown */}
              <div
                aria-labelledby="menu-button"
                aria-orientation="vertical"
                className="absolute hidden right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
                role="menu"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
                    Resolutions
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600" />
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    href="#"
                    id="menu-item-0"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    <div className="flex items-center">
                      <ComputerIcon className="h-4 w-4 mr-2" />
                      1920 x 1080
                    </div>
                  </a>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    href="#"
                    id="menu-item-1"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    <div className="flex items-center">
                      <ComputerIcon className="h-4 w-4 mr-2" />
                      1440 x 900
                    </div>
                  </a>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    href="#"
                    id="menu-item-2"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    <div className="flex items-center">
                      <ComputerIcon className="h-4 w-4 mr-2" />
                      1366 x 768
                    </div>
                  </a>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    href="#"
                    id="menu-item-3"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    <div className="flex items-center">
                      <ComputerIcon className="h-4 w-4 mr-2" />
                      1280 x 720
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative  bg-blue-500 w-full h-full overflow-hidden ">
            <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <Desktopcanva URL={url} />
          </div>
        </div>
      </main>
    </>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ComputerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
    </svg>
  );
}

function Maximize2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" x2="14" y1="3" y2="10" />
      <line x1="3" x2="10" y1="21" y2="14" />
    </svg>
  );
}

function MinimizeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function MinusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SmartphoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function TabletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  );
}
