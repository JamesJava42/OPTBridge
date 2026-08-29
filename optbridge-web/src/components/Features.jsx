import Icon from './Icon.jsx';

const features = [
  {
    icon: 'compass',
    title: 'Intentional job discovery',
    text: 'Search around your role, level, location, skills, and work-authorization preferences—not just a keyword dump.',
  },
  {
    icon: 'filter',
    title: 'Sponsorship-aware screening',
    text: 'Flag employer and job-post language that may conflict with the preferences in your intake.',
  },
  {
    icon: 'document',
    title: 'Resume-to-role alignment',
    text: 'Shape relevant experience and keywords around priority roles while keeping every claim accurate.',
  },
  {
    icon: 'human',
    title: 'Human quality review',
    text: 'A person checks high-priority work for fit, clarity, and obvious errors before it reaches you.',
  },
  {
    icon: 'layers',
    title: 'One transparent tracker',
    text: 'See the role, source, resume version, status, and next step instead of wondering what happened.',
  },
  {
    icon: 'target',
    title: 'Weekly search feedback',
    text: 'Use response signals to refine titles, locations, keywords, and targeting during the sprint.',
  },
];

function Features() {
  return (
    <section className="section-space features-section" id="features">
      <div className="container">
        <div className="section-heading centered-heading">
          <p className="section-eyebrow">Your search operating system</p>
          <h2 className="section-title">More than application volume.</h2>
          <p>Every part of the workflow is built to improve relevance, visibility, and candidate control.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <span className="feature-icon"><Icon name={feature.icon} size={23} /></span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
