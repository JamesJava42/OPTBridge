const steps = [
  {
    number: '01',
    title: 'Join a monthly batch',
    text: 'Choose the batch month and submit your resume so support can start with clear context.',
  },
  {
    number: '02',
    title: 'Choose your plan',
    text: 'Pick AI Batch, Human Tailored Batch, or Hybrid Batch based on your application strategy.',
  },
  {
    number: '03',
    title: 'Track support through month-end',
    text: 'Receive email updates and follow applications in an Excel or Google Sheet tracker.',
  },
];

function HowItWorks() {
  return (
    <section className="section-space section-tint" id="how-it-works">
      <div className="container">
        <div className="row align-items-end mb-4 g-3">
          <div className="col-lg-7">
            <p className="section-eyebrow">How it works</p>
            <h2 className="section-title">A simple monthly rhythm from resume to updates.</h2>
          </div>
          <div className="col-lg-5">
            <p className="text-secondary mb-0">
              OPTBridge keeps the process focused on one batch at a time, making support easier to follow and easier to renew.
            </p>
          </div>
        </div>
        <div className="row g-4">
          {steps.map((step) => (
            <div className="col-md-4" key={step.number}>
              <div className="soft-card h-100">
                <span className="step-number">{step.number}</span>
                <h3 className="h5 mt-3">{step.title}</h3>
                <p className="text-secondary mb-0">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

