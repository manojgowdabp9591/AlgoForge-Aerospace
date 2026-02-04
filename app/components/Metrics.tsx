export default function Metrics() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
        <Metric title="Launch Cost Reduction" value="10x" />
        <Metric title="Payload Capacity" value="600 kg" />
        <Metric title="Target Launch Year" value="2030" />
      </div>
    </section>
  );
}

function Metric({ title, value }: any) {
  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
      <h3 className="text-4xl font-bold text-cyan-400">{value}</h3>
      <p className="text-white/70 mt-2">{title}</p>
    </div>
  );
}
