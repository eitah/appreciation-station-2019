import React, { useState, useEffect } from "react";
import { AppreciationStationConfig } from "../lib/data";
import ThankYouCard from "./ThankYouCard";
import WeDidIt from "../assets/images/WeDidIt.svg";

export default function AppreciationStation() {
  const [thankYous, setThankYous] = useState([]);
  const [
    currentVisibleThankYouIndex,
    setCurrentVisibleThankYouIndex
  ] = useState(0);

  useEffect(() => {
    function createThankYous(
      receivedImages,
      receivedMessages,
      receivedMembers
    ) {
      const mentorMessages = receivedMessages.filter(msg => msg.isMentor);
      const menteeMessages = receivedMessages.filter(msg => msg.isMentee);
      const speakerMessages = receivedMessages.filter(msg => msg.isSpeaker);

      return receivedMembers.map(member => {
        let messages;
        if (member.isMentor) messages = mentorMessages;
        if (member.isMentee) messages = menteeMessages;
        if (member.isSpeaker) messages = speakerMessages;

        return {
          member: member,
          backgroundImage: getRandom(receivedImages),
          message: getRandom(messages)
        };
      });
    }

    AppreciationStationConfig.getBackgroundImages().then(imagesResponse => {
      AppreciationStationConfig.getMemberMessages().then(messagesResponse => {
        AppreciationStationConfig.getMembers().then(membersResponse => {
          const localThankYous = createThankYous(
            imagesResponse,
            messagesResponse,
            membersResponse
          );
          shuffle(localThankYous, setThankYous);
        });
      });
    });
  }, []);

  // Fisher-Yates shuffle
  function shuffle(collection, collectionSetter) {
    let array = [...collection];
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    collectionSetter(array);
  }

  function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  return (
    <React.Fragment>
      <img className="BackgroundHeading" src={WeDidIt} alt="We Did It text" />
      <h2 className="h1 Section-heading">Appreciation Station</h2>
      <div className="">
        {thankYous && thankYous.length > 0 && (
          <ThankYouCard
            member={thankYous[currentVisibleThankYouIndex].member}
            message={thankYous[currentVisibleThankYouIndex].message}
            backgroundImage={
              thankYous[currentVisibleThankYouIndex].backgroundImage
            }
          />
        )}
        <div>
          <span
            onClick={() =>
              setCurrentVisibleThankYouIndex(currentVisibleThankYouIndex + 1)
            }
          >
            Next >
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}