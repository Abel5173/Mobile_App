import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you've imported your Firebase configuration properly
import { IReport } from '../Utils/type';

type ReportWithId = IReport & { id: string, viewed: boolean; };
export const useFetchReport = (): ReportWithId[] => {
    const [reports, setReports] = useState<ReportWithId[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    useEffect(() => {
        const colRef = collection(db, 'emergency_report');

        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const fetchedReports: ReportWithId[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                const report: ReportWithId = {
                    id: doc.id,
                    reportType: data.reportType,
                    date: data.date,
                    location: data.location,
                    description: data.description,
                    viewed: false
                };
                fetchedReports.push(report);
            });
            const newUnreadCount = fetchedReports.length - reports.length;
            setUnreadCount(newUnreadCount > 0 ? newUnreadCount : 0);
            setReports(fetchedReports);
        });

        return () => {
            unsubscribe();
        };
    }, [reports]);
    // console.log(reports);
    return reports;
};