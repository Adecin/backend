import * as React from "react";
import FormControl from "@mui/material/FormControl";
import styled from "@emotion/styled";
import {
  MenuItem,
  Select,
  ListSubheader,
  styled as muStyled,
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
  placeHolderText: string;
  background?: string;
}

export default function SelectMenu(props: propsType) {
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
    placeHolderText = "select value",
    background,
  } = props;

  const ErrorMsgContainer = styled.div`
    color: red;
    font-size: 0.9em;
    padding-left: 0.5rem;
  `;

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
        className="pb-2 my-2 text-[#858585] text-[1rem] leading-[18.75px] font-normal capitalize"
        style={{ ...labelStyle }}
      >
        {labelname ?? ""}{" "}
        {required ? (
          <span
            style={{
              color: "#ff2626",
            }}
          >
            *
          </span>
        ) : (
          ""
        )}{" "}
      </label>
      <FormControl className="w-full">
        {/* <DropdownLabel id="helper-label">{labelname}</DropdownLabel> */}
        <StyledDropdown
          className="outline-none border-none"
          sx={{
            border: "none",
            outline: "none",
            color: `${value && value[name] ? "" : "rgba(133, 133, 133, 0.24)"}`,
            "&.MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
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
          onChange={handleChange}
          name={name}
          style={{ ...fieldStyle, outline: "none", border: "none" }}
          value={value ? (value[name] != "" ? value[name] : "d") : "d"}
          onBlur={onblur}
          readOnly={readOnly}
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
                  {item.name}
                </MenuItem>
              );
            })}
        </StyledDropdown>
      </FormControl>
      <ErrorMsgContainer
        style={{
          marginBottom: "1rem",
        }}
        className="red"
      >
        {touched[name] && error[name] ? error[name] : ""}
      </ErrorMsgContainer>
    </div>
  );
}
