import clsx from "clsx";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import { Input } from "./Input";

export default function SearchField() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <BiSearch className="h-6 w-6" />
      </div>
      <Input
        name="query"
        placeholder="Пошук за іменем або нікнеймом"
        autoComplete="off"
      />
      <div
        className={clsx(
          "absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4"
        )}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <MdClear className="h-6 w-6" />
      </div>
    </div>
  );
}
