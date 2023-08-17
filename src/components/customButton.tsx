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
      className={` hover:bg-primary ` + classes}
      style={{
        background:"#3D7FFA",
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
