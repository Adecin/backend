import { Button } from "@mui/material";

export default function CustomButton(props: any) {
  const {
    handleOnClick,
    buttonName,
    buttonIcon,
    startIcon,
    classes,
    customStyle,
    disable,
  } = props;

  return (
    <Button
      className={`bg-primary hover:bg-primary ` + classes}
      style={{
        color: "#fff",
        fontSize: "14px",
        fontWeight: 400,
        //padding: "0.75rem 1rem",
        borderRadius: "5px",
        textTransform: "none",
        ...customStyle,
      }}
      onClick={handleOnClick}
      startIcon={startIcon}
      endIcon={buttonIcon}
      disabled={disable}
    >
      {buttonName}
    </Button>
  );
}
