import {Button} from "@/components/ui/button";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/ComponentsList";
import CTA from "@/components/CTA";
import {recentSessions} from "@/constants";


const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

        <section className="home-section">
            <CompanionCard
            id={"123"}
            name={"Neura The Brainy Explorer"}
            topic={"Neural Network of the Brain"}
            subject={"Science"}
            duration={45}
            color={"#E5D0FF"}
            />
            <CompanionCard
            id={"456"}
            name={"Countsy the Number Wizard"}
            topic={"Derivatives & Integrals"}
            subject={"Maths"}
            duration={30}
            color={"#FFDA6E"}
            />
            <CompanionCard
                id={"789"}
                name={"Verba the Vocabulary Builder"}
                topic={"English Literature"}
                subject={"Language"}
                duration={45}
                color={"#BDE7FF"}
            />
        </section>

        <section className="home-section">
            <CompanionsList
            title={"Recently completed sessions"}
            companions={recentSessions}
            classNames={"w-2/3 max-lg:w-full"}
            />
            <CTA />
        </section>
    </main>
  )
}

export default Page