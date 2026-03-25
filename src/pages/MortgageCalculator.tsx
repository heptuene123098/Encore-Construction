import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";

const MortgageCalculator = () => {
  const [price, setPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(25);

  const result = useMemo(() => {
    const principal = price * (1 - downPayment / 100);
    const monthlyRate = rate / 100 / 12;
    const n = term * 12;
    if (monthlyRate === 0) return { monthly: principal / n, total: principal, interest: 0, principal };
    const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const total = monthly * n;
    return { monthly, total, interest: total - principal, principal };
  }, [price, downPayment, rate, term]);

  const fmt = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-wide mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Financial Tools</span>
            <h1 className="font-display text-4xl font-bold text-foreground mt-2">
              Mortgage <span className="text-gold-gradient">Calculator</span>
            </h1>
            <p className="text-muted-foreground mt-2">Estimate your monthly mortgage payments</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gold" /> Property Price
                  </label>
                  <span className="text-lg font-display font-bold text-foreground">{fmt(price)}</span>
                </div>
                <Slider value={[price]} onValueChange={([v]) => setPrice(v)} min={100000} max={5000000} step={10000} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$100K</span><span>$5M</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Percent className="w-4 h-4 text-gold" /> Down Payment
                  </label>
                  <span className="text-lg font-display font-bold text-foreground">{downPayment}% ({fmt(price * downPayment / 100)})</span>
                </div>
                <Slider value={[downPayment]} onValueChange={([v]) => setDownPayment(v)} min={5} max={80} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5%</span><span>80%</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Percent className="w-4 h-4 text-gold" /> Interest Rate
                  </label>
                  <span className="text-lg font-display font-bold text-foreground">{rate}%</span>
                </div>
                <Slider value={[rate]} onValueChange={([v]) => setRate(v)} min={1} max={15} step={0.1} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1%</span><span>15%</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold" /> Loan Term
                  </label>
                  <span className="text-lg font-display font-bold text-foreground">{term} years</span>
                </div>
                <Slider value={[term]} onValueChange={([v]) => setTerm(v)} min={5} max={30} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5 yrs</span><span>30 yrs</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border border-border p-6 text-center">
                <Calculator className="w-10 h-10 text-gold mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                <p className="font-display text-4xl font-bold text-foreground">{fmt(result.monthly)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-lg border border-border p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
                  <p className="font-display text-xl font-bold text-foreground">{fmt(result.principal)}</p>
                </div>
                <div className="bg-card rounded-lg border border-border p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Down Payment</p>
                  <p className="font-display text-xl font-bold text-gold">{fmt(price * downPayment / 100)}</p>
                </div>
                <div className="bg-card rounded-lg border border-border p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                  <p className="font-display text-xl font-bold text-foreground">{fmt(result.interest)}</p>
                </div>
                <div className="bg-card rounded-lg border border-border p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Cost</p>
                  <p className="font-display text-xl font-bold text-foreground">{fmt(result.total)}</p>
                </div>
              </div>

              {/* Visual breakdown bar */}
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm font-medium text-foreground mb-3">Payment Breakdown</p>
                <div className="h-4 rounded-full overflow-hidden flex">
                  <div className="bg-gold h-full" style={{ width: `${(result.principal / result.total) * 100}%` }} />
                  <div className="bg-navy h-full" style={{ width: `${(result.interest / result.total) * 100}%` }} />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gold inline-block" /> Principal ({((result.principal / result.total) * 100).toFixed(0)}%)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-navy inline-block" /> Interest ({((result.interest / result.total) * 100).toFixed(0)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MortgageCalculator;
