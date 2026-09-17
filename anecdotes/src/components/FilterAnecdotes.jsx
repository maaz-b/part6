import { useAnecdoteActions } from "../store";
const FilterAnecdotes = () => {
  const { setFilter } = useAnecdoteActions();
  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.value && event.target.value != "") {
      setFilter(event.target.value);
    } else {
      setFilter(null);
    }
  };
  return (
    <>
      <div>
        filter{" "}
        <input
          data-testid="filter"
          style={{ marginBottom: "10px" }}
          onChange={handleChange}
        ></input>
      </div>
    </>
  );
};

export { FilterAnecdotes };
