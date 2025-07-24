import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Star, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'email' | 'phone' | 'date' | 'rating';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

// Mock data - in real app this would come from API
const mockForm = {
  id: "1",
  title: "Customer Feedback Survey",
  description: "Help us improve our services by sharing your feedback",
  steps: [
    {
      id: '1',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      fields: [
        {
          id: 'name',
          type: 'text' as const,
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true
        },
        {
          id: 'email',
          type: 'email' as const,
          label: 'Email Address',
          placeholder: 'Enter your email',
          required: true
        }
      ]
    },
    {
      id: '2',
      title: 'Feedback',
      description: 'Share your experience with us',
      fields: [
        {
          id: 'rating',
          type: 'rating' as const,
          label: 'Overall Rating',
          required: true
        },
        {
          id: 'experience',
          type: 'select' as const,
          label: 'How was your experience?',
          required: true,
          options: ['Excellent', 'Good', 'Average', 'Poor']
        },
        {
          id: 'comments',
          type: 'textarea' as const,
          label: 'Additional Comments',
          placeholder: 'Tell us more about your experience...',
          required: false
        }
      ]
    }
  ]
};

const FormView = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form] = useState(mockForm); // In real app, fetch based on formId
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const progress = ((currentStep + 1) / form.steps.length) * 100;

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < form.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const validateCurrentStep = () => {
    const currentStepFields = form.steps[currentStep].fields;
    return currentStepFields.every(field => {
      if (field.required) {
        const value = formData[field.id];
        return value !== undefined && value !== '' && value !== 0;
      }
      return true;
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
            <p className="text-muted-foreground mb-6">
              Your response has been submitted successfully.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="w-full"
            >
              Create Your Own Form
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">{form.title}</CardTitle>
              {form.description && (
                <p className="text-muted-foreground text-lg">{form.description}</p>
              )}
            </CardHeader>
          </Card>

          {/* Progress Bar */}
          {form.steps.length > 1 && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Step {currentStep + 1} of {form.steps.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <Progress value={progress} className="w-full" />
              </CardContent>
            </Card>
          )}

          {/* Current Step */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">{form.steps[currentStep].title}</CardTitle>
              <p className="text-muted-foreground">
                {form.steps[currentStep].description}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {form.steps[currentStep].fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label className="flex items-center gap-1 text-base">
                    {field.label}
                    {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  
                  {field.type === 'text' && (
                    <Input
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="text-base"
                    />
                  )}
                  
                  {field.type === 'email' && (
                    <Input
                      type="email"
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="text-base"
                    />
                  )}
                  
                  {field.type === 'phone' && (
                    <Input
                      type="tel"
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="text-base"
                    />
                  )}
                  
                  {field.type === 'date' && (
                    <Input
                      type="date"
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="text-base"
                    />
                  )}
                  
                  {field.type === 'textarea' && (
                    <Textarea
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      rows={4}
                      className="text-base resize-none"
                    />
                  )}
                  
                  {field.type === 'select' && (
                    <Select
                      value={formData[field.id] || ''}
                      onValueChange={(value) => handleFieldChange(field.id, value)}
                    >
                      <SelectTrigger className="text-base">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option, index) => (
                          <SelectItem key={index} value={option} className="text-base">
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  
                  {field.type === 'radio' && (
                    <RadioGroup
                      value={formData[field.id] || ''}
                      onValueChange={(value) => handleFieldChange(field.id, value)}
                      className="space-y-3"
                    >
                      {field.options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <RadioGroupItem 
                            value={option} 
                            id={`${field.id}-${index}`}
                            className="mt-0.5"
                          />
                          <Label 
                            htmlFor={`${field.id}-${index}`}
                            className="text-base font-normal cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  
                  {field.type === 'checkbox' && (
                    <div className="space-y-3">
                      {field.options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Checkbox 
                            id={`${field.id}-${index}`}
                            checked={formData[field.id]?.includes(option) || false}
                            onCheckedChange={(checked) => {
                              const currentValues = formData[field.id] || [];
                              if (checked) {
                                handleFieldChange(field.id, [...currentValues, option]);
                              } else {
                                handleFieldChange(field.id, currentValues.filter((v: string) => v !== option));
                              }
                            }}
                            className="mt-0.5"
                          />
                          <Label 
                            htmlFor={`${field.id}-${index}`}
                            className="text-base font-normal cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {field.type === 'rating' && (
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-8 w-8 cursor-pointer transition-colors ${
                            star <= (formData[field.id] || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground hover:text-yellow-400'
                          }`}
                          onClick={() => handleFieldChange(field.id, star)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="order-2 sm:order-1"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            {currentStep === form.steps.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!validateCurrentStep()}
                className="order-1 sm:order-2"
              >
                Submit Form
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!validateCurrentStep()}
                className="order-1 sm:order-2"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormView;