import React from "react";
import CardHeading from "./card/CardHeading";
import Card from "./card/Card";
import Contact from "@/assets/svg/feed/Contact";
import User from "./User";
import { suggestions } from "./Data/Data";

function People() {
  return (
      <Card className="md:max-w-full md:w-full xl:max-w-[266px]  ">
        <CardHeading title="People you might know" />
        <div className="w-full py-4 px-5 flex flex-col gap-4">
          {suggestions.slice(0, 5).map((person, index) => (
            <User
              key={index}
              avatar={person.avatar}
              name={person.name}
              title={person.title}
              online={person.online}
              action={
                <button className="bg-[#CFE6CC] border border-transparent rounded-sm py-2 px-2 hover:bg-transparent hover:border-[#0F8200] transition-colors duration-300">
                  <Contact />
                </button>
              }
            />
          ))}
        </div>
      </Card>
  );
}

export default People;
