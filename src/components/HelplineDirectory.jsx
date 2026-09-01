import { PhoneCall, ExternalLink } from 'lucide-react';

export default function HelplineDirectory() {
  const helplines = [
    {
      country: "India",
      number: "1930",
      description: "National Cyber Crime Reporting Helpline",
      link: "https://www.cybercrime.gov.in"
    },
    {
      country: "United States",
      number: "1-800-225-5324",
      description: "FBI Internet Crime Complaint Center (IC3)",
      link: "https://www.ic3.gov"
    },
    {
      country: "United Kingdom",
      number: "0300 123 2040",
      description: "Action Fraud - National Fraud & Cyber Crime Reporting",
      link: "https://www.actionfraud.police.uk"
    }
  ];

  return (
    <div className="helpline-card">
      <div className="helpline-header">
        <PhoneCall size={22} className="accent-icon" />
        <div>
          <h3>Emergency Cybercrime Authorities</h3>
          <p>If you have suffered financial loss or identity theft, report it immediately to official authorities:</p>
        </div>
      </div>

      <div className="helpline-grid">
        {helplines.map((item, index) => (
          <div key={index} className="helpline-item">
            <span className="helpline-country">{item.country}</span>
            <span className="helpline-number">{item.number}</span>
            <p className="helpline-desc">{item.description}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="helpline-link">
              Official Portal <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}