import createReport from "docx-templates";
import ky from "ky";

export type Certificate = {
  firstName: string;
  contractorCompanyName: string;
  prolongedMedicalCheck: boolean;
  periodicalCheck: boolean;
  fitForAssignedTask: boolean;
  unfitForAssignedTask: boolean;
  surname: string;
  certNo: string;
  DOB: string;
  position: string;
  sigKey: string;
  currentDate: string;
  unFitToWork: boolean;
  location: string;
  fitWithRestrictions: string;
  forx: string;
  unfit: string;
};

export const sigMap = [
  {
    id: 1,
    label: "Dr Segun",
    value: "https://pub-23dd78d40b4341a1b0079194eaaf4552.r2.dev/dr_segun.png",
  },
  {
    id: 2,
    label: "Dr Aisha",
    value: "https://pub-23dd78d40b4341a1b0079194eaaf4552.r2.dev/dr_aisha.png",
  },
  {
    id: 3,
    label: "Dr Amina",
    value: "https://pub-23dd78d40b4341a1b0079194eaaf4552.r2.dev/dr_amina.png",
  },
  {
    id: 4,
    label: "Dr Jessica",
    value: "https://pub-23dd78d40b4341a1b0079194eaaf4552.r2.dev/dr_jessica.png",
  },
];

const getBufferFromRequest = async ({
  fileType = "png",
  url,
}: {
  fileType: string | undefined;
  url: string;
}) => {
  console.log(fileType, url);
  const request = await ky(url);
  if (!request.ok) {
    throw new Error("Request failed, cannot fetch file");
  }
  const buffer = await request.bytes();
  return buffer;
};

export const generateCertificate = async ({
  contractorCompanyName,
  periodicalCheck,
  prolongedMedicalCheck,
  unFitToWork,
  fitForAssignedTask,
  unfitForAssignedTask,
  firstName,
  surname,
  certNo,
  DOB,
  position,
  sigKey,
  fitWithRestrictions,
  location,
  currentDate,
  forx,
  unfit,
}: Certificate) => {
  const [template, stamp, signature] = await Promise.all([
    getBufferFromRequest({
      fileType: "docx",
      url: `https://pub-23dd78d40b4341a1b0079194eaaf4552.r2.dev/AMC_Certificate_template_for_Contractors_copy.docx`,
    }),
    getBufferFromRequest({
      fileType: "png",
      url: `https://pub-23dd78d40b4341a1b0079194eaaf4552.r2.dev/MRD%20STAMP.png`,
    }),
    getBufferFromRequest({
      fileType: "png",
      url: String(sigMap.find((sig) => sig.value === sigKey)?.value),
    }),
  ]);
  const buffer = await createReport({
    cmdDelimiter: ["{", "}"],
    template,
    data: {
      certNo,
      fitForAssignedTask,
      unfitForAssignedTask,
      fitWithRestrictions: fitWithRestrictions.toUpperCase(),
      contractorCompanyName: contractorCompanyName.toUpperCase(),
      prolongedMedicalCheck,
      periodicalCheck,
      firstName: firstName.toUpperCase(),
      currentDate,
      surname: surname.toUpperCase(),
      unFitToWork,
      DOB,
      position: position.toUpperCase(),
      location,
      forx: forx.toUpperCase(),
      unfit: unfit.toUpperCase(),
    },
    additionalJsContext: {
      stamp: () => {
        return {
          width: 4,
          height: 4,
          data: stamp,
          extension: ".png",
        };
      },
      sig: () => {
        return {
          width: 2,
          height: 2,
          data: signature,
          extension: ".png",
        };
      },
      checkbox: (val: boolean) => (val ? "☒" : "☐"),
    },
  });
  const decoder = Buffer.from(buffer);

  const base64String = decoder.toString("base64");
  return `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64String}`;
};
