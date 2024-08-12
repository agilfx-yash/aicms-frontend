import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export function SocialMediaButtons() {
  return (
    <div className="flex space-x-4 mb-6">
      <button className="w-12 h-12 rounded-full border">
        <FontAwesomeIcon icon={faFacebook} className="w-6 h-6 text-blue-600" />
      </button>
      <button className="w-12 h-12 rounded-full border">
        <FontAwesomeIcon icon={faGoogle} className="w-6 h-6 text-red-600" />
      </button>
      <button className="w-12 h-12 rounded-full border">
        <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 text-blue-800" />
      </button>
    </div>
  );
}
