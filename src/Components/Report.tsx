import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

type ReportData = {
  user_id: number;
  total_income: number;
  total_expense: number;
  final_balance: number;
  suggestions: string;
};

export default function Report() {
  const { user_id } = useParams<{ user_id: string }>();
  const [userid, setUserID] = useState<string>();
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const fetchReportData = async () => {
    try {
      const response = await fetch(`/api/gettotals/sql/${userid}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching budget report:', error);
    }
  };

  const handleGenerateReport = () => {
    fetchReportData();
  };

  return (
    <div className='h-screen w-full bg-hero-pattern'>
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8  mb-4 py-10 mt-14 ">
        <h3 className="text-2xl font-semibold text-center mb-4 ">Budget Report</h3>
        <div className="mb-4">
          <p className="font-medium py-2">User ID:</p>
          <input
            type="number"
            className='py-2 px-16 border border-gray-500 pb-4 shadow-lg rounded-md'
            value={userid}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full mb-4"
          onClick={handleGenerateReport}
        >
          Generate Report
        </button>
        {reportData ? (
          <div>
            <div className="mb-4">
              <p className="font-medium">Total Income:</p>
              <p className="border-b border-gray-300 pb-2">{reportData.total_income}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Total Expenses:</p>
              <p className="border-b border-gray-300 pb-2">{reportData.total_expense}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Final Balance:</p>
              <p className="border-b border-gray-300 pb-2">{reportData.final_balance}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Suggestions:</p>
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-md mt-4">
                {reportData.suggestions}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Click "Generate Report" to generate the report.</p>
        )}
      </div>
    </div>
  );
}
