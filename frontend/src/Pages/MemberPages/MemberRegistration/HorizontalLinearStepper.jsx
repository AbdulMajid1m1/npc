import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import Material-UI icon

// Import step components
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

// Updated step labels
const steps = [
  "Company Information",
  "NPC Services",
  "Payments",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Stepper activeStep={activeStep} sx={{ marginBottom: "20px" }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished
          </Typography> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              mt: 4,
              mb: 4,
              p: 3,
              borderRadius: "12px",
              backgroundColor: "#f5f5f5",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CheckCircleIcon
              sx={{ color: "#4caf50", fontSize: 50, mb: 1 }} // Adjust icon size and color
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#333",
              }}
            >
              All steps completed - you're finished!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#666",
                mt: 1,
              }}
            >
              Thank you for completing the registration. You can now proceed with the next steps.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Render the step components */}
          {activeStep === 0 && <StepOne />}
          {activeStep === 1 && <StepTwo />}
          {activeStep === 2 && <StepThree />}

          {/* Buttons positioned alongside the form */}
          <Box sx={{ ml: 2, mr: 2, display: "flex", justifyContent: "space-between", marginTop: "20px", gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#8a8dbf",
                  color: "white",
                  borderRadius: "8px",
                  width: "250px",
                  height: "40px",
                }}
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              <Button
                variant="contained"
                style={{
                  backgroundColor: activeStep === steps.length - 1 ? "#FB5B01" : "#00b0ff",
                  color: "white",
                  borderRadius: "8px",
                  width: "250px",
                  height: "40px",
                }}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
             </Button>
            </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
