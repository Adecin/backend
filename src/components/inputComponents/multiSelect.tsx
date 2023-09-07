import * as React from "react";
import FormControl from "@mui/material/FormControl";
import styled from "@emotion/styled";
import {
  MenuItem,
  Select,
  ListSubheader,
  styled as muStyled,
  Checkbox,
} from "@mui/material";

interface propsType {
  labelname?: string;
  name: string;
  classes?: any;
  labelStyle?: any;
  data: {}[];
  fieldStyle?: any;
  handleChange: any;
  onblur?: any;
  touched?: any;
  readOnly?: boolean;
  required?: boolean;
  error?: any;
  value?: any;
  placeHolderStyle?: any;
  placeHolderText: string;
  background?: string;
  multiple?: boolean;
}

export default function MultiSelectMenu(props: propsType) {
  const {
    labelname,
    name = "",
    classes,
    labelStyle,
    data,
    fieldStyle,
    handleChange,
    onblur,
    touched = {},
    readOnly = false,
    required = false,
    error = {},
    value,
    multiple = true,
    placeHolderText = "select value",
    placeHolderStyle,
    background,
  } = props;

  const StyledDropdown = muStyled(Select)`
    background:${background ? "var(--light-blue)" : "white"};
    border: none;
    outline: none;
    height: 3rem;
    width:100%;
    color:black;
    font-weight:400;
   `;

  return (
    <div className={`dropdown px-4 ` + classes}>
      <label
        className="font-semibold mb-2 text-[#858585] text-[1rem] leading-[18.75px] font-normal capitalize"
        style={{ ...labelStyle }}
      >
        {labelname ?? ""}{" "}
        {required ? <span className="text-error">*</span> : ""}{" "}
      </label>
      {/* <DropdownLabel id="helper-label">{labelname}</DropdownLabel> */}
      <StyledDropdown
        className="outline-none border-none"
        sx={{
          border: "none",
          outline: "none",
          color: `${value && value[name] ? "" : "rgba(133, 133, 133, 0.24)"}`,
          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              border:
                touched[name] && error[name]
                  ? "2px solid var(--error)"
                  : "none",
              outline: "none",
            },
            "&:hover fieldset": {
              border: "none",
              outline: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
              outline: "none",
            },
          },
        }}
        labelId="helper-label"
        id="helper"
        onChange={(e: any) => {
          e.stopPropagation();
          handleChange(e);
        }}
        name={name}
        style={{ ...fieldStyle, outline: "none", border: "none" }}
        value={value}
        onBlur={onblur}
        readOnly={readOnly}
        multiple={multiple}
        renderValue={(selected: any) => {
          const filterValue: any = selected.map((e: any) =>
            Array.isArray(data) ? data.find((a: any) => a.id == e) : {}
          );
          return filterValue.map((e: any) => e.name + ", " ?? "");
        }}
      >
        <MenuItem disabled value={""}>
          {placeHolderText}
        </MenuItem>
        {Array.isArray(data) &&
          data.map((item: any, index: number) => {
            if (item.group) {
              return <ListSubheader key={index}>{item.name}</ListSubheader>;
            }
            return (
              <MenuItem selected={true} key={index} value={item.id}>
                <Checkbox checked={value.includes(item.id)} />
                {item.name}
              </MenuItem>
            );
          })}
      </StyledDropdown>
      <div
        style={{
          marginBottom: "1rem",
        }}
        className="text-error text-[10px] pl-[0.5rem]"
      >
        {touched[name] && error[name] ? error[name] : ""}
      </div>
    </div>
  );
}

/*import * as React from "react";
import FormControl from "@mui/material/FormControl";
import styled from "@emotion/styled";
import {
  MenuItem,
  Select,
  ListSubheader,
  styled as muStyled,
  Checkbox,
} from "@mui/material";

interface propsType {
  labelname?: string;
  name: string;
  classes?: any;
  labelStyle?: any;
  data: {}[];
  fieldStyle?: any;
  handleChange: any;
  onblur?: any;
  touched?: any;
  readOnly?: boolean;
  required?: boolean;
  error?: any;
  value?: any;
  placeHolderStyle?: any;
  placeHolderText: string;
  background?: string;
  multiple?: boolean;
}

export default function MultiSelectMenu(props: propsType) {
  const {
    labelname,
    name = "",
    classes,
    labelStyle,
    data,
    fieldStyle,
    handleChange,
    onblur,
    touched = {},
    readOnly = false,
    required = false,
    error = {},
    value = { name: "", id: 0 },
    multiple = true,
    placeHolderText = "select value",
    placeHolderStyle,
    background,
  } = props;

  const StyledDropdown = muStyled(Select)`
    background:${background ? "var(--light-blue)" : "white"};
    border: none;
    outline: none;
    height: 3rem;
    width:100%;
    color:black;
    font-weight:400;
   `;

  const addRegulation = (e: any, value: any) => {
    handleChange(value);
    console.log(`selected`, value);
  };
  return (
    <div className={`dropdown px-4 ` + classes}>
      <label
        className="pb-2 my-2 text-[#858585] text-[1rem] leading-[18.75px] font-normal capitalize"
        style={{ ...labelStyle }}
      >
        {labelname ?? ""}{" "}
        {required ? <span className="text-error">*</span> : ""}{" "}
      </label>
      {/* <DropdownLabel id="helper-label">{labelname}</DropdownLabel> 
      <StyledDropdown
        className="outline-none border-none"
        sx={{
          border: "none",
          outline: "none",
          color: `${value && value[name] ? "" : "rgba(133, 133, 133, 0.24)"}`,
          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              border:
                touched[name] && error[name]
                  ? "2px solid var(--error)"
                  : "none",
              outline: "none",
            },
            "&:hover fieldset": {
              border: "none",
              outline: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
              outline: "none",
            },
          },
        }}
        labelId="helper-label"
        id="helper"
        onChange={addRegulation}
        name={name}
        style={{ ...fieldStyle, outline: "none", border: "none" }}
        value={value[name]?.map((item: any) => {
          return { id: item, name: item };
        })}
        onBlur={onblur}
        readOnly={readOnly}
        multiple={multiple}
      >
        <MenuItem disabled value={"d"}>
          {placeHolderText}
        </MenuItem>
        {Array.isArray(data) &&
          data.map((item: any, index: number) => {
            if (item.group) {
              return <ListSubheader key={index}>{item.name}</ListSubheader>;
            }
            return (
              <MenuItem selected={true} key={index} value={item.id}>
                <Checkbox checked={value.indexOf(item) > -1} />
                {item.name}
              </MenuItem>
            );
          })}
      </StyledDropdown>
      <div
        style={{
          marginBottom: "1rem",
        }}
        className="text-error text-[10px] pl-[0.5rem]"
      >
        {touched[name] && error[name] ? error[name] : ""}
      </div>
    </div>
  );
}*/
