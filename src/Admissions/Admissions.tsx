"use client";

import React, { useState } from "react";
import styles from "./Admissions.module.css";
import Footer from "@/components/layout/footer/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import { ArrowRight } from "lucide-react";

// --- Types ---
interface TabItem {
  iconInActive: string;
  iconActive: string;
  label: string;
  content: React.ReactNode;
}

// --- Sub-Components ---

const ProcessStep = ({
  title,
  items,
  icon = <ArrowRight size={20} />,
}: {
  title: string;
  items: string[];
  icon?: React.ReactNode;
}) => {
  return (
    <div className="font-sans">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-4 text-i-primary">
        <span className="text-[16px] opacity-[0.7]">{icon}</span>
        <h2 className="text-[16px] font-bold tracking-tight opacity-[0.7]">
          {title}
        </h2>
      </div>

      {/* List Section - Only renders if there are items */}
      {items.length > 0 && (
        <ul className="space-y-3 list-disc list-inside">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-i-primary text-[14px] leading-relaxed pl-2"
            >
              <span className="opacity-[0.7]">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-[28px] font-semibold text-i-primary">{children}</p>;
};

const Description = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-[14px] text-i-primary font-light opacity-[0.7]">
      {children}
    </p>
  );
};

const Question = (props: { question: string; answer: string }) => {
  return (
    <>
      <p className="text-[16px] font-semibold text-i-primary opacity-[0.7]">
        {props.question}
      </p>
      <p className="text-[14px] text-i-primary opacity-[0.7]">{props.answer}</p>
    </>
  );
};

const AdmissionDetails = () => {
  return (
    <div className="flex flex-col gap-5">
      <Title>Admission Details</Title>
      <Description>
        The foundation’s scholarship is based on merit, with no single “type” of
        candidate. Its strength lies in rigorous selection standards and the
        diversity of those who are chosen.
      </Description>
      <Question
        question="What Makes a Scholar?"
        answer="The criteria that guided the very first scholars continue to shape our process today:"
      />
      <ProcessStep
        title="Initial Contact"
        items={[
          "Contact the school via telephone, in person, or by email.",
          "Schedule an appointment to meet the Registrar and tour the school.",
        ]}
      />
      <ProcessStep
        title="Application Submission"
        items={[
          "Complete and submit the online registration form.",
          "Provide the latest school report for students in Grade 9 and below.",
          "Submit transcripts from the previous school for Grades 10, 11, and 12 students.",
          "Include any special education needs, IEPs, Educational Psychologist/medical reports, or other relevant information.",
        ]}
      />
      <ProcessStep
        title="Placement Test and Interview"
        items={[
          "All prospective students undergo an intake/placement assessment and interview.",
          "Results, along with an interview with parents and students, inform placement and support recommendations.",
          "In some cases, the school may seek external support services to help students reach their full potential.",
        ]}
      />
      <ProcessStep
        title="Confirmation"
        items={[
          "Admission is confirmed by the principal, subject to a successful placement assessment and interview.",
          "Admissions are based on space availability and regulatory compliance.",
        ]}
      />
    </div>
  );
};

const ApplicationProcess = () => {
  return (
    <div className="flex flex-col gap-5">
      <Title>Application Process</Title>
      <Description>
        At Impact American School, our admissions process is designed to be
        clear, supportive, and student-centered. We are committed to guiding
        families through each step with transparency and care, ensuring a smooth
        transition into our inclusive and innovative learning community.
      </Description>
      <Description>
        From initial inquiry to final enrollment, our team works closely with
        parents to understand each child’s academic background, strengths, and
        individual needs, ensuring the best possible start to their journey with
        us.
      </Description>
      <ProcessStep
        title="Contact the school to schedule an appointment with the Registrar and tour the school."
        items={[]}
      />
      <ProcessStep
        title="Submit a completed online registration form along with the required documentation."
        items={[]}
      />
      <ProcessStep
        title="Undergo intake assessment and interview processes."
        items={[
          "Upon enrollment, the registrar schedules an intake assessment and interview.",
          "For students with prior indications of determination, the Leader of Provision of SOD (LP-SOD) and SENDCo review documentation and collaborate on placement recommendations.",
          "This promotes early intervention and fosters a caring relationship between the Student Support Services department, parents, and the student.",
        ]}
      />
      <ProcessStep
        title="Pay Term 1 school fees within ten working days to confirm enrollment."
        items={[]}
      />
      <ProcessStep
        title="Ensure overseas study certificates and report cards are attested by the UAE Embassy and Ministry of Education from the country of origin."
        items={[]}
      />
      <Description>
        At IAS, we believe that inclusive education is both an educational goal
        and a methodology. We seek to identify and dismantle barriers to
        education for all students, enabling them to access the curriculum and
        achieve optimal academic and social outcomes.
      </Description>
      <Description>
        Thank you for considering Impact American School for your child’s
        education. We look forward to welcoming you to our inclusive and
        innovative learning community.
      </Description>
    </div>
  );
};

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-[18px] text-i-primary font-medium">{children}</p>;
};
interface TableColumn<T> {
  header: string;
  accessor: keyof T; // Ensures the accessor matches a key in your data object
}

