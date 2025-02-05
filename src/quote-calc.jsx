import { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import './quote-calc.css';

export function QuoteCalc() {
  const [services] = useState([
    { check: 'traditionalPhotographyCheck', value: 6000, label: 'Traditional Photography' },
    { check: 'traditionalVideographyCheck', value: 6000, label: 'Traditional Videography' },
    { check: 'candidPhotographyCheck', value: 10000, label: 'Candid Photography' },
    { check: 'cinematicVideographyCheck', value: 15000, label: 'Cinematic Videography' },
    { check: 'led1Check', value: 8000, label: 'LED 8x6' },
    { check: 'led2Check', value: 16000, label: 'LED 8x12' },
    { check: 'qrLivePhotoshareCheck', value: 5000, label: 'QR Live Photoshare' },
    { check: 'liveStreamingCheck', value: 5000, label: 'Live Streaming' },
    { check: 'photoBoothCheck', value: 5000, label: 'Photobooth' },
  ]);

  const [selectedServices, setSelectedServices] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = Object.values(selectedServices).reduce((acc, value) => acc + value, 0);
    setTotal(sum);
  }, [selectedServices]);

  function handleCheckboxChange(service, event) {
    const isChecked = event.target.checked;
    setSelectedServices(prevState => ({
      ...prevState,
      [service.check]: isChecked ? service.value : 0,
    }));
  }

  function resetForm() {
    setSelectedServices({});
    setTotal(0);
  }

  function generatePDF() {
    if (total === 0) {
      alert("Please select at least one service to generate a quotation.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Photography Quotation', 10, 10);
    doc.setFontSize(12);
    doc.text('----------------------', 10, 20);

    let y = 30;
    services.forEach(service => {
      if (selectedServices[service.check]) {
        doc.text(`${service.label}: ₹${service.value}`, 10, y);
        y += 10;
      }
    });

    doc.text(`Total Quotation: ₹${total}`, 10, y + 10);
    doc.text('----------------------', 10, y + 20);
    doc.text('Thank you for choosing RS Photography!', 10, y + 30);

    doc.save('quotation.pdf');
  }

  return (
    <div className="quote-calc container mt-3" style={{fontFamily: ['Playfair Display', 'serif']}}>
      <h1 className="fw-bold fs-2 m-2 mb-4 text-primary">RS Photography Quotation Calculator</h1>
      {services.map(service => (
        <div className="form-group" key={service.check}>
          <input
            type="checkbox"
            id={service.check}
            onChange={(event) => handleCheckboxChange(service, event)}
            checked={!!selectedServices[service.check]}
          />
          <label htmlFor={service.check}>{service.label}</label>
        </div>
      ))}
      <button onClick={resetForm} className='btn btn-primary m-2'>Reset</button>
      <button onClick={generatePDF} className='btn btn-primary m-2'>Generate PDF</button>
      <div className="result" id="result">
        {total > 0 && <p>Total Quotation: ₹{total.toFixed(2)}</p>}
      </div>
    </div>
  );
}
