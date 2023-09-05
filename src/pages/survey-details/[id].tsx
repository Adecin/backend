import PillarDrtailComponent from "@/components/pillarsView";
import BreadCrumb from "@/components/table/bread-crumb";
import { listTechnicianSurveyDetails } from "@/redux/reducer/survey/technicianSurveyDetails";
import { dispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { listFarm } from "@/redux/reducer/farmer/list-farm";
import SelectMenu from "@/components/inputComponents/selectMenu";
import { oneFieldOfficer } from "@/redux/reducer/fieldOfficer/getOne";

export default function SurveyDetails() {
  const router = useRouter();
  const urlPparams = router.query;
  const fieldOfficer_id = urlPparams.techId;
  const farmer_id = urlPparams.id;
  const surveyId = urlPparams.surveyId;

  const SurveyDetails = useSelector(
    (state: any) => state.TechSurveyDetails.response.farmerList
  );

  console.log(`SurveyDetails in`, SurveyDetails);
  const [farmId, setFarmId] = useState();
  const surveyQuery = `?technicianId=${fieldOfficer_id}&surveyId=${surveyId}`;
  const filteredFarmer = SurveyDetails?.find((item: any) => {
    console.log(`fillkh`, item.farmerId.id);
    console.log(`fillsafbaekh`, farmer_id);
    return item.farmerId.id == farmer_id;
  });

  console.log(`SurveyDetails jgf`, SurveyDetails);

  const farmData = useSelector((state: any) => state.listFarm.response.data);

  const getOneField = useSelector((store: any) => store.OneFieldOfficerData);
  const getOneFieldData = getOneField.response;

  console.log(`farmData`, farmData);
  console.log(`field officer`, getOneFieldData);

  const farmDropdown = farmData?.map((e: any, index: number) => {
    return { id: e.id, name: e.farmId };
  });
  const farmerData = filteredFarmer?.farmerId;

  console.log(`filteredFarmer in`, filteredFarmer);

  useEffect(() => {
    dispatch(listTechnicianSurveyDetails(surveyQuery));
    dispatch(oneFieldOfficer(fieldOfficer_id));
    dispatch(listFarm(farmer_id));
  }, [surveyQuery]);

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
        <div className="flex gap-x-3 items-center">
          <p
            style={{
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: "42px",
              letterSpacing: "0.05em",
              textAlign: "left",
              color: "#43424D",
            }}
          >{`Field Id`}</p>
          <SelectMenu
            fieldStyle={{
              width: "220px",
              color: "#000",
              background: "#F7F7F7",
              boxShadow: "2px 2px 5px #0000003d",
            }}
            classes={`pt-[1rem]`}
            name="farmId"
            placeHolderText="Select Farm"
            data={farmDropdown ?? []}
            value={farmId}
            handleChange={(e: any) => {
              setFarmId(e.target.value);
            }}
          />
        </div>
        <KeyValuePair label={`Crop type`} value={``} />
        <KeyValuePair label={`Field officer`} value={getOneFieldData?.name} />
        <KeyValuePair label={`Date of activity`} value={``} />
        <KeyValuePair label={`TBGR ID`} value={farmerData?.TBGRId} />
      </div>
      <div className="questionaireContainer">
        <PillarDrtailComponent
          surveyId={surveyId}
          farmId={farmId}
          farmerId={farmer_id}
        />
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
