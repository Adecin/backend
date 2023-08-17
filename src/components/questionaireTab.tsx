import { useState } from "react";
import AddQuestion from "./addQuestion";
import CustomButton from "./customButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextInput from "./inputComponents/textInput";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { useFormik } from "formik";
import * as Yup from 'yup';
import LabelText from "./labelText";
import SelectMenu from "./inputComponents/selectMenu";


export default function QuestionaireComp(props: any) {

    const { data } = props;
    const [addQuestion, setAddQuestion] = useState(false);
    const [editQestion, setEditQuestion] = useState(false);

    const QuestionaireSchema = Yup.object().shape({
        question: Yup.string().required('Please enter your question.'),
        answerType: Yup.string().required(''),
        option: Yup.string()
    });

    const optionsType: { name: string; id: any }[] = [
        {
            name: '',
            id: ''
        }
    ];

    const formik = useFormik({
        initialValues: {
            question: '',
            answerType: "",
            option: ""
        },
        validationSchema: QuestionaireSchema,
        onSubmit: (values: any) => {
        },
    });
    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        setFieldValue,
        resetForm,
        errors,
    } = formik;

    const handleAddQues = () => {
        setAddQuestion(true)
        console.log(`adding ques`)
    };

    const handleCancelQues = () => {
        setAddQuestion(false)
    }
    const handleEdit = () => {
        setEditQuestion(true)
    };
    const handleCancelEdit = () => {
        setEditQuestion(false)
    }
    return (
        <div>
            <p style={{
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "19px",
                letterSpacing: "0.05em"
            }}>{`Questions`}</p>
            <div>
                {data?.map((item: any, index: any) => {


                    return (
                        <div key={index} style={{
                            padding: "1.5rem",
                            borderBottom: "1px solid #858585"
                        }} className="flex justify-between w-full">
                            <div >
                                <div className="flex items-center">
                                    <span className="text-grey text-[18px]">{`${index + 1}.`}</span>
                                    <LabelText classes={` p-[1rem] [m-1rem]`}
                                        customStyle={{
                                            padding: "1rem",
                                            margin: "1rem",
                                            background: "#F7F7F7",
                                        }} labelName={item.question} />
                                </div>
                                <div className="mx-4">
                                    {item?.answerType == 'dropdown' ? <SelectMenu
                                        classes={`pt-[1rem] my-3`}
                                        fieldStyle={{ color: "#3D7FFA", background: "#F7F7F7", width: "340px" }}
                                        labelname={""}
                                        name={"answerType"}
                                        data={item.options}
                                        handleChange={handleChange}
                                        value={values}
                                        placeHolderText={"Drop down"}
                                    /> : <TextInput
                                        label={`Answer`}
                                        labelStyle={{ color: "#3D7FFA", marginLeft: "0.5rem" }}
                                        name="option"
                                        customStyle={{
                                            background: "#F7F7F7",
                                            outline: "1px solid #F7F7F7",
                                            marginTop: "0.5rem",
                                            width: "336px"
                                        }}
                                        value={values}
                                        handleChange={(e: any) => {
                                            console.log(e.target.value);
                                        }} />}
                                </div>

                                {(editQestion && item.answerType == "dropdown") && <div className=" flex w-full ml-8">
                                    <div className="gird grid-cols-3">
                                    {item.options.map((optionItem: any, index: any) => {
                                        return (
                                            <div key={index} className=" bg-grey w-full flex flex-col mt-[1rem] px-[2rem] relative"
                                                style={{
                                                    background: "#F7F7F7"
                                                }}>
                                                <DoDisturbOnIcon className="flex self-end absolute top-[10px]" style={{ color: "red" }} />
                                                <TextInput
                                                    label={`Option ${optionItem?.id}`}
                                                    labelStyle={{ color: "#3D7FFA" }}
                                                    name="option"
                                                    customStyle={{
                                                        marginTop: "0.5rem",
                                                        width: "336px"
                                                    }}
                                                    value={optionItem?.name}
                                                    handleChange={(e: any) => {
                                                        console.log(e.target.value);
                                                    }} />
                                            </div>
                                        )
                                    })}
                                    </div>
                                    <CustomButton
                                        classes={`text-primary w-full`}
                                        buttonName={`Add Option`}
                                        startIcon={<AddCircleIcon className="text-primary" />}
                                        customStyle={{
                                            background: "none",
                                            padding: "1rem 3rem",
                                            color: "#3D7FFA",
                                        }}
                                        handleOnClick={() => {
                                            setFieldValue('opt', [
                                                ...values.option,
                                                {
                                                    name: '',
                                                    id: ''
                                                }
                                            ]);
                                        }}
                                    />

                                </div>}
                                {/* {(editQestion && item.answerType == "dropdown") && <div className="flex items-center ml-8">
                                    <div className=" bg-grey w-full flex flex-col mt-[1rem] px-[2rem] relative"
                                        style={{
                                            background: "#F7F7F7"
                                        }}>
                                        <DoDisturbOnIcon className="flex self-end absolute top-[10px]" style={{ color: "red" }} />
                                        <TextInput
                                            label={`Option ${item?.options?.length + 1}`}
                                            labelStyle={{ color: "#3D7FFA" }}
                                            name="option"
                                            customStyle={{
                                                marginTop: "0.5rem",
                                                width: "336px"
                                            }}
                                            value={values}
                                            handleChange={(e: any) => {
                                                console.log(e.target.value);
                                            }} />

                                    </div>
                                    <CustomButton
                                        classes={`text-primary w-full`}
                                        buttonName={`Add Option`}
                                        startIcon={<AddCircleIcon className="text-primary" />}
                                        customStyle={{
                                            height:"3rem",
                                            background: "none",
                                            padding: "1rem 3rem",
                                            color: "#3D7FFA",
                                        }}
                                        handleOnClick={() => {
                                            setFieldValue('opt', [
                                                ...values.option,
                                                {
                                                    name: '',
                                                    id: ''
                                                }
                                            ]);
                                        }}
                                    />
                                </div>
                                } */}
                            </div>
                            <div className="flex flex-col justify-evenly">
                                <CustomButton
                                    classes={` w-[107px] rounded-[30px]`}
                                    buttonName={editQestion ? `Save` : `Edit`}
                                    customStyle={{ background: "#3D7FFA", borderRadius: "30px", padding: "0.5rem 1.5rem" }}
                                    handleOnClick={() => { handleEdit() }}

                                />
                                <CustomButton
                                    classes={` bg-[#BEBEBE] w-[107px] rounded-[30px]`}
                                    customStyle={{ background: "#BEBEBE", borderRadius: "30px", padding: "0.5rem 1.5rem" }}
                                    buttonName={editQestion ? `Cancel` : `Delete`}
                                    handleOnClick={() => { editQestion ? handleCancelEdit() : {} }}
                                />
                            </div>
                        </div>)
                })}
            </div>
            {addQuestion && <div style={{
                padding: "1.5rem",
                borderBottom: "1px solid #858585"
            }}>
                <AddQuestion questionIndex={data.length + 1} onClose={handleCancelQues} />
            </div>}
            <div className="py-3" style={{}}>
                <CustomButton
                    classes={`text-primary `}
                    buttonName={`Add question`}
                    startIcon={<AddCircleIcon className="text-primary" />}
                    customStyle={{
                        background: "none",
                        padding: "1rem 3rem",
                        color: "#3D7FFA",
                    }}
                    handleOnClick={() => {
                        handleAddQues()
                    }}
                />
            </div>
        </div>
    )
}