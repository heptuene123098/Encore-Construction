import type { QAItem } from "@/data/team";

const QABubbles = ({ qa, name }: { qa: QAItem[]; name: string }) => {
  const firstName = name.split(" ")[0];
  return (
    <section className="section-padding">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Rapid Fire
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Q&A with <span className="text-gold-gradient">{firstName}</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {qa.map((item, i) => (
            <div key={i} className="space-y-2">
              {/* Question - left bubble */}
              <div className="flex justify-start">
                <div className="max-w-[85%] sm:max-w-[75%] bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                    You
                  </div>
                  <p className="text-sm leading-relaxed">{item.question}</p>
                </div>
              </div>
              {/* Answer - right bubble */}
              <div className="flex justify-end">
                <div className="max-w-[85%] sm:max-w-[75%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 shadow-md border border-gold/20">
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-gold mb-1">
                    {firstName}
                  </div>
                  <p className="text-sm leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QABubbles;
