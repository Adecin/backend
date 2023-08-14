 const LabelText = (props: any) => {
    const { classes, labelName, customStyle } = props;
    return (
        <p className={classes} style={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            letterSpacing: "0.05em",
            textAlign: "left",
            color: "#858585",
            ...customStyle
        }}>{labelName}</p>
    )
};

export default LabelText;