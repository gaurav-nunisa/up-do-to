const SideBarExtra = () => {
  return (
    <div className="border-r-4 border-indigo-500 flex-Column text-black ">
      <div className="COUNTDOWN ">

        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ ["--value"]: 15 } as any}></span>
            </span>
            days
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": 10 }}></span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": 24 }}></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {/* <span style={{"--value":${counter}}}></span> */}
            </span>
            sec
          </div>
        </div>
      </div>
      <div className="GOALS text-black">
        <h1>GOALS</h1>
      </div>
      <div className="SUNDAY CARD text-black" ><h1>
        SUNDAY CARD</h1></div>
    </div>



    
  );
};

export default SideBarExtra;
