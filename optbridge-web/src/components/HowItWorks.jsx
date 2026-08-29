const steps = [
  {
    number: '01',
    title: 'Complete your search profile',
    text: 'Share your status, target roles, locations, experience, and resume. We use it to check fit and scope.',
  },
  {
    number: '02',
    title: 'Review fit and activate',
    text: 'We recommend a scope and plan. After you approve and pay, your private member workspace opens.',
  },
  {
    number: '03',
    title: 'Run the weekly workflow',
    text: 'Review matched roles, tailored materials, and next actions in one shared tracker.',
  },
  {
    number: '04',
    title: 'Learn and refine',
    text: 'Use weekly response signals and a month-end review to sharpen the next search sprint.',
  },
];

function HowItWorks() {
  return (
    <section className="section-space how-section" id="how-it-works">
      <div className="container">
        <div className="row align-items-end section-heading g-3">
          <div className="col-lg-8">
            <p className="section-eyebrow">How it works</p>
            <h2 className="section-title">A focused sprint with clear checkpoints.</h2>
          </div>
          <div className="col-lg-4">
            <p className="text-secondary mb-0">
              You always know what we are doing, what needs your input, and what comes next.
            </p>
          </div>
        </div>
        <div className="process-grid">
          {steps.map((step) => (
            <article className="process-step" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
