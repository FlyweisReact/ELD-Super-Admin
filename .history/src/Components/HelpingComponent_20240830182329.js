/** @format */

import { ClipLoader } from "react-spinners";

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

const Pagination = ({ className, totalPages, currentPage, setCurrentPage }) => {
  return (
    <div className={`pagination ${className}`}>
      <ul>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={index + 1 === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SectionHeading = ({ title }) => {
  return <h4 className={`section-heading font-large`}> {title} </h4>;
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

export { ButtonComponent, InputComponent, Pagination, Loader, SectionHeading ,Tabs };
