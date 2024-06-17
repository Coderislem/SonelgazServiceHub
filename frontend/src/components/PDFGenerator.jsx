import React from "react";
import jsPDF from "jspdf";

const PDFGenerator = ({ formData, selectedFiles }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Service: " + formData.service, 20, 20);
    doc.text("Name Approve: " + formData.nameApprove, 20, 30);
    doc.text("Nature: " + formData.nature, 20, 40);
    doc.text("Phone: " + formData.phone, 20, 50);
    doc.text("Address: " + formData.address, 20, 60);
    doc.text("Statistical Identification Number: " + formData.statNumber, 20, 70);

    selectedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        doc.addFileToVFS(`file${index}.pdf`, e.target.result);
        doc.addPage();
        doc.text(`File ${index}:`, 20, 20);
        doc.addImage(`file${index}.pdf`, 20, 30, 180, 150);
      };
      reader.readAsDataURL(file);
    });

    doc.save("form_data.pdf");
  };

  return (
    <button onClick={generatePDF} className="px-4 py-2 bg-green-500 text-white border-none rounded-md cursor-pointer">
      Generate PDF
    </button>
  );
};

export default PDFGenerator;