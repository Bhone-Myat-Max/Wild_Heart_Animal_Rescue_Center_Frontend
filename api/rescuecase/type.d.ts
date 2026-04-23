
// ENUM TYPES (match Laravel ENUM)
type PriorityLevel = "Low" | "Medium" | "High" | "Emergency";
// type CaseStatus = ;
// Main Rescue Case Type
 type RescueCase = {
    id: number;
    case_number: string;
    case_title: string;
    reported_by: string | null;
    location: string;
    description: string | null;
    priority_level: PriorityLevel;
    case_status: "Pending" | "In Progress" | "Completed";
    created_at: string;
    updated_at: string;
    users: User[]
};
 type RescueCasePayload = {
    
    case_title: string;
    reported_by: string | null;
    location: string;
    description: string | null;
    priority_level: PriorityLevel;
};


