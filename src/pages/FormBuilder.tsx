import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  GripVertical, 
  Type, 
  List, 
  CheckSquare,
  Calendar,
  Mail,
  Phone,
  Star,
  Eye,
  Save,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

const FormBuilder = () => {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewStep, setPreviewStep] = useState(0);
  const [steps, setSteps] = useState<FormStep[]>([
    {
      id: '1',
      title: 'Step 1',
      description: 'Basic Information',
      fields: []
    }
  ]);

  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: <Type className="h-4 w-4" /> },
    { type: 'textarea', label: 'Long Text', icon: <Type className="h-4 w-4" /> },
    { type: 'select', label: 'Dropdown', icon: <List className="h-4 w-4" /> },
    { type: 'checkbox', label: 'Checkboxes', icon: <CheckSquare className="h-4 w-4" /> },
    { type: 'radio', label: 'Multiple Choice', icon: <CheckSquare className="h-4 w-4" /> },
    { type: 'email', label: 'Email', icon: <Mail className="h-4 w-4" /> },
    { type: 'phone', label: 'Phone', icon: <Phone className="h-4 w-4" /> },
    { type: 'date', label: 'Date', icon: <Calendar className="h-4 w-4" /> },
    { type: 'rating', label: 'Rating', icon: <Star className="h-4 w-4" /> },
  ];

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: `New ${type} field`,
      required: false,
      ...(type === 'select' || type === 'radio' || type === 'checkbox' ? { options: ['Option 1', 'Option 2'] } : {})
    };

    const updatedSteps = [...steps];
    updatedSteps[currentStep].fields.push(newField);
    setSteps(updatedSteps);
  };

  const removeField = (fieldId: string) => {
    const updatedSteps = [...steps];
    updatedSteps[currentStep].fields = updatedSteps[currentStep].fields.filter(
      field => field.id !== fieldId
    );
    setSteps(updatedSteps);
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    const updatedSteps = [...steps];
    const fieldIndex = updatedSteps[currentStep].fields.findIndex(field => field.id === fieldId);
    if (fieldIndex !== -1) {
      updatedSteps[currentStep].fields[fieldIndex] = {
        ...updatedSteps[currentStep].fields[fieldIndex],
        ...updates
      };
      setSteps(updatedSteps);
    }
  };

  const addStep = () => {
    const newStep: FormStep = {
      id: `step_${Date.now()}`,
      title: `Step ${steps.length + 1}`,
      description: 'New step description',
      fields: []
    };
    setSteps([...steps, newStep]);
    setCurrentStep(steps.length);
  };

  const removeStep = (stepIndex: number) => {
    if (steps.length > 1) {
      const updatedSteps = steps.filter((_, index) => index !== stepIndex);
      setSteps(updatedSteps);
      if (currentStep >= updatedSteps.length) {
        setCurrentStep(updatedSteps.length - 1);
      }
    }
  };

  const updateStep = (stepIndex: number, updates: Partial<FormStep>) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], ...updates };
    setSteps(updatedSteps);
  };

  const progress = ((previewStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">{formTitle}</h1>
                <p className="text-sm text-muted-foreground">Form Builder</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-none"
                onClick={() => {
                  setPreviewStep(0);
                  setShowPreview(true);
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button className="flex-1 sm:flex-none">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Add Fields</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {fieldTypes.map((fieldType) => (
                  <Button
                    key={fieldType.type}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => addField(fieldType.type as FormField['type'])}
                  >
                    {fieldType.icon}
                    <span className="ml-2">{fieldType.label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Form Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="form-title">Form Title</Label>
                  <Input
                    id="form-title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="form-description">Form Description</Label>
                  <Textarea
                    id="form-description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Steps Navigation */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Form Steps</CardTitle>
                <Button size="sm" onClick={addStep}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Step
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-1">
                      <Badge
                        variant={index === currentStep ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setCurrentStep(index)}
                      >
                        {step.title}
                      </Badge>
                      {steps.length > 1 && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => removeStep(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Current Step Settings */}
                <div className="space-y-4">
                  <div>
                    <Label>Step Title</Label>
                    <Input
                      value={steps[currentStep]?.title || ''}
                      onChange={(e) => updateStep(currentStep, { title: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Step Description</Label>
                    <Input
                      value={steps[currentStep]?.description || ''}
                      onChange={(e) => updateStep(currentStep, { description: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Fields */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {steps[currentStep]?.title} - Fields
                </CardTitle>
              </CardHeader>
              <CardContent>
                {steps[currentStep]?.fields.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Type className="mx-auto h-8 w-8 mb-2" />
                    <p>No fields added yet. Use the sidebar to add fields.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {steps[currentStep]?.fields.map((field) => (
                      <Card key={field.id} className="border-dashed">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <GripVertical className="h-5 w-5 text-muted-foreground mt-1" />
                            <div className="flex-1 space-y-3">
                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                  <Label>Field Label</Label>
                                  <Input
                                    value={field.label}
                                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                                    className="mt-1"
                                  />
                                </div>
                                <div className="flex-1">
                                  <Label>Field Type</Label>
                                  <Select
                                    value={field.type}
                                    onValueChange={(value) => updateField(field.id, { type: value as FormField['type'] })}
                                  >
                                    <SelectTrigger className="mt-1">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {fieldTypes.map((type) => (
                                        <SelectItem key={type.type} value={type.type}>
                                          {type.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {(field.type === 'text' || field.type === 'textarea' || field.type === 'email' || field.type === 'phone') && (
                                <div>
                                  <Label>Placeholder</Label>
                                  <Input
                                    value={field.placeholder || ''}
                                    onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                    className="mt-1"
                                  />
                                </div>
                              )}

                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={field.required}
                                  onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                                />
                                <Label>Required field</Label>
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeField(field.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <div className="min-h-[80vh] bg-gradient-to-br from-background to-muted/20">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-2xl mx-auto">
                {/* Header */}
                <Card className="mb-6">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl md:text-3xl">{formTitle}</CardTitle>
                    {formDescription && (
                      <p className="text-muted-foreground text-lg">{formDescription}</p>
                    )}
                  </CardHeader>
                </Card>

                {/* Progress Bar */}
                {steps.length > 1 && (
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Step {previewStep + 1} of {steps.length}
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
                    <CardTitle className="text-xl">{steps[previewStep]?.title}</CardTitle>
                    <p className="text-muted-foreground">
                      {steps[previewStep]?.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {steps[previewStep]?.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label className="flex items-center gap-1 text-base">
                          {field.label}
                          {field.required && <span className="text-destructive">*</span>}
                        </Label>
                        
                        {field.type === 'text' && (
                          <Input
                            placeholder={field.placeholder}
                            className="text-base"
                          />
                        )}
                        
                        {field.type === 'email' && (
                          <Input
                            type="email"
                            placeholder={field.placeholder}
                            className="text-base"
                          />
                        )}
                        
                        {field.type === 'phone' && (
                          <Input
                            type="tel"
                            placeholder={field.placeholder}
                            className="text-base"
                          />
                        )}
                        
                        {field.type === 'date' && (
                          <Input
                            type="date"
                            className="text-base"
                          />
                        )}
                        
                        {field.type === 'textarea' && (
                          <Textarea
                            placeholder={field.placeholder}
                            rows={4}
                            className="text-base resize-none"
                          />
                        )}
                        
                        {field.type === 'select' && (
                          <Select>
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
                          <RadioGroup className="space-y-3">
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
                                className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-yellow-400 transition-colors"
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
                    onClick={() => setPreviewStep(Math.max(0, previewStep - 1))}
                    disabled={previewStep === 0}
                    className="order-2 sm:order-1"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  
                  {previewStep === steps.length - 1 ? (
                    <Button className="order-1 sm:order-2">
                      Submit Form
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setPreviewStep(Math.min(steps.length - 1, previewStep + 1))}
                      disabled={previewStep === steps.length - 1}
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormBuilder;