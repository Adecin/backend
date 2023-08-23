import styled from "@emotion/styled";

const DatakeyValue = (props: any) => {
    const { label, value } = props
    const DataKeyText = styled.span`
    font-weight:300;
    &::after{
        content:' - ';
        padding:0 0.25rem;
    }`
    return (
        <div className="text-base leading-[19px] tracking-wider">
            <DataKeyText>{label}</DataKeyText>
            <span className="font-semibold">{value}</span>
        </div>

    )
};

export default DatakeyValue;