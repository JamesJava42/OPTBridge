const addOns = [
  {
    name: 'Interview Prep',
    price: '+$49/month',
    text: 'Practice answers, role research, and confidence-building support before interviews.',
  },
  {
    name: 'Offer Negotiation',
    price: '$99 one-time',
    text: 'Review offer details and prepare a thoughtful negotiation message.',
  },
];

function AddOns() {
  return (
    <section className="section-space addons-section">
      <div className="container">
        <div className="row align-items-end mb-4 g-3">
          <div className="col-lg-7">
            <p className="section-eyebrow">Support beyond applications</p>
            <h2 className="section-title">Be ready when an opportunity responds.</h2>
          </div>
          <div className="col-lg-5">
            <p className="text-secondary mb-0">
              Add interview and negotiation support to strengthen the moments after applications get attention.
            </p>
          </div>
        </div>
        <div className="row g-4">
          {addOns.map((addOn) => (
            <div className="col-md-6" key={addOn.name}>
              <div className="soft-card h-100 d-flex flex-column flex-sm-row gap-3 justify-content-between">
                <div>
                  <h3 className="h5">{addOn.name}</h3>
                  <p className="text-secondary mb-0">{addOn.text}</p>
                </div>
                <strong className="addon-price">{addOn.price}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AddOns;
