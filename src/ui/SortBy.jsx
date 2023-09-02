import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ option }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <Select
        option={option}
        type="white"
        value={sortBy}
        onChange={handleChange}
      />
    </div>
  );
}
