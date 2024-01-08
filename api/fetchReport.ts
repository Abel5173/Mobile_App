import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you've imported your Firebase configuration properly
import { IReport } from '../Utils/type';

type ReportWithId = IReport & { id: string, viewed: boolean; };
export const useFetchReport = (): ReportWithId[] => {
    const [reports, setReports] = useState<ReportWithId[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const colRef = collection(db, 'emergency_report');
                const snapshot = await getDocs(colRef);

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
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();

    }, []);

    // console.log(reports);
    return reports;
};