import { useEffect, useState } from "react";
import CustomButton from "../customButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextInput from "../inputComponents/textInput";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { useFormik } from "formik";
import * as Yup from "yup";
import LabelText from "../labelText";
import SelectMenu from "../inputComponents/selectMenu";
import { useDispatch, useSelector } from "react-redux";
import { listAllQuestion } from "@/redux/reducer/regulation/list-question";
import {
  is_success,
  updateQuestion,
} from "@/redux/reducer/regulation/update-question";
import {
  add_question_is_success,
  addQuestion,
} from "@/redux/reducer/regulation/add-question";
import { deleteQuestion } from "@/redux/reducer/regulation/delete-question";

export default function QuestionaireComp(props: any) {
  const dispatch = useDispatch();
  const { data } = props;
  //   const [addQuestion, setAddQuestion] = useState<boolean>(false);
  const [isAddQuestion, setAddQuestion] = useState(false);

  // api data
  const listQuestion = useSelector((state: any) => state.listQuestion);
  const UpdateQuestion = useSelector((state: any) => state.UpdateQuestion);
  const AddQuestion = useSelector((state: any) => state.AddQuestion);
  const DeleteQuestion = useSelector((state: any) => state.DeleteQuestion);

  //   useEffects
  useEffect(() => {
    dispatch(listAllQuestion("?pillarId=" + props.pillarId ?? ""));
    if (AddQuestion.isSuccess) {
      setAddQuestion(false);
      dispatch(add_question_is_success());
    }
  }, [
    UpdateQuestion,
    AddQuestion,
    props.regulationId,
    props.pillarId,
    DeleteQuestion,
  ]);

  return (
    <div>
      <p
        style={{
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "19px",
          letterSpacing: "0.05em",
        }}
      >{`Questions`}</p>
      {/* list question */}
      <div>
        {Array.isArray(listQuestion.response) &&
          listQuestion.response?.map((item: any, index: any) => {
            return (
              <Questing
                pillarId={props.pillarId}
                regulationId={props.regulationId}
                key={index}
                item={item}
                index={index}
              />
            );
          })}
      </div>
      {/* add question */}
      {isAddQuestion && (
        <>
          {" "}
          <div
            style={{
              padding: "1.5rem",
              borderBottom: "1px solid #858585",
            }}
          >
            <AddQuesting
              length={
                Array.isArray(listQuestion.response)
                  ? listQuestion.response.length + 1
                  : 1
              }
              pillarId={props.pillarId}
              regulationId={props.regulationId}
              onClose={() => {
                setAddQuestion(false);
              }}
            />
          </div>
        </>
      )}
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
            setAddQuestion(true);
          }}
        />
      </div>
    </div>
  );
}

