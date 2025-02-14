"use client"

import storage from "@/lib/storage";

export default function Plan() {
  const setPlan = async () => {
    const input = document.getElementById('customPlan');
    if(input instanceof HTMLInputElement) {
      if(input.files === null) return;
      const raw = await input.files[0].text();
      await storage.setItem("currentPlan", raw);
      alert("Plan set");
    }
  };

  return (
    <div className="m-5">
      <input id="customPlan" type="file"></input>
      <button type="button" onClick={setPlan}>Set Plan</button>
    </div>
  )
}