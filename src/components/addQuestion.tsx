import { useFormik } from "formik";
import * as Yup from 'yup';
import SelectMenu from "./inputComponents/selectMenu";
import CustomButton from "./customButton";
import TextInput from "./inputComponents/textInput";

export default function AddQuestion(props: any) {
    const { questionIndex,onClose } = props;

    const QuestionaireSchema = Yup.object().shape({
        question: Yup.string().required('Please enter your question.'),
        answerType: Yup.string().required('')
    });

    const formik = useFormik({
        initialValues: {
            question: '',
            answerType: ""
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

    const answerType=[
        {name:"freeText",id:"01"},
        {name:"dropdown",id:"02"}
    ]

    return (
        <div className="flex justify-between">
            <div className="">
                <div className="text-grey flex items-center">
                    <span style={{
                        fontSize: "16px"
                    }}>{questionIndex}</span>
                    <TextInput
                        classes={` py-0 pt-2`}
                        label={""}
                        name="question"
                        value={values}
                        onblur={handleBlur}
                        touched={touched}
                        handleChange={handleChange}
                        error={errors}
                        placeholder="Enter the question here"
                        customStyle={{
                            padding: "1rem",
                            background: "#F7F7F7",
                            width: "497px"
                        }}
                    />
                </div>
                <SelectMenu
                    classes={`pt-[1rem] my-3`}
                    fieldStyle={{ color: "#3D7FFA", background: "#F7F7F7", width: "340px" }}
                    labelname={""}
                    name={"answerType"}
                    data={answerType}
                    handleChange={handleChange}
                    value={values}
                    placeHolderText={"Add answer type"}
                />
            </div>
            <div className="flex flex-col justify-evenly">
                <CustomButton
                    classes={` w-[107px] rounded-[30px]`}
                    buttonName={`Save`}
                    customStyle={{ background: "#3D7FFA", borderRadius: "30px", padding: "0.5rem 1.5rem" }}
                    handleOnClick={() => {console.log(`values`,values) }}

                />
                <CustomButton
                    classes={` w-[107px] rounded-[30px]`}
                    customStyle={{ background: "#BEBEBE", borderRadius: "30px", padding: "0.5rem 1.5rem" }}
                    buttonName={`Cancel`}
                    handleOnClick={() => { onClose()}}
                />
            </div>
        </div>
    )
}