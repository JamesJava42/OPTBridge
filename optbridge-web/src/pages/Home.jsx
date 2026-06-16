import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Problem from '../components/Problem.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import BatchModel from '../components/BatchModel.jsx';
import Plans from '../components/Plans.jsx';
import AddOns from '../components/AddOns.jsx';
import FAQ from '../components/FAQ.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <BatchModel />
        <Plans />
        <AddOns />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default Home;

