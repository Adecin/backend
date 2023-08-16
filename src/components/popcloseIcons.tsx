import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

export default function PopCloseIcon (props : any) {
    const {handleClick,style} = props;
    return(
        <CloseOutlinedIcon className='flex self-end mx-3 my-2' style={{
            color:"#CCCCCC",
            cursor:"pointer",
            ...style
        }} onClick={handleClick} />
    )   
}

export function PopCloseRoundedIcon (props : any) {
    const {handleClick, style} = props;
    return(
        <HighlightOffRoundedIcon className='flex self-end mx-3 my-2' style={{
            color:"#CCCCCC",
            cursor:"pointer",
            ...style
        }} onClick={handleClick} />
    )   
}


