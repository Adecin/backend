import { listPillarDetail } from "@/redux/reducer/regulation/listpillarDetail";
import { styled, Tab, Box, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectMenu from "./inputComponents/selectMenu";
import { listAllRegulation } from "@/redux/reducer/regulation/listAllRegulation";
import { listRegulationPillars } from "@/redux/reducer/regulation/listRegulationPillars";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledTab = styled((props: any) => <Tab {...props} />)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "27px",
  margin: "0 5rem",
  textTransform: "none",
  color: "#3D7FFA",
  "&.Mui-selected": {
    fontWeight: 700,
    color: "#F8B34C",
  },
}));

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other }: any = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function PillarDrtailComponent(props: any) {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const RegulationData = useSelector(
    (state: any) => state.ListAllRegulation.response
  );

  const RegulationPillars = useSelector(
    (state: any) => state.ListRegulationPillars.response
  );

  const [regulationId, setRegulationId] = useState("");

  const { farmerId, farmId, surveyId } = props;

  const PillarList = RegulationPillars[0]?.pillar;

  const [pillarId, setPillarId] = useState();

  const ListPillarData = useSelector(
    (state: any) => state.ListPillarDetail.response
  );
  const query = `?farmerId=${farmerId}&regulationId=${regulationId}&farmId=${farmId}`;

  const pillarDetalQuery = `?pillarId=${pillarId}&farmerId=${farmerId}&farmId=${farmId}`;

  const handleRegulationChange = (id: any) => {
    setRegulationId(id);
  };

  useEffect(() => {
    console.log(`PillarList`, PillarList);
    const defaultPillar = PillarList ? PillarList[0].id : "";
    console.log(`defaultPillar`, defaultPillar);
    setPillarId(defaultPillar);
    console.log(`pillarId`, pillarId);
  }, [regulationId, PillarList]);

  useEffect(() => {
    dispatch(listAllRegulation(`?surveyId=${surveyId}`));
    dispatch(listRegulationPillars(query));
    dispatch(listPillarDetail(pillarDetalQuery));
  }, [query, pillarDetalQuery, regulationId, pillarId]);

  return (
    <div className="py-4">
      <div className="">
        <span>{`Regulation`}</span>
        <SelectMenu
          fieldStyle={{
            marginTop: "0.5rem",
            width: "336px",
            color: "#3D7FFA",
            background: "#F7F7F7",
            boxShadow: "2px 2px 5px #0000003d",
          }}
          name={"regulationId"}
          data={RegulationData ?? []}
          handleChange={(e: any) => {
            handleRegulationChange(e.target.value);
          }}
          value={{ regulationId: regulationId }}
          placeHolderText={"Select Regulation"}
        />
      </div>
      <Tabs
        className=" "
        sx={{
          ".css-145v6pe-MuiButtonBase-root-MuiTabScrollButton-root": {
            color: "#fff",
            background: "#3D7FFA",
            fontSize: "28px",
            height: "30px",
            width: "30px",
            borderRadius: "100%",
            margin: "1rem",
          },
          ".MuiTabs-scrollButtons.Mui-disabled": {
            opacity: 0.3,
            color: "#fff",
            background: "#BEBEBE",
            fontSize: "28px",
            height: "30px",
            width: "30px",
            borderRadius: "100%",
          },
        }}
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {PillarList?.map((item: any) => {
          console.log(`dvmaevn`, item);
          return (
            <StyledTab
              onClick={(e: any) => {
                setPillarId(item.id);
                console.log(`selected pillar`, pillarId);
              }}
              key={``}
              label={item.name}
              className="mx-5 px-5"
            />
          );
        })}
      </Tabs>
      <div>
        <CustomTabPanel value={value} index={0}>
          {ListPillarData?.question?.map((questionItem: any, index: any) => {
            const FilteredAnswer = ListPillarData.answers.find(
              (item: any) => item.questionId == questionItem.id
            );

            return (
              <div
                key={index}
                className={`flex bg-[#F4F8FF] p-[18px] text-[16px] text-[#000] hover:bg-[#F75656]  hover:text-[#fff] my-6`}
              >
                <span className="pr-2">{`${index + 1} .`}</span>
                <div className="pr-2">{`${questionItem.question} : `}</div>
                <div className="pl-2">{FilteredAnswer?.answer ?? ""}</div>
              </div>
            );
          })}
        </CustomTabPanel>
      </div>
    </div>
  );
}
