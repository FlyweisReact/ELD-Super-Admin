/** @format */

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

export { dateFormatter };
