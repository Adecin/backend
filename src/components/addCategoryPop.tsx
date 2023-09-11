import { useDispatch, useSelector } from "react-redux";
import CustomButton from "./customButton";
import TextArea from "./inputComponents/texArea";
import TextInput from "./inputComponents/textInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addCategory } from "@/redux/reducer/survey/addCategory";

export default function AddCategory(props: any) {
  const { regulationId, onClose } = props;
  const dispatch = useDispatch();

  const SignInSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Must be only alphabets")
      .required("Survey name is required"),
    description: Yup.string().required("Survey description is required"),
    regulationId: Yup.string().required(),
  });

  const AddCategoryResponse = useSelector(
    (state: any) => state.AddCategoryState
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      regulationId: regulationId,
    },
    validationSchema: SignInSchema,
    onSubmit: (values: any) => {
      //console.log(values);
      dispatch(addCategory(values));
      if (AddCategoryResponse.isSuccess) {
        onClose();
      }
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

  return (
    <div>
      <span
        style={{
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "21px",
          letterSpacing: "0.05em",
          textAlign: "left",
          color: "#43424D",
          margin: "2rem",
        }}
      >{`Add Category`}</span>
      <div className="m-[1rem]">
        <TextInput
          classes={` py-0 pt-2`}
          required
          label={"Category name"}
          labelStyle={{ fontWeight: 500, color: "#43424D" }}
          name="name"
          value={values}
          onblur={handleBlur}
          touched={touched}
          handleChange={handleChange}
          error={errors}
          placeholder="Type category name here"
          customStyle={{
            background: "#F7F7F7",
          }}
        />
        <div className="w-full">
          <TextArea
            classes={` py-0 pt-2`}
            customStyle={{
              background: "#F7F7F7",
            }}
            required
            label={"Category description"}
            labelStyle={{ fontWeight: 500, color: "#43424D" }}
            name="description"
            value={values}
            onblur={handleBlur}
            touched={touched}
            handleChange={handleChange}
            error={errors}
            placeholder="Type category description here"
          />
        </div>
        <div className="flex justify-center my-4 gap-x-8">
          <CustomButton
            buttonName={`Cancel`}
            customStyle={{
              background: "#BEBEBE",
              width: "6rem",
              height: "2.5rem",
              padding: "1rem",
              borderRadius: "10px",
            }}
            handleOnClick={(e: any) => {
              resetForm();
            }}
          />{" "}
          <CustomButton
            buttonName={`Save`}
            customStyle={{
              width: "6rem",
              height: "2.5rem",
              padding: "1rem",
              borderRadius: "10px",
            }}
            handleOnClick={(e: any) => {
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
}
