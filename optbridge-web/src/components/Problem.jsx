const challenges = [
  {
    title: 'Application volume is hard to manage',
    text: 'Students often need consistent outreach while balancing classes, projects, and interviews.',
  },
  {
    title: 'Resumes need role-specific care',
    text: 'A stronger resume version can make each application clearer, sharper, and easier to review.',
  },
  {
    title: 'Progress gets scattered',
    text: 'OPTBridge keeps updates and tracking organized so every monthly batch has visible momentum.',
  },
];

function Problem() {
  return (
    <section className="section-space bg-white">
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <div className="col-lg-8">
            <p className="section-eyebrow">The problem</p>
            <h2 className="section-title">OPT job searching needs structure, speed, and focus.</h2>
          </div>
        </div>
        <div className="row g-4">
          {challenges.map((challenge) => (
            <div className="col-md-4" key={challenge.title}>
              <div className="soft-card h-100">
                <h3 className="h5">{challenge.title}</h3>
                <p className="text-secondary mb-0">{challenge.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Problem;

