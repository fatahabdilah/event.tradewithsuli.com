const items = [
  { value: "10K+", label: "TRADER DI KOMUNITAS" },
  { value: "+1.552%", label: "CALL $HYPE" },
  { value: "+15.000%", label: "CALL $TRUMP" },
  { value: "+1.018%", label: "CALL $ASTER" },
  { value: "300+", label: "MODUL EDUKASI" },
];

function TickerGroup({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-[40px] pr-[40px]" aria-hidden={hidden}>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-[40px]">
          <div className="flex items-center justify-center p-[20px]">
            <p className="whitespace-nowrap font-mono text-[12px] leading-normal tracking-[0.72px] text-white/50">
              <span className="font-medium text-[#4ade80]">{item.value}</span>
              {` ${item.label}`}
            </p>
          </div>
          <div className="h-[16px] w-px bg-white" />
        </div>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="relative h-[56px] w-full overflow-clip border border-white/10 bg-black">
      <div className="absolute top-[-1px] left-0 flex w-max animate-marquee motion-reduce:animate-none">
        <TickerGroup />
        <TickerGroup hidden />
      </div>
      <div className="absolute top-1/2 left-[-1px] h-[56px] w-[100px] -translate-y-1/2 bg-gradient-to-r from-black to-black/0" />
      <div className="absolute top-1/2 right-[-1px] h-[56px] w-[100px] -translate-y-1/2 bg-gradient-to-l from-black to-black/0" />
    </div>
  );
}
