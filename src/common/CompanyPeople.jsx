import React from "react";
import CardHeading from "./card/CardHeading";
import Card from "./card/Card";
import Contact from "@/assets/svg/feed/Contact";
import User from "./User";
import user1 from "@/assets/feed/user-1.png";
import user2 from "@/assets/feed/user-2.png";
import user3 from "@/assets/feed/user-3.png";
import user4 from "@/assets/feed/user-4.png";
import user5 from "@/assets/feed/user-5.png";

const suggestions = [
  {
    name: "Darlene Robertson",
    title: "Web Designer",
    avatar: user1,
    online: true,
    location: "Great Falls, Maryland",
    connectedOn: "10 March 2025",
    canMessage: true,
    isConnected: true,
  },
  {
    name: "Marvin McKinney",
    title: "Medical Assistant",
    avatar: user2,
    online: true,
    location: "Lansing, Illinois",
    connectedOn: "10 March 2025",
    canMessage: false,
    isConnected: false,
  },
  {
    name: "Jenny Wilson",
    title: "Dog Trainer",
    avatar: user3,
    online: true,
    location: "Coppell, Virginia",
    connectedOn: "10 March 2025",
    canMessage: true,
    isConnected: true,
  },
  {
    name: "Darrell Steward",
    title: "Nursing Assistant",
    avatar: user4,
    online: true,
    location: "Lafayette, California",
    connectedOn: "10 March 2025",
    canMessage: false,
    isConnected: false,
  },
  {
    name: "Dianne Russell",
    title: "Marketing Coordinator",
    avatar: user5,
    online: true,
    location: "Portland, Illinois",
    connectedOn: "10 March 2025",
    canMessage: false,
    isConnected: false,
  },
];
function CompanyPeople() {
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
                <button className="bg-secondary border border-transparent rounded-sm py-2 px-2 hover:bg-transparent hover:border-primary transition-colors duration-300">
                  <Contact />
                </button>
              }
            />
          ))}
        </div>
      </Card>
  );
}

export default CompanyPeople;
