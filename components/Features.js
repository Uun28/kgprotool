'use client'
import { CheckCircle } from "lucide-react";

export default function Features() {
  const features = [
    "KG Unlock OS 11-14 All Security Patch [ADB]",
    "KG Unlock KG Broken, Error, Active, Prenormal",
    "Knox Remove",
    "KG Unlock With EDL Mode",
    "Change Serial Number EDL Mode",
    "IT Admin Remove 2 Hours Reset OS 15 All Brand",
    "Trassion MDM Remove",
    "OPPO Unlock Network / Sim Unlock",
    "OPPO MDM / OTA Remove",
    "Spreadtrum / Unisoc Unlock Network / Sim Unlock",
    "Spreadtrum / Unisoc Unlock Region",
    "NVDATA IMEI Editor",
    "NVRAM IMEI Editor",
    "GOOGLE Pixel CPID",
    "Patch VBMETA",
    "Patch Proinfo [Security Plugin Remove]",
    "Patch Proinfo [Payjoy Remove]",
    "OPPO Decrypt Token",
    "KG Unload EDL Mode",
    "MDM Can't Download Pit Fix EDL Mode",
    "Factory Reset EDL Mode",
    "Lost Mode Remove EDL Mode",
    "Erase EFS EDL Mode",
    "Backup EFS EDL Mode",
    "Qualcomm Partition Manager",
    "Free Auth Xiaomi Model QCOM",
    "Samsung Flash",
    "Samsung Factory Reset [Download mode]",
    "Samsung MTK FRP [Download mode]",
    "Samsung Fix Softbrick [Download mode]",
    "Enable ADB With Testmode & QR Mode (OS 11-15)",
    "Disable & Enable Factory Reset [ADB]",
    "Remove FRP",
  ];

  return (
    <section id="feature" className="relative py-20 px-4 md:px-20">
      <div className="text-center mb-14">
           <h2 className="text-3xl md:text-4xl text-gray-800 tracking-tight">
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
            Premium Features
          </span>{" "}
          for All Devices
        </h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-base">
          Unlock, patch, edit & manage with a powerful toolkit.  
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-500 text-sm font-normal">{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
