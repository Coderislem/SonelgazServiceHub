import React from "react";

function About() {
  return (
    <>
      <div className="space-y-4 mt-3">
        <details
          className="group [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
            <h2 className="font-medium">
              How to Apply for a Meter at Sonalgaz?
            </h2>
            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <p className="mt-4 px-4 leading-relaxed text-gray-700">
            To apply for a meter at Sonalgaz, you can do so through the
            company's dedicated application. You will be asked to upload some
            necessary documents such as personal identification, rental contract
            (if the house is rented), and fill out the required application
            form. After receiving the request, the company will process it and
            schedule an appointment to install the meter at the specified
            location. For more information, please contact customer service.
          </p>
        </details>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
            <h2 className="font-medium">
            How to Submit a Complaint?
            </h2>
            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <p className="mt-4 px-4 leading-relaxed text-gray-700">
          You can file a complaint in the Complaints and Requests Management application by following the following steps: 
1. Log in to the application. 
2. Choose the complaints or technical support section.
 3. Click on the “Submit a Complaint” or “New Request” button. 
4. Fill out the required form, and write the details of the complaint clearly. 
5. Attach any relevant documents or photos if required. 
6. Click on the “Submit” or “Submit” button to submit the complaint.
 7. After that, the complaint will be followed up and processed by the technical support team specialized in the application.
          </p>
        </details>
      </div>
    </>
  );
}

export default About;
