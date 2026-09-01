import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What should I do immediately if I suspect I've been scammed?",
      answer: "Disconnect your device from the internet, contact your bank or credit card issuer immediately to freeze your accounts, and change passwords for critical accounts (like email and banking) from a different, secure device."
    },
    {
      question: "How can I tell if a website is a fake or phishing site?",
      answer: "Check the URL carefully for subtle misspellings (e.g., 'paypa1.com' instead of 'paypal.com'). Look for 'https://' and a padlock icon, though these can be faked. Avoid clicking links in unsolicited emails; instead, type the known URL directly into your browser."
    },
    {
      question: "Can money lost to a crypto scam be recovered?",
      answer: "Cryptocurrency transactions are generally irreversible and highly anonymous, making recovery very difficult. However, you should still report it to authorities and exchanges, as they occasionally freeze assets if the scammer's wallet is identified."
    },
    {
      question: "What is Multi-Factor Authentication (MFA) and why do I need it?",
      answer: "MFA requires you to provide two or more verification factors to gain access to an account (e.g., a password and a code sent to your phone). It significantly reduces the risk of account compromise, even if your password is stolen."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-header">
        <HelpCircle size={22} className="accent-icon" />
        <h3>Frequently Asked Questions</h3>
      </div>
      
      <div className="accordion-container">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`accordion-item ${openIndex === index ? 'active' : ''}`}
          >
            <div 
              className="accordion-title" 
              onClick={() => toggleAccordion(index)}
            >
              <h4>{faq.question}</h4>
              {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {openIndex === index && (
              <div className="accordion-content">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}