
// ENUM TYPES (match Laravel ENUM)
type PriorityLevel = "Low" | "Medium" | "High" | "Emergency";
type CaseStatus = "Pending" | "In Progress" | "Completed";

// Main Rescue Case Type
 type RescueCase = {
    id: number;
    case_title: string;
    reported_by: string | null;
    location: string;
    description: string | null;
    priority_level: PriorityLevel;
    case_status: CaseStatus;
    created_at: string;
    updated_at: string;
    users: RescueUser[]
};

type RescueUser = {
    id: number
}

