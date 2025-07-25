import { useState } from "react";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const reviews = [
  { id: 1, title: "Review 1", content: "This is the content of review 1." },
  { id: 2, title: "Review 2", content: "This is the content of review 2." },
  { id: 3, title: "Review 3", content: "This is the content of review 3." },
  { id: 4, title: "Review 4", content: "This is the content of review 4." },
  { id: 5, title: "Review 5", content: "This is the content of review 5." },
  { id: 6, title: "Review 6", content: "This is the content of review 6." },
  { id: 7, title: "Review 7", content: "This is the content of review 7." },
  { id: 8, title: "Review 8", content: "This is the content of review 8." },
];

const FormReviewList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <DashboardWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Form Review List</h1>
        <Accordion type="single" collapsible>
          {paginatedReviews.map((review) => (
            <AccordionItem key={review.id} value={`review-${review.id}`}>
              <AccordionTrigger>{review.title}</AccordionTrigger>
              <AccordionContent>{review.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default FormReviewList;