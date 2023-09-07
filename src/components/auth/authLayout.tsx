export default function AuthScreenLayout(props: any) {
  const { children } = props;
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(./authBg.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="flex flex-col items-center">
        <div
          className="bg-[#EBEFF8] w-[130px] h-[130px] text-primary text-center rounded-[50%] flex items-center justify-center"
          style={{
            fontSize: "30px",
            fontWeight: "500",
            lineHeight: "35px",
            letterSpacing: "0.1em",
            boxShadow: "2px 2px 5px #0000003d",
          }}
        >
          {`DTE`}
        </div>
        <div className="flex flex-col m-auto my-[3rem] items-center">
          <svg
            width="535"
            height="10"
            viewBox="0 0 535 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="535" height="10" rx="5" fill="#426CFF" />
          </svg>
          {children}
        </div>
      </div>
    </div>
  );
}
