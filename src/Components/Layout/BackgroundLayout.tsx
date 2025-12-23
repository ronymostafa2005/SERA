"use client";

import backgroundImage from "../../assets/moon-light-shine-through-window-into-islamic-mosque-interior.jpg";
import Image from "next/image";

export default function BackgroundLayout() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        className="object-cover"
        style={{
          backgroundAttachment: "fixed",
        }}
        priority
      />
      {/* طبقة تظليل لضمان وضوح النص */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
    </div>
  );
}

