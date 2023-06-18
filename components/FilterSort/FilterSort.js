import FilterHeader from "./Filter/FilterHeader";
import Sort from "./Sort/Sort";

const FilterSort = ({ sort, handleOnChangeSort }) => {
  return (
    <div className="mb-6">
      <div className="container">
        <div className="flex items-center">
          <div className="w-1/2">
            <FilterHeader />
          </div>
          <div className="pull-right w-1/2">
            <Sort sort={sort} handleOnChangeSort={handleOnChangeSort} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
