/** @format */

const tokenSaver = (res) => {
  localStorage.setItem("token", res);
};

const dateFormatter = (date) => {
  const originalDate = new Date(date);
  const month = originalDate?.toLocaleDateString("en-US", {
    month: "long",
  });
  const day = originalDate?.toLocaleDateString("en-US", {
    month: "numeric",
  });
  const year = originalDate?.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const time = originalDate?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const hasAll = day && year && time;

  return (
    hasAll && (
      <span>
        {" "}
        {month?.slice(0, 3)} {day}, {year} {time}{" "}
      </span>
    )
  );
};

const returnFullName = (i) => {
  if (i?.fullName) {
    return i.fullName;
  } else if (i?.firstName || i?.lastName) {
    return i?.firstName + " " + i.lastName;
  } else {
    return "";
  }
};

const LogOutHandler = (navigate) => {
  localStorage.clear();
  navigate("/");
};

const debouncedSetQuery = (term, setQuery) => {
  clearTimeout(debouncedSetQuery.timeoutId);
  debouncedSetQuery.timeoutId = setTimeout(() => {
    setQuery(term);
  }, 500);
};

export { tokenSaver, dateFormatter, returnFullName, LogOutHandler };
