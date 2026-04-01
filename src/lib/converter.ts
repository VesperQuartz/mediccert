import createReport from "docx-templates";
import ky from "ky";

export type Certificate = {
  firstName: string;
  contractorCompanyName: string;
  prolongedMedicalCheck: boolean;
  periodicalCheck: boolean;
  fitForAssignedTask: boolean;
  surname: string;
  certNo: string;
  DOB: string;
  position: string;
  sig: string;
  currentDate: string;
  unFitToWork: boolean;
  location: string;
  fitWithRestrictions: string;
  forx: string;
  unfit: string;
};

const getBufferFromRequest = async ({
  fileType = "png",
  url,
}: {
  fileType: string | undefined;
  url: string;
}) => {
  console.log(fileType, url);
  const request = await ky(url);
  const buffer = await request.bytes();
  return buffer;
};
// firstName: "",
//       surname: "",
//       contractorCompanyName: "",
//       periodicalCheck: false,
//       prolongedMedicalCheck: false,
//       fitForAssignedTask: false,
//       certNo: "",
//       DOB: "",
//       position: "",
//       sig: "",
//       location: "",
//       fitWithRestrictions: "",
//       forx: "",
//       unfit: "",
//       image: "",
export const generateCertificate = async ({
  contractorCompanyName,
  periodicalCheck,
  prolongedMedicalCheck,
  unFitToWork,
  fitForAssignedTask,
  firstName,
  surname,
  certNo,
  DOB,
  position,
  sig,
  fitWithRestrictions,
  location,
  currentDate,
  forx,
  unfit,
}: Certificate) => {
  const template = await getBufferFromRequest({
    fileType: "docx",
    url: `https://pub-23dd78d40b4341a1b0079194eaaf4552.r2.dev/AMC_Certificate_template_for_Contractors_copy.docx`,
  });

  const stamp = await getBufferFromRequest({
    fileType: "png",
    url: `https://pub-23dd78d40b4341a1b0079194eaaf4552.r2.dev/MRD%20STAMP.png`,
  });

  const buffer = await createReport({
    cmdDelimiter: ["{", "}"],
    template,
    data: {
      certNo,
      fitForAssignedTask,
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
      sig,
      location,
      forx: forx.toUpperCase(),
      unfit: unfit.toUpperCase(),
    },
    additionalJsContext: {
      stamp: () => {
        console.log();
        return {
          width: 4,
          height: 4,
          data: stamp,
          extension: ".png",
        };
      },
      checkbox: (val: boolean) => (val ? "☒" : "☐"),
    },
  });
  const decoder = Buffer.from(buffer);

  const base64String = decoder.toString("base64");
  console.log(
    `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64String}`,
  );
  return `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64String}`;
};
