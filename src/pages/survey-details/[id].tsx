import AJGKg from "@/components/pillarsView";
import BreadCrumb from "@/components/table/bread-crumb";
import { listRegulationPillars } from "@/redux/reducer/regulation/listRegulationPillars";
import { listTechnicianSurveyDetails } from "@/redux/reducer/survey/technicianSurveyDetails";
import { dispatch } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import listAllRegulation from "@/redux/reducer/regulation/listAllRegulation";

export default function SurveyDetails() {
  const router = useRouter();
  const urlPparams = router.query;
  const fieldOfficer_id = urlPparams.techId;
  const farmer_id = urlPparams.id;

  const [surveyId, setSurveyId] = useState("");
  const [regulationId, setRegulationId] = useState("");

  const RegulationPillars = useSelector(
    (state: any) => state.ListRegulationPillars.response
  );
  const SurveyDetails = useSelector(
    (state: any) => state.TechSurveyDetails.response.farmerList
  );

  console.log(`SurveyDetails in`, SurveyDetails);

  const surveyQuery = `?technicianId=${fieldOfficer_id}&surveyId=${surveyId}`;
  const filteredFarmer = SurveyDetails?.find((item: any) => {
    console.log(`fillkh`, item.farmerId.id);
    console.log(`fillsafbaekh`, farmer_id);

    return item.farmerId.id == farmer_id;
  });

  const farmerData = filteredFarmer?.farmerId;

  const farmId = ``;
  console.log(`filteredFarmer in`, filteredFarmer);
  const query = `?farmerId=${farmer_id}&regulationId=${regulationId}&farmId=${1}`;

  useEffect(() => {
    dispatch(listRegulationPillars(query));
    dispatch(listTechnicianSurveyDetails(surveyQuery));
  }, [query, surveyQuery]);

  return (
    <div className="p-[2rem] mx-[2rem]">
      <BreadCrumb />
      <div
        className="grid grid-cols-3 py-[3rem]"
        style={{
          borderBottom: "1px solid #E2E2E2",
        }}
      >
        <KeyValuePair label={`Farmer ID`} value={farmerData?.farmerId} />
        <KeyValuePair label={`Field ID`} value={`xxjbkjg`} />
        <KeyValuePair label={`Crop type`} value={`FC-KLS`} />
        <KeyValuePair label={`Field officer`} value={`Suresh`} />
        <KeyValuePair label={`Date of activity`} value={`24/08/1989`} />
        <KeyValuePair label={`TBGR ID`} value={farmerData?.TBGRId} />
      </div>
      <div className="questionaireContainer">
        <AJGKg farmerId={farmer_id} />
      </div>
    </div>
  );
}

const KeyValuePair = (props: any) => {
  const { label, value } = props;
  return (
    <div className="flex gap-x-6 items-center">
      <span
        style={{
          fontSize: "16px",
          fontWeight: 300,
          lineHeight: "42px",
          letterSpacing: "0.05em",
          textAlign: "left",
          color: "#43424D",
        }}
      >
        {label}
      </span>
      <span className="px-3">{`-`}</span>
      <span
        style={{
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "42px",
          letterSpacing: "0.05em",
          textAlign: "left",
          color: "#000",
        }}
      >
        {value}
      </span>
    </div>
  );
};