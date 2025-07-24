import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Calendar, MoreVertical, Eye, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Form {
  id: string;
  title: string;
  description: string;
  responses: number;
  createdAt: string;
  status: 'active' | 'draft';
}

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - in real app this would come from an API/state management
  const [forms, setForms] = useState<Form[]>([
    {
      id: '1',
      title: 'Customer Feedback Survey',
      description: 'Collect feedback from our valued customers',
      responses: 142,
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: '2', 
      title: 'Event Registration Form',
      description: 'Register for our upcoming conference',
      responses: 89,
      createdAt: '2024-01-12',
      status: 'active'
    },
    {
      id: '3',
      title: 'Employee Onboarding',
      description: 'Multi-step onboarding process for new hires',
      responses: 23,
      createdAt: '2024-01-10',
      status: 'draft'
    }
  ]);

  const handleDeleteForm = (formId: string) => {
    setForms(forms.filter(form => form.id !== formId));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Forms</h1>
            <p className="text-muted-foreground">Create and manage your forms</p>
          </div>
          <Button 
            onClick={() => navigate('/form-builder')}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Form
          </Button>
        </div>

        {/* Forms Grid */}
        {forms.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No forms yet</h3>
            <p className="text-muted-foreground mb-6">
              Get started by creating your first form
            </p>
            <Button onClick={() => navigate('/form-builder')}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Form
            </Button>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <Card 
                key={form.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer group" 
                onClick={() => window.open(`/form/${form.id}`, '_blank')}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{form.title}</CardTitle>
                      <Badge 
                        variant={form.status === 'active' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {form.status}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="ml-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`/form/${form.id}`, '_blank');
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/form-builder?id=${form.id}`);
                          }}
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteForm(form.id);
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {form.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(form.createdAt).toLocaleDateString()}
                    </div>
                    <span>{form.responses} responses</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;