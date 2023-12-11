"use client";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const clearField = () => {
    router.push("/search");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${query}`);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-background text-foreground dark">
      <div className="mx-auto h-screen max-w-6xl px-5">
        <div className="fc h-full w-full gap-3">
          <form className="fc sm:fr w-full gap-2" onSubmit={handleSubmit}>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              startContent={
                <IoSearch className="text-foreground-500" size={20} />
              }
              placeholder="Search"
              variant="bordered"
              classNames={{
                base: "w-full max-w-[500px]",
                inputWrapper: "h-12",
                input: "text-xl",
              }}
            />
            <div className="fr w-full gap-2 sm:w-auto">
              <Button
                variant="bordered"
                className="h-12 w-full sm:w-auto"
                onClick={clearField}
              >
                Clear
              </Button>
              <Button className="h-12 w-full sm:w-auto" type="submit">
                Search
              </Button>
            </div>
          </form>
          <p className="text-lg font-bold text-gray-500">
            Enter exact title to search
          </p>
        </div>
      </div>
    </div>
  );
};

export default Search;
