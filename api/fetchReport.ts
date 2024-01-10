import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you've imported your Firebase configuration properly
import { IReport } from '../Utils/type';

type ReportWithId = IReport & { id: string, viewed: boolean; };
export const useFetchReport = (): ReportWithId[] => {
  const [reports, setReports] = useState<ReportWithId[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const colRef = collection(db, 'emergency_report');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const fetchedReports: ReportWithId[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        reportType: doc.data().reportType,
        date: doc.data().date,
        location: doc.data().location,
        description: doc.data().description,
        viewed: false,
      }));

      const newUnreadCount = fetchedReports.length - reports.length;
      setUnreadCount(newUnreadCount > 0 ? newUnreadCount : 0);
      setReports(fetchedReports);
    });

    return () => {
      unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, [reports]); // Include 'reports' as a dependency to trigger the effect when 'reports' change

  return reports;
};
