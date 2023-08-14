const HeaderText = (props: any) => {
    const { text, required } = props
    return (
        <h3 style={{
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19px",
            letterSpacing: "0.05em",
            textAlign: "left"

        }}> <span>{text}</span> {required ? (
            <span
                style={{
                    color: "#ff2626",
                }}
            >
                *
            </span>
        ) : (
            ""
        )}</h3 >

    )
};

export default HeaderText;