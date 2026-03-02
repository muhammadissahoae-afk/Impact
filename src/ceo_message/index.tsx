import Footer from "@/components/layout/footer/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeader from "@/components/SectionHeader";

const CEOMessage = () => {
  return (
    <div data-nav-theme="dark">
      <div className="w-screen flex lg:flex-row flex-col lg:px-[10%] px-[5%] lg:gap-0 gap-[50px] items-start justify-around mb-[100px]">
        <div className="flex  flex-col items-center justify-center lg:w-[50%] w-full">
          <div className="flex flex-col items-left  justify-center gap-[40px] w-[95%] h-content">
            <SectionHeader
              richTitleDirection="right"
              richTitleProps={{
                excent: "Ahmad Mohammad",
                className: "text-[36px]! text-start ",
                isItalic: false,
              }}
              sectionTitleProps={{ variant: "gray" }}
              className="items-start w-full"
            >
              Message from the CEO
            </SectionHeader>
            <text
              style={{
                color: "rgba(2, 43, 82, 0.5)",
                width: "100%",
                maxHeight: "400px",
                overflowY: "auto",
                fontFamily: "Poppins",
                fontSize: 16,
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: "150%",
                letterSpacing: "-0.96px",
                paddingRight: "12px",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(2, 43, 82, 0.3) transparent",
              }}
            >
              At SAA, we are dedicated to nurturing a dynamic and inclusive
              learning environment where dedicated educators, alongside parents
              and stakeholders, collaborate to support and challenge our
              students. Our commitment lies in fostering each student's holistic
              development, guided by our vision to lead as an educational
              institution that optimizes academic excellence and innovation. We
              integrate cutting-edge technology and emphasize sustainability,
              aiming to shape future leaders who contribute meaningfully to
              society. Our mission is to excel in education through innovative
              practices, providing a safe, inclusive space that meets the
              diverse needs of every learner. We prioritize student well-being,
              fostering moral, intellectual, social, emotional, and physical
              growth. Our goal is to cultivate confident, independent
              individuals who embody creativity and innovation while upholding
              values of integrity, tolerance, respect, and openness to diverse
              perspectives.
            </text>
            <PrimaryButton>View Our Team</PrimaryButton>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center lg:w-[50%] w-full">
          <div
            className="lg:w-[82%] w-full h-[715px]"
            style={{
              borderRadius: "40px",
              backgroundImage: "url(/images/CEO/CEO_rec.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CEOMessage;
