import { useState } from "react";
import AddQuestion from "./addQuestion";
import CustomButton from "./customButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextInput from "./inputComponents/textInput";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { useFormik } from "formik";
import * as Yup from 'yup';
import LabelText from "./labelText";

const questData = [
    {
        question: "wvaebk.jev ?",
        answer: "",
        answerType: ""
    },
    {
        question: "wvaebk.jev ?",
        options: [],
        answerType: "dropdown"
    }
]

export default function QuestionaireComp(props: any) {
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

    return (
        <div>
            <p style={{
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "19px",
                letterSpacing: "0.05em"
            }}>{`Questions`}</p>
            <div>
                {questData.map((item: any, index: any) => {

                    const handleEdit = () => {
                        setEditQuestion(true)
                    };

                    const handleCancelEdit = () => {
                        setEditQuestion(false)
                    }
                    console.log(`editQestion`, editQestion);
                    console.log(`item`, item.answerType);

                    return (
                        <div key={index} className="flex justify-between">
                            <div style={{
                                padding: "1.5rem",
                                borderBottom: "1px solid #858585"
                            }}>
                                <div className="flex items-center">
                                    <span className="text-grey text-[18px]">{`${index + 1}.`}</span>
                                    <LabelText classes={` p-[1rem] [m-1rem]`}
                                        customStyle={{
                                            padding: "1.5rem",
                                            margin: "1rem",
                                            background: "#F7F7F7",
                                        }} labelName={item.question} />
                                </div>
                                {(editQestion && item.answerType == "dropdown") && <div className="flex">
                                    <div className=" bg-grey w-full flex flex-col mt-[1rem] px-[2rem] py-[1rem] relative"
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
                                }
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
            {addQuestion && <AddQuestion questionIndex={questData.length + 1} onClose={handleCancelQues} />}
        </div>
    )
}