interface DataTableProps<T> {
  title?: string;
  columns: TableColumn<T>[];
  data: T[];
}

function DataTable<T>({ title, columns, data }: DataTableProps<T>) {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Optional Title */}
      {title && (
        <p className="text-[28px] font-semibold text-i-primary mb-2">{title}</p>
      )}
      {/* Responsive Wrapper */}
      <div className="overflow-x-auto w-full border border-i-bg-i-primary rounded-sm">
        <table className="w-full text-left border-collapse min-w-[600px]">
          {/* Table Header */}
          <thead className="bg-i-primary text-i-bg-2/80">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`py-4 px-6 font-medium text-[15px] ${
                    index < columns.length - 1
                      ? "border-r border-i-bg-i-primary"
                      : ""
                  }`}
                  style={{ width: `${100 / columns.length}%` }} // Distributes width evenly
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-i-bg-i-primary bg-white">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-i-bg-i-primary last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-3 px-6 text-[15px] ${
                      colIndex < columns.length - 1
                        ? "border-r border-i-bg-i-primary"
                        : ""
                    }`}
                  >
                    {/* Render the value based on the column accessor */}
                    {row[col.accessor] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Define the shape of your data ---
interface TuitionRow {
  grade: string;
  fees: string;
  uniform: string;
  books: string;
}

// --- Map headers to data keys ---
const tuitionColumns: TableColumn<TuitionRow>[] = [
  { header: "Grades", accessor: "grade" },
  { header: "School Fees", accessor: "fees" },
  { header: "School Uniform Fees", accessor: "uniform" },
  { header: "Books & Resources", accessor: "books" },
];

// --- The Data ---
const tuitionData: TuitionRow[] = [
  { grade: "PreK", fees: "25,000", uniform: "850", books: "500" },
  { grade: "K1", fees: "25,500", uniform: "850", books: "1,200" },
  { grade: "K2", fees: "26,000", uniform: "850", books: "1,200" },
  { grade: "Grade 1", fees: "27,500", uniform: "1,050", books: "1,800" },
  { grade: "Grade 2", fees: "28,000", uniform: "1,050", books: "1,800" },
  { grade: "Grade 3", fees: "32,000", uniform: "1,050", books: "2,000" },
  { grade: "Grade 4", fees: "34,000", uniform: "1,050", books: "2,000" },
  { grade: "Grade 5", fees: "35,000", uniform: "1,050", books: "2,000" },
  { grade: "Grade 6", fees: "36,000", uniform: "1,050", books: "2,500" },
  { grade: "Grade 7", fees: "38,000", uniform: "1,200", books: "2,500" },
  { grade: "Grade 8", fees: "39,000", uniform: "1,200", books: "2,500" },
  { grade: "Grade 9", fees: "41,000", uniform: "1,200", books: "2,800" },
  { grade: "Grade 10", fees: "43,000", uniform: "1,200", books: "2,800" },
  { grade: "Grade 11", fees: "47,000", uniform: "1,300", books: "2,800" },
  { grade: "Grade 12", fees: "52,000", uniform: "1,300", books: "2,800" },
];
const Fees = () => {
  return (
    <div className="flex flex-col gap-5">
      <Title>Tuitions & Fees</Title>
      <Description>
        Discount Fees, where applicable, are offered strictly at the school’s
        discretion and are subject to approval. Such discounts are not
        guaranteed, may vary from year to year, and can be reviewed or withdrawn
        in accordance with school policies and circumstances.
      </Description>
      <Heading>2024-2025 Tuition & Facility Fees</Heading>
      <DataTable
        title="Tuition & Fees"
        columns={tuitionColumns}
        data={tuitionData}
      />
    </div>
  );
};
// --- Data ---
const data: TabItem[] = [
  {
    iconInActive: "/icons/Admissions/AdmissionPolicies.svg",
    iconActive: "/icons/Admissions/PoliciesActive.svg",
    label: "Admission Policies",
    content: <AdmissionDetails />,
  },
  {
    iconInActive: "/icons/Admissions/ApplicationProcess.svg",
    iconActive: "/icons/Admissions/ProcessActive.svg",
    label: "Application Process",
    content: <ApplicationProcess />,
  },
  {
    iconInActive: "/icons/Admissions/people.svg",
    iconActive: "/icons/Admissions/peopleActive.svg",
    label: "New Family Portal",
    content: (
      <Description>Content for New Family Portal coming soon.</Description>
    ),
  },
  {
    iconInActive: "/icons/Admissions/FrequentlyAskedQuestions.svg",
    iconActive: "/icons/Admissions/FrequentlyAskedQuestionsActive.svg",
    label: "Frequently Asked Questions",
    content: <Description>Content for FAQs coming soon.</Description>,
  },
  {
    iconInActive: "/icons/Admissions/Tuition&Fees.svg",
    iconActive: "/icons/Admissions/Tuition&FeesActive.svg",
    label: "Tuition & Fees",
    content: <Fees />,
  },
  {
    iconInActive: "/icons/Admissions/VirtualTours.svg",
    iconActive: "/icons/Admissions/ToursActive.svg",
    label: "Virtual Tours",
    content: <Description>Content for Virtual Tours coming soon.</Description>,
  },
];

// --- Main Export ---
export default function Admissions() {
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <div>
      <div className={`${styles.body}`}>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start lg:justify-around w-[90vw] lg:h-[90vh] gap-[10px]">
          {/* Sidebar */}
          <div className="flex flex-col justify-between  h-full w-[95%] lg:w-[25%]">
            <div className="flex flex-row lg:flex-col items-start justify-center w-full">
              <p className="text-light-blue mb-[20px] hidden lg:block">
                {data[activeButton].label}
              </p>
              {data.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  className={`flex items-center gap-3 p-3 rounded-[25px] w-fit text-left transition-all ${
                    activeButton === index
                      ? "btn btn-blue text-light lg:my-[10px]"
                      : `${styles.btnInactive} text-light-blue`
                  }`}
                >
                  <img
                    src={
                      activeButton === index
                        ? item.iconActive
                        : item.iconInActive
                    }
                    alt={item.label}
                    className="w-10 h-10 lg:w-6 lg:h-6"
                  />
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              ))}
            </div>

            <div className={`${styles.box} ${styles.hiddenForMobile}`}>
              <p>Begin Your Journey with SAA</p>
              <PrimaryButton bg="white">Register Now</PrimaryButton>
            </div>
          </div>

          {/* Content Area */}
          <div
            className={`${styles.content} px-[43px] h-[90vh]   overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500   py-[38px] w-full lg:w-[75%] bg-white`}
          >
            {data[activeButton].content}
          </div>

          <div className={`${styles.box} ${styles.hiddenForDesktop}`}>
            <p>Begin Your Journey with SAA</p>
            <PrimaryButton bg="white">Register Now</PrimaryButton>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