const Questing = ({ item, index, pillarId, regulationId }: any) => {
  const [is_edit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const UpdateQuestion = useSelector((state: any) => state.UpdateQuestion);

  //   useEffects
  useEffect(() => {
    if (UpdateQuestion.isSuccess) {
      setIsEdit(false);
      dispatch(is_success());
    }
  }, [UpdateQuestion]);

  // farms
  const QuestionaireSchema = Yup.object().shape({
    question: Yup.string().required("question is required"),
    questionType: Yup.string().required("question type is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: item.question ?? "",
      questionType: item.questionType ?? "",
      options: item.options ? JSON.parse(item.options ?? "[]") : [],
    },
    validationSchema: QuestionaireSchema,
    onSubmit: (values: any) => {
      const object = {
        question: values.question,
        // surveyId: 1,
        regulationId: regulationId ?? "",
        pillarId: pillarId ?? "",
        id: item.id,
        questionType: values.questionType,
        options:
          values.questionType == "DropDown"
            ? JSON.stringify(values.options)
            : JSON.stringify([]),
      };
      dispatch(updateQuestion(object));
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
  const answerType = [
    { name: "Text Box", id: "Text" },
    { name: "DropDown", id: "DropDown" },
    { name: "Image Capture", id: "image" },
    {
      name: "Date",
      id: "date",
    },
    // { name: "Yes or No", id: "YesorNo" },
    { name: "Number Box", id: "number" },
    { name: "GEO Location", id: "location" },
  ];

  return (
    <>
      <div
        key={index}
        style={{
          padding: "1.5rem",
          borderBottom: "1px solid #858585",
        }}
        className="flex justify-between w-full"
      >
        <div>
          <div className="flex items-start  mx-2">
            <span className="text-grey mt-[10px] text-[18px]">{`${
              index + 1
            }.`}</span>

            <TextInput
              label={`Question`}
              name="question"
              readOnly={!is_edit}
              customStyle={{
                marginTop: "0.5rem",
                background: "#F7F7F7",
                width: "497px",
                color: "#858585",
              }}
              required={true}
              value={values}
              handleChange={handleChange}
              onblur={handleBlur}
              touched={touched}
              error={errors}
            />
          </div>

          <div className="mx-4 pt-[1rem]">
            <label className="ml-4 text-[#888888]">
              Question Type <span className="text-[red]">*</span>
            </label>
            <SelectMenu
              classes={` my-3`}
              fieldStyle={{
                color: "#858585",
                background: "#F7F7F7",
                width: "340px",
              }}
              labelname={""}
              name={"questionType"}
              data={answerType}
              readOnly={!is_edit}
              value={values}
              handleChange={handleChange}
              onblur={handleBlur}
              touched={touched}
              error={errors}
              placeHolderText={"Drop down"}
            />
          </div>
          {/* options */}
          <div className="ml-6 grid grid-cols-1 2xl:grid-cols-2">
            {values.questionType == "DropDown" &&
              values.options?.map((e: any, index: number) => {
                return (
                  <>
                    <div
                      key={index}
                      className=" bg-grey mx-2 w-[400px] flex flex-col mt-[1rem] px-[2rem] relative"
                      style={{
                        background: "#F7F7F7",
                      }}
                    >
                      {is_edit && index != 0 ? (
                        <DoDisturbOnIcon
                          onClick={() => {
                            const array = [...values.options];
                            array.splice(index, 1);
                            setFieldValue("options", array);
                          }}
                          className="flex self-end mr-[-30px] cursor-pointer absolute top-[10px]"
                          style={{ color: "red" }}
                        />
                      ) : (
                        ""
                      )}

                      <TextInput
                        label={`Option ${index + 1}`}
                        labelStyle={{ color: "#3D7FFA" }}
                        readOnly={!is_edit}
                        name="option"
                        customStyle={{
                          marginTop: "0.5rem",
                          width: "336px",
                        }}
                        value={e}
                        handleChange={(e: any) => {
                          const optionArray = [...values.options];
                          optionArray[index] = e.target.value;
                          setFieldValue("options", optionArray);
                        }}
                      />
                    </div>
                  </>
                );
              })}
            {is_edit && values.questionType === "DropDown" ? (
              <CustomButton
                classes={`text-primary w-[300px]`}
                buttonName={`Add Option`}
                startIcon={<AddCircleIcon className="text-primary" />}
                customStyle={{
                  background: "none",
                  padding: "1rem 3rem",
                  color: "#3D7FFA",
                }}
                handleOnClick={() => {
                  const optionArray = [...values.options];
                  optionArray.push("");
                  setFieldValue("options", optionArray);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {/* button */}
        <div className="flex flex-col gap-[10px] justify-center">
          <CustomButton
            classes={` w-[107px] rounded-[30px]`}
            buttonName={is_edit ? `Save` : `Edit`}
            customStyle={{
              background: "#3D7FFA",
              borderRadius: "30px",
              padding: "0.5rem 1.5rem",
            }}
            handleOnClick={() => {
              if (is_edit) {
                handleSubmit();
              } else {
                setIsEdit(!is_edit);
              }
            }}
          />
          <CustomButton
            classes={` bg-[#BEBEBE] w-[107px]  rounded-[30px]`}
            customStyle={{
              background: "#BEBEBE",
              borderRadius: "30px",
              padding: "0.5rem 1.5rem",
            }}
            buttonName={is_edit ? `Cancel` : `Delete`}
            handleOnClick={() => {
              if (is_edit) {
                setIsEdit(!is_edit);
                resetForm();
              } else {
                dispatch(deleteQuestion("?id=" + item.id));
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

const AddQuesting = ({ length, pillarId, regulationId, onClose }: any) => {
  const dispatch = useDispatch();

  // farms
  const QuestionaireSchema = Yup.object().shape({
    question: Yup.string().required(" question is required"),
    questionType: Yup.string().required("question type is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: "",
      questionType: "",
      options: [],
    },
    validationSchema: QuestionaireSchema,
    onSubmit: (values: any) => {
      const object = {
        question: values.question,
        regulationId: regulationId ?? "",
        pillarId: pillarId ?? "",
        questionType: values.questionType,
        options:
          values.questionType == "DropDown"
            ? JSON.stringify(values.options)
            : JSON.stringify([]),
      };
      dispatch(addQuestion(object));
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

  const answerType = [
    { name: "Text Box", id: "Text" },
    { name: "DropDown", id: "DropDown" },
    { name: "Image Capture", id: "image" },
    {
      name: "Date",
      id: "date",
    },
    // { name: "Yes or No", id: "YesorNo" },
    { name: "Number Box", id: "number" },
    { name: "GEO Location", id: "location" },
  ];

  return (
    <>
      <div
        style={{
          padding: "1.5rem",
        }}
        className="flex justify-between w-full"
      >
        <div>
          <div className="flex items-start  mx-2">
            <span className="text-grey mt-[10px] text-[18px]">{`${length}.`}</span>

            <TextInput
              label={`Question`}
              name="question"
              customStyle={{
                marginTop: "0.5rem",
                background: "#F7F7F7",
                width: "497px",
                color: "#858585",
              }}
              required={true}
              value={values}
              handleChange={handleChange}
              onblur={handleBlur}
              touched={touched}
              error={errors}
            />
          </div>

          <div className="mx-4 pt-[1rem]">
            <label className="ml-4 text-[#888888]">
              Question Type <span className="text-[red]">*</span>
            </label>
            <SelectMenu
              classes={` my-3`}
              fieldStyle={{
                color: "#858585",
                background: "#F7F7F7",
                width: "340px",
              }}
              labelname={""}
              name={"questionType"}
              data={answerType}
              value={values}
              handleChange={handleChange}
              onblur={handleBlur}
              touched={touched}
              error={errors}
              placeHolderText={"Select question type"}
            />
          </div>
          {/* options */}
          <div className="ml-6 grid grid-cols-1 2xl:grid-cols-2">
            {values.questionType == "DropDown" &&
              values.options?.map((e: any, index: number) => {
                return (
                  <>
                    <div
                      key={index}
                      className=" bg-grey mx-2 w-[400px] flex flex-col mt-[1rem] px-[2rem] relative"
                      style={{
                        background: "#F7F7F7",
                      }}
                    >
                      <DoDisturbOnIcon
                        onClick={() => {
                          const array = [...values.options];
                          array.splice(index, 1);
                          setFieldValue("options", array);
                        }}
                        className="flex self-end mr-[-30px] cursor-pointer absolute top-[10px]"
                        style={{ color: "red" }}
                      />

                      <TextInput
                        label={`Option ${index + 1}`}
                        labelStyle={{ color: "#3D7FFA" }}
                        name="option"
                        customStyle={{
                          marginTop: "0.5rem",
                          width: "336px",
                        }}
                        value={e}
                        handleChange={(e: any) => {
                          const optionArray = [...values.options];
                          optionArray[index] = e.target.value;
                          setFieldValue("options", optionArray);
                        }}
                      />
                    </div>
                  </>
                );
              })}
            {values.questionType === "DropDown" ? (
              <CustomButton
                classes={`text-primary w-[300px]`}
                buttonName={`Add Option`}
                startIcon={<AddCircleIcon className="text-primary" />}
                customStyle={{
                  background: "none",
                  padding: "1rem 3rem",
                  color: "#3D7FFA",
                }}
                handleOnClick={() => {
                  const optionArray = [...values.options];
                  optionArray.push("");
                  setFieldValue("options", optionArray);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {/* button */}
        <div className="flex flex-col gap-[10px] justify-center">
          <CustomButton
            classes={` w-[107px] rounded-[30px]`}
            buttonName={`Save`}
            customStyle={{
              background: "#3D7FFA",
              borderRadius: "30px",
              padding: "0.5rem 1.5rem",
            }}
            handleOnClick={() => {
              handleSubmit();
            }}
          />
          <CustomButton
            classes={` bg-[#BEBEBE] w-[107px]  rounded-[30px]`}
            customStyle={{
              background: "#BEBEBE",
              borderRadius: "30px",
              padding: "0.5rem 1.5rem",
            }}
            buttonName={`Cancel`}
            handleOnClick={() => {
              resetForm();
              onClose();
            }}
          />
        </div>
      </div>
    </>
  );
};
