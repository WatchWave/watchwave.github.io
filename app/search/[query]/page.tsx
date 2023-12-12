"use client";
import Loading from "@/app/loading";
import ContentCard from "@/components/ContentCard";
import Footer from "@/components/Footer";
import options from "@/lib/options";
import { Movie, SearchResultsProps, Show } from "@/types";
import { Button, Input, Slider } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const { query } = useParams();
  const [fieldQuery, setFieldQuery] = useState<string>(
    decodeURIComponent(query as string),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState<SearchResultsProps | null>(null);
  const [year, setYear] = useState<number | number[]>([
    1900,
    new Date().getFullYear(),
  ]);
  const [filteredData, setFilteredData] = useState(null);

  const router = useRouter();

  const clearField = () => {
    router.push("/search");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${fieldQuery}`);
  };

  // fetch data from api
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        // remove people
        data.results = data.results.filter(
          (result: Movie | Show) => result.media_type !== "person",
        );
        setIsLoading(false);
        setSearchData(data);
        setFilteredData(data.results);
      });
  }, [query]);

  const loadMore = () => {
    // console.log(
    //   "%c Loading More...",
    //   "background: #222; color: #bada55; font-size: 25px; font-weight: bold;",
    // );
    if (!searchData) return;
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${
        searchData.page + 1
      }&sort_by=popularity.desc`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        // remove people
        data.results = data.results.filter(
          (result: Movie | Show) => result.media_type !== "person",
        );
        setIsLoading(false);
        setSearchData({
          ...data,
          results: [...searchData.results, ...data.results],
        });
        // filter out tv shows and movies BOT
        const filtered = data.results.filter((result: Movie | Show) => {
          if (result.media_type === "movie") {
            return (
              result.release_date &&
              new Date(result.release_date).getFullYear() >= year[0] &&
              new Date(result.release_date).getFullYear() <= year[1]
            );
          }
          if (result.media_type === "tv") {
            return (
              result.first_air_date &&
              new Date(result.first_air_date).getFullYear() >= year[0] &&
              new Date(result.first_air_date).getFullYear() <= year[1]
            );
          }
        });
        setFilteredData([...filteredData, ...filtered]);
      });
  };

  // when year is changed, filter filteredData
  useEffect(() => {
    if (!searchData) return;
    const filtered = searchData.results.filter((result: Movie | Show) => {
      if (result.media_type === "movie") {
        return (
          result.release_date &&
          new Date(result.release_date).getFullYear() >= year[0] &&
          new Date(result.release_date).getFullYear() <= year[1]
        );
      }
      if (result.media_type === "tv") {
        return (
          result.first_air_date &&
          new Date(result.first_air_date).getFullYear() >= year[0] &&
          new Date(result.first_air_date).getFullYear() <= year[1]
        );
      }
    });
    setFilteredData(filtered);

    // if filtered data's length is less than 20, load more
    if (filtered.length < 20) {
      loadMore();
    }
  }, [year]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen w-full overflow-hidden bg-background px-5 text-foreground dark">
      <div className="w-full pt-20 sm:pl-36">
        <div className="fc h-full w-full gap-3">
          <form className="fc w-full gap-2" onSubmit={handleSubmit}>
            <div className="fc sm:fr w-full gap-2">
              <Input
                value={fieldQuery}
                onChange={(e) => setFieldQuery(e.target.value)}
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
            </div>
            <Slider
              onChange={(a) => setYear(a)}
              label="Year Range"
              step={1}
              minValue={1900}
              maxValue={new Date().getFullYear()}
              defaultValue={year}
              color="foreground"
              formatOptions={{
                style: "decimal",
                useGrouping: false,
              }}
              className="w-full max-w-[500px]"
            />
          </form>
          <p className="text-lg font-bold text-gray-500">
            Enter exact title to search
          </p>
          <div className="mt-10 w-full">
            {searchData && filteredData && (
              <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 md:grid-cols-5">
                {filteredData?.map((result) => (
                  <ContentCard content={result} key={result.id} />
                ))}
              </div>
            )}
            {filteredData.length === 0 && (
              <div className="fc w-full">No content found within this year</div>
            )}
            {searchData && searchData.page < searchData.total_pages && (
              <div className="fc mt-4 w-full">
                <Button variant="bordered" onClick={loadMore}>
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
