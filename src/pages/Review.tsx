import DashboardWrapper from "@/components/dashboard/DashboardWrapper";

const Review = () => {

  // Dummy data for the form payload
  const payload = {
    title: "Customer Feedback Form",
    description: "Collect feedback from customers",
    steps: [
      {
        id: "step1",
        title: "Step 1: Basic Information",
        description: "Enter your basic details",
        fields: [
          {
            id: "field1",
            type: "text",
            label: "Name",
            placeholder: "Enter your name",
            required: true,
            options: [],
            answer: "",
          },
          {
            id: "field2",
            type: "select",
            label: "Feedback Type",
            placeholder: "",
            required: false,
            options: ["Positive", "Negative", "Neutral"],
            answer: "",
          },
        ],
      },
      {
        id: "step2",
        title: "Step 2: Additional Information",
        description: "Provide additional details",
        fields: [
          {
            id: "field3",
            type: "textarea",
            label: "Comments",
            placeholder: "Enter your comments",
            required: false,
            options: [],
            answer: "",
          },
        ],
      },
    ],
  };

  return (
    <DashboardWrapper>
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <div>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-primary">Review Form</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Form Title and Description */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary">{payload.title}</h2>
            <p className="text-muted-foreground mt-2">{payload.description}</p>
          </div>

          {/* Steps */}
          {payload.steps.map((step) => (
            <div key={step.id} className="bg-card p-6 rounded-lg shadow-md space-y-4">
              <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>

              {/* Fields */}
              <div className="space-y-4">
                {step.fields.map((field) => (
                  <div
                    key={field.id}
                    className="border p-4 rounded-md bg-muted/10 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-primary">{field.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {field.required ? "Required" : "Optional"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Type: {field.type}
                    </p>
                    {field.options.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-primary">Options:</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {field.options.map((option, index) => (
                            <li key={index}>{option}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Answer: {field.answer || "No answer provided"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </DashboardWrapper>
  );
};

export default Review;