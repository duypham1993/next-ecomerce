import { Listbox, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCheck } from "react-icons/ai";

const options = [
  {
    value: "default",
    text: "Mặc định",
  },
  {
    value: "nameAZ",
    text: "Tên: A đến Z",
  },
  {
    value: "nameZA",
    text: "Tên: Z đến A",
  },
  {
    value: "priceLowToHigh",
    text: "Giá: thấp đến cao",
  },
  {
    value: "priceHighToLow",
    text: "Giá: cao đến thấp",
  },
];

const Sort = () => {
  const [sort, setSort] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (router.query.sort) {
      const currentOption = options.find(
        (item) => item.value === router.query.sort
      );
      setSort(currentOption);
    } else {
      setSort(options[0]);
    }
  }, [router.query.sort]);

  const handleSort = (value) => {
    router.query.page && delete router.query.page;
    router.push({
      query: { ...router.query, sort: value },
    });
  };

  return (
    <div className="flex items-center justify-end">
      <div className="none mr-2 font-light md:block">SẮP XẾP THEO:</div>
      <Listbox value={sort} onChange={setSort}>
        <div className="relative mt-1 min-w-[170px]">
          <Listbox.Button className="relative w-full cursor-default border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block">{sort.text}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <AiOutlineCaretDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-8 pr-4 ${
                      active ? "bg-gray-100 text-gray-600" : "text-gray-600"
                    }`
                  }
                  value={option}
                  onClick={() => handleSort(option.value)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.text}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                          <AiOutlineCheck aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Sort;
