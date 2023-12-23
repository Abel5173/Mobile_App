import React, { createContext, useState } from "react";
import { IReport, ReportContextType } from "../../Utils/type";

export const ReportContext = createContext<ReportContextType | null>(null);

const ReportContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [report, setReport] = useState<IReport>({
    reportType: "",
    date: "",
    location: {
      latitude: 8.21391,
      longitude: 37.80249,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    description: "",
  });

  return (
    <ReportContext.Provider value={{ report, setReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export default ReportContextProvider;
