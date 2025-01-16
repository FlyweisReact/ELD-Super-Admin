/** @format */

import { ClipLoader } from "react-spinners";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="flex justify-center p-5">
        {" "}
        <ClipLoader />{" "}
      </div>
    )
  );
};

const Pagination = ({
  className,
  currentPage,
  setCurrentPage,
  hasPrevPage,
  hasNextPage,
}) => {
  return (
    <div className={`pagination ${className}`}>
      <ul>
        {hasPrevPage && (
          <li onClick={() => setCurrentPage(currentPage - 1)}>
            <GrFormPrevious size={20} />
          </li>
        )}
        <li>{currentPage}</li>
        {hasNextPage && (
          <li onClick={() => setCurrentPage(currentPage + 1)}>
            <GrFormNext size={20} />
          </li>
        )}
      </ul>
    </div>
  );
};

const InputComponent = ({
  placeholder = "",
  onChangeEvent = () => {},
  value = "",
  className = "",
  required,
  type = "text",
}) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChangeEvent}
      value={value}
      type={type}
      className={className}
      required={required ? true : false}
    />
  );
};

const ButtonComponent = ({
  isLoading,
  label,
  type,
  className,
  loaderColor = "#fff",
  onClickEvent,
}) => {
  return (
    <button type={type} className={className} onClick={onClickEvent}>
      {" "}
      {isLoading ? <ClipLoader color={loaderColor} /> : label}{" "}
    </button>
  );
};

const Tabs = ({ tab, setTab, option, ExtraComponent }) => {
  return (
    <div className="tabs-list">
      <ul>
        {option.map((i) => (
          <li
            className={tab === i.value ? "active" : ""}
            onClick={() => setTab(i.value)}
          >
            {" "}
            {i.label}{" "}
          </li>
        ))}
      </ul>
      {ExtraComponent && <ExtraComponent />}
    </div>
  );
};

const SectionHeading = ({ title }) => {
  return <h4 className={`section-heading font-large`}> {title} </h4>;
};

const CustomProgressBar = ({ label, percentage = 0, color }) => {
  return (
    <div className="custom-progress-bar">
      <p className="first">{label}</p>
      <div className="bar">
        <span
          className="progress"
          style={{ backgroundColor: color, width: `${percentage}%` }}
        ></span>
      </div>
      <p> {percentage}%</p>
    </div>
  );
};

export {
  Loader,
  Pagination,
  InputComponent,
  ButtonComponent,
  Tabs,
  SectionHeading,
  CustomProgressBar,
};
