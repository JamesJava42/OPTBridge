import { useState } from 'react';
import { faqs } from '../data/faq.js';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-space section-tint" id="faq">
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <div className="col-lg-8">
            <p className="section-eyebrow">FAQ</p>
            <h2 className="section-title">Common questions before joining a batch.</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="accordion">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div className="accordion-item" key={faq.question}>
                    <h3 className="accordion-header">
                      <button
                        className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      >
                        {faq.question}
                      </button>
                    </h3>
                    <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
                      <div className="accordion-body text-secondary">{faq.answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;

