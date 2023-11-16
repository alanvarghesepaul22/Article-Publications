"use client";
import React from "react";
import { useSidebarContext } from "@/context/SidebarContext";
import { twMerge } from "tailwind-merge";
import {
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlinePlus,
  HiOutlineViewGrid,
} from "react-icons/hi";
import {
  IoLayersOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { WiMoonAltWaningCrescent1 } from "react-icons/wi";
import { signOut, useSession } from "next-auth/react";
import { data } from "autoprefixer";

export function SideBar() {
  const { session } = useSession();
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  const commonClasses = "flex flex-col overflow-y-auto scrollbar-hidden p-4";

  return (
    <>
      <aside
        className={`${commonClasses} bg-white sticky top-0 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={HiOutlinePlus} />
        <SmallSidebarItem Icon={HiOutlineHome} />
        <SmallSidebarItem Icon={HiOutlineViewGrid} />
        <SmallSidebarItem Icon={IoLayersOutline} />
        <SmallSidebarItem Icon={IoSettingsOutline} />
        <SmallSidebarItem Icon={IoPersonOutline} />
        <SmallSidebarItem Icon={WiMoonAltWaningCrescent1} />
        <SmallSidebarItem Icon={HiOutlineLogout} />
      </aside>
      <aside
        className={`${commonClasses} flex flex-col justify-between w-56 bg-white lg:sticky absolute top-0 p-2 gap-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="flex flex-col gap-3 w-full">
          <LargeSidebarItem
            IconOrImgUrl={HiOutlinePlus}
            title="Upload"
            url=""
            className="bg-blue-400"
          />
          <LargeSidebarItem
            isActive
            IconOrImgUrl={HiOutlineHome}
            title="Home"
            url=""
          />
          <LargeSidebarItem
            IconOrImgUrl={HiOutlineViewGrid}
            title="Dashboard"
            url=""
          />
          <hr />
          <LargeSidebarItem
            IconOrImgUrl={IoLayersOutline}
            title="Groups"
            url=""
          />
          <LargeSidebarItem
            IconOrImgUrl={IoSettingsOutline}
            title="Settings"
            url=""
          />
          <LargeSidebarItem
            IconOrImgUrl={IoPersonOutline}
            title="Profle"
            url=""
          />
          <hr />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <LargeSidebarItem
            IconOrImgUrl={WiMoonAltWaningCrescent1}
            title="Dark"
            url=""
          />
          <p className="text-left text-sm bg-neutral-100 py-2 px-2 rounded">
          {session?.user?.name}
          </p>
          <button
            onClick={() => signOut()}
            className="flex justify-center flex-row gap-2 items-center bg-slate-900 text-white hover:bg-slate-800 duration-500 p-1.5 rounded"
          >
            <HiOutlineLogout className="w-6 h-6" />
            <p></p>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function SmallSidebarItem({ Icon, title, url }) {
  const buttonStyles = { variant: "ghost" };

  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles,
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

function LargeSidebarItem({ IconOrImgUrl, title, url, isActive = false }) {
  const buttonStyles = { variant: "ghost" };

  return (
    <a
      href=""
      className={twMerge(
        buttonStyles,
        `w-full flex items-center rounded-lg gap-4 p-1.5 ${
          isActive
            ? "font-bold bg-stone-200 border-2 border-gray-200 hover:border-gray-300 duration-500 hover:bg-secondary"
            : ""
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" alt={title} />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
