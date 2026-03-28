import React from 'react';

interface RiskFlagProps {
  riskGroup: string;
  riskLevel: string;
  recommendedAction: string;
}

export const RiskFlag: React.FC<RiskFlagProps> = ({ riskGroup, riskLevel, recommendedAction }) => {
  const isHighRisk = riskGroup === 'E' || riskLevel.toLowerCase().includes('high');
  
  return (
    <div className={`p-4 rounded-md border-l-4 ${isHighRisk ? 'bg-red-50 border-red-500 text-red-900' : 'bg-green-50 border-green-500 text-green-900'} mt-6`}>
      <h3 className="text-lg font-bold flex items-center gap-2">
        {isHighRisk ? '⚠️ High Risk (Group E)' : `✅ ${riskLevel} (Group ${riskGroup})`}
      </h3>
      <p className="mt-3 text-sm font-semibold opacity-80 uppercase tracking-wide">Recommended Action:</p>
      <p className="mt-1 text-base">{recommendedAction}</p>
    </div>
  );
};
