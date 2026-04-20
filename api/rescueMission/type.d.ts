type RescueMission = {
  id: number;
  title: string;
  description: string;
  category: string;
  target_amount: number;
  raised_amount: number;
  image_url: string;
  status: Status;
}

type Status = "active" | "completed"